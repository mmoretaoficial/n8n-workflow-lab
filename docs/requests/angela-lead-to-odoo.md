# Angela Lead to Odoo

## Identificación

- Nombre técnico: `angela-lead-to-odoo`
- Nombre visible: `DEV - MMoreta - Angela Lead to Odoo`
- Cliente: MMoreta Consulting & Services, SRL
- Rama: `feature/angela-lead-to-odoo`
- Ambiente: DEV

## Objetivo

Recibir una solicitud simulada desde WhatsApp, validar los datos del
cliente, crear un lead simulado en Odoo y enviar una respuesta simulada
de confirmación por WhatsApp.

## Disparador

- Tipo: Webhook
- Método: POST
- Ruta: `test-lead`

## Entradas

| Campo | Tipo | Obligatorio | Ejemplo |
|---|---|---:|---|
| name | string | Sí | Cliente de prueba |
| phone | string | Sí | 18295550000 |
| email | string | No | cliente@example.com |
| description | string | No | Interesado en Odoo 18 |

## Proceso

1. Recibir el webhook.
2. Validar los datos.
3. Normalizar el teléfono.
4. Crear un lead en la Mock API de Odoo.
5. Enviar confirmación mediante la Mock API de WhatsApp.
6. Responder al webhook.
7. Registrar cualquier error.

## Servicios simulados

### Odoo

- Método: POST
- URL interna: `http://mock-api:3001/odoo/leads`

### WhatsApp

- Método: POST
- URL interna: `http://mock-api:3001/whatsapp/messages`

## Pruebas mínimas

- Lead válido.
- Nombre faltante.
- Teléfono faltante.
- Email vacío.
- Error 500 de Odoo.
- Timeout de Odoo.
- Error de WhatsApp.
- Mensaje duplicado.