# Páginas Legales para ColumbiaCRM - Meta/Facebook

Este paquete contiene las páginas legales requeridas por Meta para aprobar tu aplicación de Facebook Login.

## 📋 Archivos Incluidos

1. **privacy-page.tsx** → `/app/privacy/page.tsx`
2. **data-deletion-page.tsx** → `/app/data-deletion/page.tsx`
3. **terms-page.tsx** → `/app/terms/page.tsx`

## 🚀 Instalación en tu Proyecto Next.js

### Paso 1: Crear las carpetas necesarias

En la raíz de tu proyecto, asegúrate de tener la estructura de carpetas de Next.js 13+ (App Router):

```bash
tu-proyecto/
├── app/
│   ├── privacy/
│   ├── data-deletion/
│   └── terms/
```

### Paso 2: Copiar los archivos

Copia cada archivo en su carpeta correspondiente:

```bash
# Desde donde descargaste los archivos:

# Política de privacidad
cp privacy-page.tsx tu-proyecto/app/privacy/page.tsx

# Eliminación de datos
cp data-deletion-page.tsx tu-proyecto/app/data-deletion/page.tsx

# Términos de servicio
cp terms-page.tsx tu-proyecto/app/terms/page.tsx
```

### Paso 3: Verificar la estructura

Tu estructura de carpetas debería verse así:

```
tu-proyecto/
├── app/
│   ├── privacy/
│   │   └── page.tsx
│   ├── data-deletion/
│   │   └── page.tsx
│   └── terms/
│       └── page.tsx
```

### Paso 4: Probar localmente

```bash
npm run dev
```

Abre tu navegador y verifica que las páginas funcionen:
- http://localhost:3000/privacy
- http://localhost:3000/data-deletion
- http://localhost:3000/terms

### Paso 5: Desplegar a Vercel

```bash
git add .
git commit -m "Add legal pages for Meta compliance"
git push
```

Vercel desplegará automáticamente los cambios.

## ✅ Verificar las URLs en Meta

Una vez desplegado, verifica que estas URLs funcionen:

- ✅ https://crm101-joerey101.vercel.app/privacy
- ✅ https://crm101-joerey101.vercel.app/data-deletion
- ✅ https://crm101-joerey101.vercel.app/terms

## 🔧 Personalización

Todas las páginas ya están personalizadas con tu información:
- **Email de contacto**: info@columbastore.com
- **Dominio**: crm101-joerey101.vercel.app
- **Nombre de la app**: ColumbiaCRM

Si necesitas cambiar algo:
1. Busca `info@columbastore.com` y reemplázalo por tu email
2. Busca `crm101-joerey101.vercel.app` y reemplázalo por tu dominio
3. Busca `ColumbiaCRM` y reemplázalo por el nombre de tu app

## 📱 Actualizar en Meta

Una vez que las páginas estén en vivo:

1. Ve a https://developers.facebook.com/apps
2. Selecciona tu app "ColumbiaCRM"
3. Ve a **"Configuración de la app" → "Básica"**
4. Verifica que estén configuradas:
   - **URL de la política de privacidad**: `https://crm101-joerey101.vercel.app/privacy`
   - **URL de Condiciones del servicio**: `https://crm101-joerey101.vercel.app/privacy`
5. Guarda los cambios

## 🎨 Estilos

Las páginas usan Tailwind CSS. Si tu proyecto no usa Tailwind, tendrás que:
1. Instalar Tailwind: https://tailwindcss.com/docs/guides/nextjs
2. O reemplazar las clases de Tailwind con tu propio CSS

## ⚠️ Importante

- Estas páginas son templates básicos que cumplen con los requisitos de Meta
- Deberías revisarlas con un abogado para asegurarte de que cumplan con las leyes de tu jurisdicción
- Actualiza las fechas cuando hagas cambios significativos
- Mantén copias de las versiones anteriores para referencia

## 🆘 Soporte

Si tienes problemas:
1. Verifica que la estructura de carpetas sea correcta
2. Asegúrate de estar usando Next.js 13+ con App Router
3. Revisa la consola del navegador para errores
4. Verifica que las URLs estén accesibles públicamente

## 📝 Checklist para Meta

Antes de enviar tu app a revisión en Meta, verifica:

- [x] URL de privacidad funciona y es pública
- [x] URL de eliminación de datos funciona y es pública
- [x] URLs están configuradas en Meta
- [x] Ícono de 1024x1024 subido
- [x] Categoría seleccionada
- [x] Dominio configurado correctamente
- [x] OAuth URLs configuradas
- [ ] App ID y App Secret configurados en .env
- [ ] Probado el flujo de login completo

---

**¿Necesitas ayuda?** Contáctame para más asistencia.
