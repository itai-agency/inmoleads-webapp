# Google Maps API Setup

Este proyecto utiliza Google Maps para mostrar mapas estáticos y embebidos de las propiedades. Para habilitar esta funcionalidad, necesitas configurar una API Key de Google Maps.

## Pasos para configurar Google Maps API

### 1. Crear un proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la facturación para el proyecto

### 2. Habilitar las APIs necesarias

En la consola de Google Cloud, ve a "APIs y servicios" > "Biblioteca" y habilita las siguientes APIs:

- **Maps JavaScript API** - Para mapas interactivos
- **Maps Static API** - Para mapas estáticos (usados en las tarjetas de propiedades)
- **Maps Embed API** - Para mapas embebidos (usados en el modal de propiedades)

### 3. Crear credenciales

1. Ve a "APIs y servicios" > "Credenciales"
2. Haz clic en "Crear credenciales" > "Clave de API"
3. Copia la clave generada

### 4. Configurar restricciones (Recomendado)

Para mayor seguridad, configura restricciones en tu API Key:

1. En la consola de credenciales, haz clic en tu API Key
2. En "Restricciones de aplicación", selecciona "Sitios web HTTP"
3. Agrega tu dominio (ej: `localhost:3000`, `tu-dominio.com`)
4. En "Restricciones de API", selecciona las APIs que habilitaste anteriormente

### 5. Configurar la variable de entorno

1. Crea un archivo `.env` en la raíz del proyecto
2. Agrega la siguiente línea:

```env
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

**Importante:** Reemplaza `tu_api_key_aqui` con tu clave de API real.

### 6. Reiniciar el servidor de desarrollo

Después de configurar la variable de entorno, reinicia tu servidor de desarrollo:

```bash
npm run dev
```

## Verificación

Una vez configurado correctamente, deberías ver:

- Mapas estáticos en las tarjetas de propiedades
- Mapas interactivos en el modal de propiedades
- Controles de zoom en las tarjetas de propiedades

Si no se muestran los mapas, verifica:

1. Que la API Key esté configurada correctamente
2. Que las APIs necesarias estén habilitadas
3. Que no haya restricciones que bloqueen tu dominio
4. Que la facturación esté habilitada en tu proyecto de Google Cloud

## Costos

Google Maps tiene un plan gratuito con límites mensuales:

- **Maps Static API**: 25,000 cargas gratuitas por mes
- **Maps Embed API**: 25,000 cargas gratuitas por mes
- **Maps JavaScript API**: 28,000 cargas gratuitas por mes

Para más información sobre precios, visita: [Google Maps Platform Pricing](https://cloud.google.com/maps-platform/pricing)
