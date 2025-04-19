import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to get all elements
  app.get("/api/elements", async (_req, res) => {
    try {
      const elements = await storage.getAllElements();
      res.json(elements);
    } catch (error) {
      res.status(500).json({ message: "Error fetching elements" });
    }
  });

  // API endpoint to get a specific element by symbol
  app.get("/api/elements/:symbol", async (req, res) => {
    try {
      const symbol = req.params.symbol;
      const element = await storage.getElementBySymbol(symbol);
      
      if (!element) {
        return res.status(404).json({ message: "Element not found" });
      }
      
      res.json(element);
    } catch (error) {
      res.status(500).json({ message: "Error fetching element" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
