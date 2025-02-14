import { properties, type Property, type InsertProperty } from "@shared/schema";

export interface IStorage {
  getAllProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  createProperty(property: InsertProperty): Promise<Property>;
}

export class MemStorage implements IStorage {
  private properties: Map<number, Property>;
  private currentId: number;

  constructor() {
    this.properties = new Map();
    this.currentId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockProperties: InsertProperty[] = [
      {
        title: "Modern Apartment in Downtown",
        description: "Beautiful modern apartment with city views",
        price: 450000.00,
        address: "123 Main St",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-000",
        latitude: -23.5505,
        longitude: -46.6333,
        bedrooms: 2,
        bathrooms: 2,
        squareMeters: 85,
        isForSale: true,
        isForRent: false,
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format"
      },
      {
        title: "Luxury Villa with Pool",
        description: "Spacious villa with private pool",
        price: 2500000.00,
        address: "456 Beach Ave",
        city: "Rio de Janeiro",
        state: "RJ",
        zipCode: "22070-900",
        latitude: -22.9068,
        longitude: -43.1729,
        bedrooms: 4,
        bathrooms: 3,
        squareMeters: 250,
        isForSale: true,
        isForRent: true,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format"
      }
    ];

    mockProperties.forEach(prop => this.createProperty(prop));
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.currentId++;
    const newProperty = { ...property, id };
    this.properties.set(id, newProperty);
    return newProperty;
  }
}

export const storage = new MemStorage();
