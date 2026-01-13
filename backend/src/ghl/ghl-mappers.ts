// src/ghl/ghl-mappers.ts

/**
 * Front values -> GHL picklist exact texts
 * (En GHL tus opciones suelen ser textos, no códigos)
 */

export const SEXO_MAP: Record<string, string> = {
  masculino: 'Masculino',
  femenino: 'Femenino',
};

export const PROFESION_MAP: Record<string, string> = {
  medico: 'Médico/a',
  enfermero: 'Enfermero/a',
  cuidador: 'Cuidador/a',
  kinesiologo: 'Kinesiólogo/a',
  psicomotricista: 'Psicomotricista',
  psicologo: 'Psicólogo/a',
  fonoaudiologo: 'Fonoaudiólogo/a',
  paramedico: 'Paramédico/a',
  // en tu front viene "otros" pero en GHL la opción es "Otro"
  otros: 'Otro',
};

export const MONOTRIBUTO_MAP: Record<string, string> = {
  si: 'Sí',
  no: 'No',
};

/**
 * Convierte "dd/mm/aaaa" o "dd-mm-aaaa" a "yyyy-mm-dd"
 * Si ya viene en ISO ("yyyy-mm-dd"), lo deja.
 * Si no puede parsear, devuelve el original (para no romper).
 */
export function toIsoDate(value?: string): string | undefined {
  if (!value) return undefined;
  const v = value.trim();

  // ya ISO
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;

  // dd/mm/yyyy o dd-mm-yyyy
  const m = v.match(/^(\d{2})[\/-](\d{2})[\/-](\d{4})$/);
  if (!m) return v;

  const dd = m[1];
  const mm = m[2];
  const yyyy = m[3];

  // validación mínima
  const d = Number(dd);
  const mo = Number(mm);
  const y = Number(yyyy);
  if (d < 1 || d > 31 || mo < 1 || mo > 12 || y < 1900) return v;

  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Normaliza strings vacíos -> undefined
 */
export function clean(value: any) {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return value;
}
