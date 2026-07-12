import { Request, Response, Router } from "express";

interface OdooLead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  description: string | null;
  stage: string;
}

const leadsByPhone = new Map<string, OdooLead>();

export const odooRouter = Router();

odooRouter.post("/leads", async (request: Request, response: Response) => {
  const { name, phone, email, description } = request.body;

  if (!name || !phone) {
    return response.status(400).json({
      success: false,
      error: "Los campos 'name' y 'phone' son obligatorios."
    });
  }

  const simulate = request.header("x-simulate-error");

  if (simulate === "500") {
    return response.status(500).json({
      success: false,
      error: "Error simulado del servicio de Odoo."
    });
  }

  if (simulate === "timeout") {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return response.status(200).json({
      success: true,
      message: "Respuesta retrasada de Odoo."
    });
  }

  const existingLead = leadsByPhone.get(phone);

  if (existingLead) {
    return response.status(200).json({
      success: true,
      duplicate: true,
      lead: existingLead
    });
  }

  const lead: OdooLead = {
    id: Math.floor(Math.random() * 10000),
    name,
    phone,
    email: email || null,
    description: description || null,
    stage: "Nuevo"
  };

  leadsByPhone.set(phone, lead);

  return response.status(201).json({
    success: true,
    duplicate: false,
    lead
  });
});

// Solo para aislar pruebas entre sí (limpia el estado en memoria de leads duplicados).
export function resetOdooLeads(): void {
  leadsByPhone.clear();
}
