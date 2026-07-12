SHELL := /bin/bash

.PHONY: help setup start stop restart status logs logs-n8n logs-mock build test validate export import clean

help:
	@echo ""
	@echo "n8n Workflow Lab"
	@echo "----------------"
	@echo "make setup       Crear .env desde .env.example"
	@echo "make start       Levantar el laboratorio"
	@echo "make stop        Detener el laboratorio"
	@echo "make restart     Reiniciar el laboratorio"
	@echo "make status      Mostrar contenedores"
	@echo "make logs        Mostrar todos los logs"
	@echo "make logs-n8n    Mostrar logs de n8n"
	@echo "make logs-mock   Mostrar logs de la Mock API"
	@echo "make build       Compilar TypeScript"
	@echo "make test        Ejecutar pruebas"
	@echo "make validate    Validar TypeScript y JSON"
	@echo "make export      Exportar workflows"
	@echo "make import      Importar workflows"
	@echo "make clean       Detener y eliminar contenedores"
	@echo ""

setup:
	@test -f .env || cp .env.example .env
	@echo "Archivo .env preparado."

start:
	docker compose up -d --build

stop:
	docker compose down

restart:
	docker compose down
	docker compose up -d --build

status:
	docker compose ps

logs:
	docker compose logs -f

logs-n8n:
	docker compose logs -f n8n

logs-mock:
	docker compose logs -f mock-api

build:
	npm --prefix mock-api run build

test:
	npm --prefix mock-api test

validate:
	npm --prefix mock-api run build
	@find workflows shared \
		-name '*.json' \
		-type f \
		-size +0c \
		-exec python3 -m json.tool {} /dev/null \;
	@echo "Validación terminada."

export:
	docker compose exec n8n /files/scripts/export-workflows.sh

import:
	docker compose exec n8n /files/scripts/import-workflows.sh

clean:
	docker compose down --remove-orphans