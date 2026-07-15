import cors from "cors";
import express, { Request, Response } from "express";

import { odooRouter } from "./routes/odoo";
import { whatsappRouter } from "./routes/whatsapp";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({
    status: "ok",
    service: "n8n-workflow-mock-api",
    timestamp: new Date().toISOString()
  });
});

app.use("/odoo", odooRouter);
app.use("/whatsapp", whatsappRouter);

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
