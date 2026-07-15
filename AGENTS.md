# Instrucciones del agente

Antes de realizar cualquier trabajo:

1. Leer `README.md`.
2. Leer `docs/agent-prompt.md`.
3. Leer `docs/testing-guide.md`.
4. Leer la solicitud específica ubicada en `docs/requests/`.
5. Confirmar la rama Git activa.
6. No utilizar credenciales productivas.
7. No modificar `main` ni `develop` directamente.
8. Crear o modificar archivos solamente en la rama feature o fix activa.
9. Ejecutar las validaciones antes de finalizar.
10. Documentar el resultado en `docs/workflows/`.

## Ubicación de artefactos

- Workflow n8n: `workflows/development/`
- Solicitud funcional: `docs/requests/`
- Documentación final: `docs/workflows/`
- Datos de entrada: `shared/fixtures/`
- Respuestas simuladas: `shared/responses/`
- Esquemas: `shared/schemas/`
- Mock API: `mock-api/src/`
- Pruebas: `mock-api/tests/`

## Prohibiciones

- No escribir tokens en JSON, TypeScript o Markdown.
- No conectar producción durante pruebas.
- No borrar workflows sin revisar su contenido.
- No hacer push directamente a `main`.
- No activar workflows automáticamente.