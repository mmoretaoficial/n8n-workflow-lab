import { Request, Response, Router } from "express";

export const whatsappRouter = Router();

whatsappRouter.post("/messages", (request: Request, response: Response) => {
  const { to, message } = request.body;

  if (!to || !message) {
    return response.status(400).json({
      success: false,
      error: "Los campos 'to' y 'message' son obligatorios."
    });
  }

  const simulate = request.header("x-simulate-error");

  if (simulate === "500") {
    return response.status(500).json({
      success: false,
      error: "Error simulado del servicio de WhatsApp."
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
