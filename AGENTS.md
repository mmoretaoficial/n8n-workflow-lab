# Instrucciones del agente

## Contexto

Este repositorio es un laboratorio de desarrollo y pruebas para workflows de n8n.

## Reglas obligatorias

1. Leer `docs/agent-prompt.md` antes de comenzar.
2. No utilizar credenciales productivas.
3. No modificar el volumen interno de n8n manualmente.
4. Guardar los workflows exportados en `workflows/`.
5. Crear datos simulados en `shared/fixtures/`.
6. Crear respuestas simuladas en `shared/responses/`.
7. Crear esquemas de validación en `shared/schemas/`.
8. Documentar cada workflow en `docs/workflows/`.
9. Agregar pruebas para flujos exitosos y fallidos.
10. Verificar que Docker y la Mock API funcionen antes de probar.

## Convenciones

- Nombres de workflows: `[AMBIENTE] - [CLIENTE] - [PROCESO]`
- Ejemplo: `DEV - WGroup - WhatsApp Lead to Odoo`
- Variables de entorno en mayúsculas.
- No escribir tokens directamente dentro de nodos.
- Utilizar nombres descriptivos para todos los nodos.
- Incluir un nodo de manejo de errores cuando sea necesario.
