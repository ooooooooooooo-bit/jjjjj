import { pgTable, text, serial, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Table for element data
export const elements = pgTable("elements", {
  id: serial("id").primaryKey(),
  symbol: varchar("symbol", { length: 3 }).notNull().unique(),
  name: varchar("name", { length: 50 }).notNull(),
  number: integer("number").notNull(),
  type: varchar("type", { length: 20 }).notNull(), // 'metall', 'no-metall', 'gas-noble'
});

export const insertElementSchema = createInsertSchema(elements).omit({
  id: true,
});

export const elementTypeEnum = z.enum([
  "no-metall", "gas-noble", "metall-alcali", "metall-alcalino", "metall-transicio",
  "metall-grup13", "metall-grup14", "metall-grup15", "metall-grup16", "metal·loide",
  "lantanid", "actinid"
]);

export type ElementType = z.infer<typeof elementTypeEnum>;
export type InsertElement = z.infer<typeof insertElementSchema>;
export type Element = typeof elements.$inferSelect;

// User schema remains for future features
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
