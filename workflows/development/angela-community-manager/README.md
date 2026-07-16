# Ángela Community Manager - Instagram API para n8n

## Objetivo

Workflow inicial para:

- Consultar el perfil profesional de Instagram.
- Consultar publicaciones recientes.
- Consultar métricas de una publicación.
- Preparar un borrador sin publicarlo.
- Publicar una imagen únicamente con aprobación explícita.

## 1. Importación

1. En n8n, abre **Workflows**.
2. Selecciona **Import from File**.
3. Importa `mmoreta_instagram_manager_n8n.json`.
4. Mantén el workflow inactivo hasta configurar las variables y probarlo.

## 2. Variables de entorno

Agrega al contenedor o servicio de n8n:

```env
META_GRAPH_API_VERSION=v25.0
META_IG_USER_ID=...
META_IG_ACCESS_TOKEN=...
```

Después reinicia n8n.

Ejemplo Docker Compose:

```yaml
environment:
  - META_GRAPH_API_VERSION=${META_GRAPH_API_VERSION}
  - META_IG_USER_ID=${META_IG_USER_ID}
  - META_IG_ACCESS_TOKEN=${META_IG_ACCESS_TOKEN}
```

## 3. Requisitos en Meta

- Cuenta profesional de Instagram.
- Aplicación en Meta for Developers.
- La cuenta debe quedar autorizada para la API de Instagram.
- Token con los permisos necesarios para lectura, insights y publicación.
- El token no debe colocarse directamente dentro del workflow.

## 4. Endpoint

Cuando actives el workflow, n8n expondrá:

```text
POST https://TU_DOMINIO/webhook/mmoreta-instagram-manager
```

Durante pruebas usa la Test URL del nodo Webhook.

## 5. Ejemplos

### Obtener perfil

```json
{
  "action": "get_profile"
}
```

### Obtener publicaciones

```json
{
  "action": "get_media",
  "limit": 12
}
```

### Obtener métricas

```json
{
  "action": "get_media_insights",
  "media_id": "ID_DE_PUBLICACION",
  "metrics": "reach,views,likes,comments,saved,shares,total_interactions"
}
```

Algunas métricas dependen del tipo de publicación y de la versión de la API. Si Meta devuelve una métrica no compatible, reduce la lista.

### Preparar borrador

```json
{
  "action": "prepare_image_post",
  "image_url": "https://cdn.mmoreta.com/social/post-001.jpg",
  "caption": "Texto de la publicación...",
  "requested_by": "Miguel"
}
```

Este paso no publica.

### Publicar imagen aprobada

```json
{
  "action": "publish_image",
  "approved": true,
  "image_url": "https://cdn.mmoreta.com/social/post-001.jpg",
  "caption": "Texto definitivo...",
  "requested_by": "Miguel"
}
```

## 6. Seguridad recomendada antes de producción

- Agrega autenticación al Webhook mediante Header Auth o un API Gateway.
- No expongas el endpoint sin protección.
- Restringe IP si la llamada vendrá únicamente desde un MCP o servidor controlado.
- Registra cada aprobación en PostgreSQL u Odoo.
- Usa token de larga duración y programa su renovación.
- Implementa un Error Workflow en n8n.
- Mantén `approved: true` como condición obligatoria para publicar.

## 7. Alcance de esta versión

Esta versión publica imágenes simples. La siguiente fase puede agregar:

- Carruseles.
- Reels.
- Historias.
- PostgreSQL para calendario editorial y estados.
- Aprobación por Telegram, WhatsApp u Odoo.
- Webhooks de comentarios.
- Reporte mensual automatizado.
- Servidor MCP para operar el flujo desde ChatGPT.
