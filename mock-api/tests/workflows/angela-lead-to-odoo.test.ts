import fs from "node:fs";
import path from "node:path";

import request from "supertest";

import { app } from "../../src/app";
import { resetOdooLeads } from "../../src/routes/odoo";

const fixturesDir = path.join(__dirname, "../../../shared/fixtures");

function loadFixture(name: string): Record<string, unknown> {
  const filePath = path.join(fixturesDir, name);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

describe("Angela Lead to Odoo - Mock API", () => {
  beforeEach(() => {
    resetOdooLeads();
  });

  describe("POST /odoo/leads", () => {
    it("crea un lead cuando los datos son válidos", async () => {
      const lead = loadFixture("angela-whatsapp-message.json");

      const response = await request(app).post("/odoo/leads").send(lead);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.duplicate).toBe(false);
      expect(response.body.lead).toMatchObject({
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        description: lead.description,
        stage: "Nuevo"
      });
      expect(typeof response.body.lead.id).toBe("number");
    });

    it("rechaza la solicitud cuando falta el nombre", async () => {
      const lead = loadFixture("angela-whatsapp-message-missing-name.json");

      const response = await request(app).post("/odoo/leads").send(lead);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("rechaza la solicitud cuando falta el teléfono", async () => {
      const lead = loadFixture("angela-whatsapp-message-missing-phone.json");

      const response = await request(app).post("/odoo/leads").send(lead);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("acepta un lead con email vacío y lo normaliza a null", async () => {
      const lead = loadFixture("angela-whatsapp-message-empty-email.json");

      const response = await request(app).post("/odoo/leads").send(lead);

      expect(response.status).toBe(201);
      expect(response.body.lead.email).toBeNull();
    });

    it("detecta un lead duplicado por número de teléfono", async () => {
      const lead = loadFixture("angela-whatsapp-message.json");

      const first = await request(app).post("/odoo/leads").send(lead);
      const second = await request(app).post("/odoo/leads").send(lead);

      expect(first.status).toBe(201);
      expect(first.body.duplicate).toBe(false);

      expect(second.status).toBe(200);
      expect(second.body.duplicate).toBe(true);
      expect(second.body.lead.id).toBe(first.body.lead.id);
    });

    it("responde 500 cuando se simula un error del servicio de Odoo", async () => {
      const lead = loadFixture("angela-whatsapp-message.json");

      const response = await request(app)
        .post("/odoo/leads")
        .set("x-simulate-error", "500")
        .send(lead);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    it("no responde antes de que expire un timeout corto del cliente", async () => {
      const lead = loadFixture("angela-whatsapp-message.json");

      await expect(
        request(app)
          .post("/odoo/leads")
          .set("x-simulate-error", "timeout")
          .send(lead)
          .timeout({ response: 200, deadline: 300 })
      ).rejects.toThrow();
    });
  });

  describe("POST /whatsapp/messages", () => {
    it("envía la confirmación cuando los datos son válidos", async () => {
      const response = await request(app)
        .post("/whatsapp/messages")
        .send({ to: "18295550000", message: "Su solicitud fue registrada correctamente." });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.status).toBe("sent");
    });

    it("rechaza la solicitud cuando faltan campos obligatorios", async () => {
      const response = await request(app).post("/whatsapp/messages").send({ to: "18295550000" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("responde 500 cuando se simula un error del servicio de WhatsApp", async () => {
      const response = await request(app)
        .post("/whatsapp/messages")
        .set("x-simulate-error", "500")
        .send({ to: "18295550000", message: "Su solicitud fue registrada correctamente." });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /health", () => {
    it("responde con estado ok", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("ok");
    });
  });
});
