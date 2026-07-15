# Guía de pruebas del laboratorio n8n

## Reglas

- No utilizar credenciales productivas.
- No apuntar a servicios productivos.
- Utilizar la Mock API.
- Probar casos exitosos y fallidos.
- Validar todos los JSON antes de hacer commit.
- Ejecutar la compilación TypeScript.
- Revisar los logs de n8n y de la Mock API.

## Validaciones mínimas

Cada workflow debe probar:

1. Entrada válida.
2. Entrada incompleta.
3. Datos vacíos.
4. Duplicados.
5. Error HTTP 400.
6. Error HTTP 401.
7. Error HTTP 500.
8. Timeout.
9. Servicio externo no disponible.
10. Reintento.
11. Respuesta final correcta.
12. Ausencia de secretos en el repositorio.

## Comandos

```bash
make build
make test
make validate
make logs