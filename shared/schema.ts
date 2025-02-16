import { pgTable, text, serial, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  password: text("password"),
  emailVerified: boolean("email_verified").default(false),
  photoURL: text("photo_url"),
  providerId: text("provider_id"),
  createdAt: text("created_at").notNull()
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  condoFee: decimal("condo_fee", { precision: 10, scale: 2 }),
  iptuFee: decimal("iptu_fee", { precision: 10, scale: 2 }),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 7 }).notNull(),
  longitude: decimal("longitude", { precision: 10, scale: 7 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  parkingSpaces: integer("parking_spaces").notNull(),
  squareMeters: integer("square_meters").notNull(),
  hasPorter: boolean("has_porter").default(false),
  hasPrivateSecurity: boolean("has_private_security").default(false),
  isFurnished: boolean("is_furnished").default(false),
  hasPool: boolean("has_pool").default(false),
  hasBarbecue: boolean("has_barbecue").default(false),
  hasSharedArea: boolean("has_shared_area").default(false),
  hasFireInsurance: boolean("has_fire_insurance").default(false),
  isForSale: boolean("is_for_sale").notNull(),
  isForRent: boolean("is_for_rent").notNull(),
  userId: integer("user_id").references(() => users.id),
  createdAt: text("created_at").notNull()
});

export const propertyImages = pgTable("property_images", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").references(() => properties.id),
  url: text("url").notNull(),
  order: integer("order").notNull(),
  createdAt: text("created_at").notNull()
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  propertyId: integer("property_id").references(() => properties.id),
  createdAt: text("created_at").notNull()
});

// Schema for inserting users
export const insertUserSchema = createInsertSchema(users).omit({ id: true });

// Schema for inserting properties
export const insertPropertySchema = createInsertSchema(properties).omit({ id: true });

// Schema for inserting property images
export const insertPropertyImageSchema = createInsertSchema(propertyImages).omit({ id: true });

// Schema for inserting favorites
export const insertFavoriteSchema = createInsertSchema(favorites).omit({ id: true });

// Types for all the schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

export type InsertPropertyImage = z.infer<typeof insertPropertyImageSchema>;
export type PropertyImage = typeof propertyImages.$inferSelect;

export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;