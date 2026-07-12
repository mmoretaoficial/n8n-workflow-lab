import cors from "cors";
import express, { Request, Response } from "express";

const app = express();

const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({
    status: "ok",
    service: "n8n-workflow-mock-api",
    timestamp: new Date().toISOString()
  });
});

app.post("/whatsapp/messages", (request: Request, response: Response) => {
  const { to, message } = request.body;

  if (!to || !message) {
    return response.status(400).json({
      success: false,
      error: "Los campos 'to' y 'message' son obligatorios."
    });
  }

  return response.status(200).json({
    success: true,
    messageId: `mock-${Date.now()}`,
    to,
    message,
    status: "sent"
  });
});

app.post("/odoo/leads", (request: Request, response: Response) => {
  const { name, phone, email, description } = request.body;

  if (!name || !phone) {
    return response.status(400).json({
      success: false,
      error: "Los campos 'name' y 'phone' son obligatorios."
    });
  }

  return response.status(201).json({
    success: true,
    lead: {
      id: Math.floor(Math.random() * 10000),
      name,
      phone,
      email: email || null,
      description: description || null,
      stage: "Nuevo"
    }
  });
});

app.get("/simulate/error", (_request: Request, response: Response) => {
  response.status(500).json({
    success: false,
    error: "Error simulado del servicio externo."
  });
});

app.get("/simulate/timeout", async (_request: Request, response: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 15000));

  response.status(200).json({
    success: true,
    message: "Respuesta retrasada."
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Mock API ejecutándose en el puerto ${port}`);
});