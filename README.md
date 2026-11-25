# Qualysyn

Sitio web de Qualysyn, desarrollado con Next.js y pnpm.

## Desarrollo local

Instala las dependencias y ejecuta el servidor de desarrollo:

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Formulario de evaluación

El formulario envía las solicitudes mediante Resend. Copia `.env.example` a `.env.local` y completa una clave de API y un remitente cuyo dominio esté verificado en Resend:

```bash
cp .env.example .env.local
```

```dotenv
RESEND_API_KEY=re_tu_clave
RESEND_FROM_EMAIL="Qualysyn <solicitudes@tu-dominio-verificado.cl>"
```

Reinicia el servidor de desarrollo después de cambiar las variables. Configura las mismas variables en el entorno de despliegue; no compartas ni subas la clave al repositorio. El archivo `.env.local` está excluido de Git.

Las solicitudes se envían a la dirección de correo definida en `CONTACT_INFO` y usan el correo del visitante como dirección de respuesta. Si falta la configuración o falla el envío, el formulario muestra un error y conserva los datos ingresados.

## Comprobaciones

```bash
pnpm lint
pnpm typecheck
pnpm build
```

En una copia limpia, ejecuta `pnpm exec next typegen` antes de `pnpm typecheck` para generar los tipos de las rutas.
