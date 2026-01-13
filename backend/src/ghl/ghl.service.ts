// src/ghl/ghl.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  SEXO_MAP,
  PROFESION_MAP,
  MONOTRIBUTO_MAP,
  toIsoDate,
  clean,
} from './ghl-mappers';

type GhlCustomField = { id: string; value: any };

export interface LandingLeadDto {
  // Step 1
  first_name: string;
  last_name: string;
  sexo: string; // masculino | femenino
  fecha_nacimiento: string; // dd/mm/aaaa (front)

  // Step 2
  profesion: string; // medico | enfermero | ... | otros
  profesion_otra?: string;
  matricula?: string; // viene string en tu front
  cuit_cuil: string; // XX-XXXXXXXX-X
  monotributo: string; // si | no

  // Step 3
  telefono: string;
  email: string;
  localidad: string;
  domicilio: string;
  barrio: string;
  aclaraciones_domicilio?: string;

  // Step 4
  observaciones?: string;

  // Opcional si después decidís manejar CV como URL en vez de FILE_UPLOAD directo
  cv_url?: string;
}

@Injectable()
export class GhlService {
  private readonly logger = new Logger(GhlService.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly version: string;
  private readonly locationId: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl =
      this.config.get<string>('GHL_API_BASE') ??
      'https://services.leadconnectorhq.com';

    this.apiKey = this.config.get<string>('GHL_API_KEY')!;
    this.version = this.config.get<string>('GHL_API_VERSION') ?? '2021-07-28';
    this.locationId = this.config.get<string>('GHL_LOCATION_ID')!;

    if (!this.apiKey || !this.locationId) {
      this.logger.warn(
        `Faltan envs: GHL_API_KEY o GHL_LOCATION_ID (revisar /backend/.env)`,
      );
    }
  }

  // -----------------------------
  // IDs de Custom Fields (TU JSON)
  // -----------------------------
  private readonly CF = {
    SEXO: 'q4BR64ptRkoo4CcFrkr0',
    PROFESION: 'kCPwtAgbWqe2obfDVrGf',
    PROFESION_OTRA: 'PH4seBe4F5f8zXBFt3E4',
    MATRICULA: 'XJOcVWKwUrOWdXkJK5d9',
    CUIT_CUIL: 'ALy72w1sHScee22xOwxm',
    MONOTRIBUTO: 'psjEyui07eX90MjnUjtE',
    FECHA_NACIMIENTO: 'b3q9IZNwFPrxyqd6lJEp',
    LOCALIDAD: 'TZ6pv0DlqQWXKkYlh6nx',
    DOMICILIO: 'Q41W3UgJY6yTvloGvqMq',
    BARRIO: 'eAthpd2NymQiZ3DrERtn',
    ACLARACION_DOMICILIO: 'SC63caNkgqsHbEHbhSEx',
    OBSERVACIONES: 'VNfI093YVMD6GJRnFeib',
    CV: 'MRGtn0RXIkI0AzmdsL11',
  } as const;

  private headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
      Version: this.version,
    };
  }

  /**
   * Helper para agregar custom fields sin ensuciar payload con vacíos
   */
  private push(customFields: GhlCustomField[], id: string, value: any) {
    const v = clean(value);
    if (v === undefined) return;
    if (Array.isArray(v) && v.length === 0) return;
    customFields.push({ id, value: v });
  }

  /**
   * Upsert del contacto con todos los campos del formulario.
   * - Standard fields: firstName, lastName, email, phone
   * - Custom fields: por ID, con mapeo de picklists
   */
  async upsertContactFromLanding(dto: LandingLeadDto, options?: { tags?: string[] }) {
    const url = `${this.baseUrl}/contacts/upsert`;

    const customFields: GhlCustomField[] = [];

    // Maps (front -> GHL)
    const sexo = SEXO_MAP[dto.sexo] ?? dto.sexo;
    const profesion = PROFESION_MAP[dto.profesion] ?? dto.profesion;
    const monotributo = MONOTRIBUTO_MAP[dto.monotributo] ?? dto.monotributo;

    // DATE: dd/mm/yyyy -> yyyy-mm-dd
    const fechaNacimientoIso = toIsoDate(dto.fecha_nacimiento);

    // Custom fields
    this.push(customFields, this.CF.SEXO, sexo);
    this.push(customFields, this.CF.PROFESION, profesion);

    // Si profesión = "otros", guardamos el texto en CF.PROFESION_OTRA
    if (dto.profesion === 'otros') {
      this.push(customFields, this.CF.PROFESION_OTRA, dto.profesion_otra);
    }

    // Matricula (NUMERICAL en GHL): mandamos número si se puede, sino texto (GHL a veces lo castea)
    const matriculaNum =
      dto.matricula && /^\d+$/.test(dto.matricula.trim())
        ? Number(dto.matricula.trim())
        : dto.matricula;
    this.push(customFields, this.CF.MATRICULA, matriculaNum);

    this.push(customFields, this.CF.CUIT_CUIL, dto.cuit_cuil);
    this.push(customFields, this.CF.MONOTRIBUTO, monotributo);
    this.push(customFields, this.CF.FECHA_NACIMIENTO, fechaNacimientoIso);

    this.push(customFields, this.CF.LOCALIDAD, dto.localidad);
    this.push(customFields, this.CF.DOMICILIO, dto.domicilio);
    this.push(customFields, this.CF.BARRIO, dto.barrio);
    this.push(customFields, this.CF.ACLARACION_DOMICILIO, dto.aclaraciones_domicilio);

    this.push(customFields, this.CF.OBSERVACIONES, dto.observaciones);

    // CV: si más adelante lo manejás como URL (fallback), podés guardarlo en un TEXT custom field.
    // Pero tu CF de CV es FILE_UPLOAD. Para eso normalmente hay un flujo de upload separado.
    // Igual te dejo la posibilidad: si dto.cv_url existe, lo guardamos (si GHL lo acepta como value).
    if (dto.cv_url) {
      this.push(customFields, this.CF.CV, dto.cv_url);
    }

    const body = {
      locationId: this.locationId,
      firstName: dto.first_name,
      lastName: dto.last_name,
      email: dto.email,
      phone: dto.telefono,
      // "name" ayuda a ciertas vistas internas
      name: `${dto.first_name} ${dto.last_name}`.trim(),
      tags: options?.tags ?? ['Landing Registro Profesional'],
      customFields,
    };

    try {
      const res = await firstValueFrom(this.http.post(url, body, { headers: this.headers() }));
      this.logger.log(`GHL upsert OK (email=${dto.email})`);
      return res.data;
    } catch (error: any) {
      this.logger.error(
        `GHL upsert ERROR: ${
          error?.response?.data ? JSON.stringify(error.response.data) : error.message
        }`,
      );
      throw error;
    }
  }

  /**
   * Si querés después subir el CV directo a GHL como FILE_UPLOAD:
   * - normalmente requiere endpoint de "media/file upload" (varía según versión/credenciales).
   * - recomendación práctica: subirlo a tu storage (S3/Cloudinary) y guardar URL,
   *   o implementar el upload real una vez confirmemos endpoint exacto de tu cuenta.
   */
  async uploadCvNotImplementedYet() {
    throw new Error(
      'CV FILE_UPLOAD por API requiere endpoint específico de upload. Definimos esto cuando confirmes el endpoint/flow exacto de tu cuenta.',
    );
  }
}
