# GoHighLevel Custom Fields Mapping

Este documento detalla el mapeo 1:1 entre los campos del formulario y los Custom Fields de GoHighLevel.

## 📋 Estructura de Datos

### PASO 1 - Datos Personales

| Campo del Formulario | Custom Field GoHighLevel | Tipo | Requerido |
|---------------------|-------------------------|------|-----------|
| Nombre | `first_name` | text | ✅ |
| Apellido | `last_name` | text | ✅ |
| Sexo | `sexo` | radio (masculino/femenino) | ✅ |
| Fecha de nacimiento | `fecha_nacimiento` | date | ✅ |

---

### PASO 2 - Información Profesional + Fiscal

| Campo del Formulario | Custom Field GoHighLevel | Tipo | Requerido |
|---------------------|-------------------------|------|-----------|
| Profesión | `profesion` | radio | ✅ |
| Profesión (Otros) | `profesion_otra` | text | ⚠️ (si profesion = "otros") |
| Nº de matrícula | `matricula` | text | ❌ |
| CUIT / CUIL | `cuit_cuil` | text (formato: XX-XXXXXXXX-X) | ✅ |
| Monotributo | `monotributo` | radio (si/no) | ✅ |

**Opciones para Profesión:**
- Médico/a (`medico`)
- Enfermero/a (`enfermero`)
- Cuidador/a (`cuidador`)
- Kinesiólogo/a (`kinesiologo`)
- Psicomotricista (`psicomotricista`)
- Psicólogo/a (`psicologo`)
- Fonoaudiólogo/a (`fonoaudiologo`)
- Paramédico/a (`paramedico`)
- Otros (`otros`) → activa campo `profesion_otra`

---

### PASO 3 - Contacto + Domicilio

| Campo del Formulario | Custom Field GoHighLevel | Tipo | Requerido |
|---------------------|-------------------------|------|-----------|
| Nº de Teléfono | `telefono` | tel (10 dígitos) | ✅ |
| Mail | `email` | email | ✅ |
| Localidad | `localidad` | text | ✅ |
| Domicilio | `domicilio` | text | ✅ |
| Barrio | `barrio` | text | ✅ |
| Aclaraciones domicilio | `aclaraciones_domicilio` | textarea | ❌ |

**Validaciones:**
- `telefono`: Debe ser 10 dígitos numéricos (sin 0 ni 15)
- `email`: Formato email válido

---

### PASO 4 - Documentación + Observaciones

| Campo del Formulario | Custom Field GoHighLevel | Tipo | Requerido |
|---------------------|-------------------------|------|-----------|
| CV Upload | `cv_upload` | file (array) | ✅ |
| Cantidad de archivos | `cv_files_count` | number | - |
| Observaciones | `observaciones` | textarea | ❌ |

**Configuración de archivos:**
- Formatos aceptados: `.pdf`, `.doc`, `.docx`, `.jpg`, `.jpeg`, `.png`
- Máximo: 5 archivos
- Tamaño máximo: 10MB por archivo

---

## 🔗 Estructura JSON para API

```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "sexo": "masculino",
  "fecha_nacimiento": "1990-05-15",
  "profesion": "medico",
  "profesion_otra": "",
  "matricula": "12345",
  "cuit_cuil": "20-12345678-9",
  "monotributo": "si",
  "telefono": "3514555555",
  "email": "juan.perez@email.com",
  "localidad": "Córdoba",
  "domicilio": "Av. Colón 123",
  "barrio": "Centro",
  "aclaraciones_domicilio": "Edificio Torre del Siglo, Piso 5",
  "cv_files_count": 1,
  "observaciones": "10 años de experiencia en emergencias"
}
```

**Nota:** Los archivos CV se envían como FormData multiparte con keys: `cv_file_0`, `cv_file_1`, etc.

---

## 🚀 Integración con GoHighLevel API

### Endpoint sugerido:
```
POST https://rest.gohighlevel.com/v1/contacts/
```

### Headers:
```javascript
{
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'multipart/form-data' // para archivos
}
```

### Código de ejemplo (ver App.tsx, línea 195):

```typescript
const formDataToSend = new FormData();

// Agregar campos de texto
Object.entries(apiData).forEach(([key, value]) => {
  formDataToSend.append(key, value);
});

// Agregar archivos CV
formData.cv_upload.forEach((file, index) => {
  formDataToSend.append(`cv_file_${index}`, file);
});

// Enviar a GoHighLevel
const response = await fetch('YOUR_GOHIGHLEVEL_API_ENDPOINT', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formDataToSend
});
```

---

## ✅ Validaciones Implementadas

### Paso 1:
- ✅ Nombre no vacío
- ✅ Apellido no vacío
- ✅ Sexo seleccionado
- ✅ Fecha de nacimiento válida

### Paso 2:
- ✅ Profesión seleccionada
- ✅ Si profesión = "otros", campo profesion_otra obligatorio
- ✅ CUIT/CUIL formato XX-XXXXXXXX-X (regex)
- ✅ Monotributo seleccionado

### Paso 3:
- ✅ Teléfono 10 dígitos numéricos
- ✅ Email formato válido
- ✅ Localidad, domicilio y barrio no vacíos

### Paso 4:
- ✅ Al menos 1 archivo CV adjuntado
- ✅ Validación de tamaño máximo (10MB por archivo)
- ✅ Validación de formatos permitidos

---

## 📱 Estados Visuales

Todos los componentes incluyen:
- ✅ Estado default (border gris)
- ✅ Estado focus (border turquesa + ring)
- ✅ Estado error (border rojo + fondo rojo claro + mensaje)
- ✅ Estado success (border verde + fondo verde claro + checkmark)

---

## 🎨 Diseño

- ✅ Mobile-first responsive
- ✅ Paleta de colores: Turquesa (#00BFA6) + grises
- ✅ Barra de progreso visual (4 pasos)
- ✅ Transiciones suaves entre pasos
- ✅ Botón flotante WhatsApp
- ✅ Componentes reutilizables

---

**Última actualización:** 2026-01-12
