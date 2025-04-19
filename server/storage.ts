import { elements, type Element, type InsertElement } from "@shared/schema";
import { type User, type InsertUser, users } from "@shared/schema";

export interface IStorage {
  // User methods (keeping for future features)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Element methods
  getAllElements(): Promise<Element[]>;
  getElementById(id: number): Promise<Element | undefined>;
  getElementBySymbol(symbol: string): Promise<Element | undefined>;
  createElement(element: InsertElement): Promise<Element>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private elements: Map<number, Element>;
  userCurrentId: number;
  elementCurrentId: number;

  constructor() {
    this.users = new Map();
    this.elements = new Map();
    this.userCurrentId = 1;
    this.elementCurrentId = 1;
    
    // Initialize with predefined elements
    this.initializeElements();
  }

  // Initialize the periodic table elements
  private async initializeElements() {
    const elementsList: InsertElement[] = [
      // Fila 1
      { symbol: "H", name: "hidrogen", number: 1, type: "no-metall" },
      { symbol: "He", name: "heli", number: 2, type: "gas-noble" },
      
      // Fila 2
      { symbol: "Li", name: "liti", number: 3, type: "metall-alcali" },
      { symbol: "Be", name: "beril·li", number: 4, type: "metall-alcalino" },
      { symbol: "B", name: "bor", number: 5, type: "metal·loide" },
      { symbol: "C", name: "carboni", number: 6, type: "no-metall" },
      { symbol: "N", name: "nitrogen", number: 7, type: "no-metall" },
      { symbol: "O", name: "oxigen", number: 8, type: "no-metall" },
      { symbol: "F", name: "fluor", number: 9, type: "no-metall" },
      { symbol: "Ne", name: "neó", number: 10, type: "gas-noble" },
      
      // Fila 3
      { symbol: "Na", name: "sodi", number: 11, type: "metall-alcali" },
      { symbol: "Mg", name: "magnesi", number: 12, type: "metall-alcalino" },
      { symbol: "Al", name: "alumini", number: 13, type: "metall-grup13" },
      { symbol: "Si", name: "silici", number: 14, type: "metal·loide" },
      { symbol: "P", name: "fòsfor", number: 15, type: "no-metall" },
      { symbol: "S", name: "sofre", number: 16, type: "no-metall" },
      { symbol: "Cl", name: "clor", number: 17, type: "no-metall" },
      { symbol: "Ar", name: "argó", number: 18, type: "gas-noble" },
      
      // Fila 4 - Simplificada
      { symbol: "K", name: "potassi", number: 19, type: "metall-alcali" },
      { symbol: "Ca", name: "calci", number: 20, type: "metall-alcalino" },
      { symbol: "Cr", name: "crom", number: 24, type: "metall-transicio" },
      { symbol: "Mn", name: "manganès", number: 25, type: "metall-transicio" },
      { symbol: "Fe", name: "ferro", number: 26, type: "metall-transicio" },
      { symbol: "Co", name: "cobalt", number: 27, type: "metall-transicio" },
      { symbol: "Ni", name: "níquel", number: 28, type: "metall-transicio" },
      { symbol: "Cu", name: "coure", number: 29, type: "metall-transicio" },
      { symbol: "Zn", name: "zinc", number: 30, type: "metall-transicio" },
      { symbol: "Ga", name: "gal·li", number: 31, type: "metall-grup13" },
      { symbol: "Ge", name: "germani", number: 32, type: "metal·loide" },
      { symbol: "As", name: "arsènic", number: 33, type: "metal·loide" },
      { symbol: "Se", name: "seleni", number: 34, type: "no-metall" },
      { symbol: "Br", name: "brom", number: 35, type: "no-metall" },
      { symbol: "Kr", name: "criptó", number: 36, type: "gas-noble" },
      
      // Fila 5 - Simplificada
      { symbol: "Rb", name: "rubidi", number: 37, type: "metall-alcali" },
      { symbol: "Sr", name: "estronci", number: 38, type: "metall-alcalino" },
      { symbol: "Pd", name: "pal·ladi", number: 46, type: "metall-transicio" },
      { symbol: "Ag", name: "plata", number: 47, type: "metall-transicio" },
      { symbol: "Cd", name: "cadmi", number: 48, type: "metall-transicio" },
      { symbol: "In", name: "indi", number: 49, type: "metall-grup13" },
      { symbol: "Sn", name: "estany", number: 50, type: "metall-grup14" },
      { symbol: "Sb", name: "antimoni", number: 51, type: "metal·loide" },
      { symbol: "Te", name: "tel·luri", number: 52, type: "metal·loide" },
      { symbol: "I", name: "iode", number: 53, type: "no-metall" },
      { symbol: "Xe", name: "xenó", number: 54, type: "gas-noble" },
      
      // Fila 6 - Simplificada
      { symbol: "Cs", name: "cesi", number: 55, type: "metall-alcali" },
      { symbol: "Ba", name: "bari", number: 56, type: "metall-alcalino" },
      { symbol: "Pt", name: "platí", number: 78, type: "metall-transicio" },
      { symbol: "Au", name: "or", number: 79, type: "metall-transicio" },
      { symbol: "Hg", name: "mercuri", number: 80, type: "metall-transicio" },
      { symbol: "Tl", name: "tal·li", number: 81, type: "metall-grup13" },
      { symbol: "Pb", name: "plom", number: 82, type: "metall-grup14" },
      { symbol: "Bi", name: "bismut", number: 83, type: "metall-grup15" },
      { symbol: "Po", name: "poloni", number: 84, type: "metal·loide" },
      { symbol: "At", name: "àstat", number: 85, type: "no-metall" },
      { symbol: "Rn", name: "radó", number: 86, type: "gas-noble" },
      
      // Fila 7 - Només Fr i Ra
      { symbol: "Fr", name: "franci", number: 87, type: "metall-alcali" },
      { symbol: "Ra", name: "radi", number: 88, type: "metall-alcalino" }
    ];
    
    for (const elementData of elementsList) {
      const id = this.elementCurrentId++;
      const element: Element = { ...elementData, id };
      this.elements.set(id, element);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Element methods
  async getAllElements(): Promise<Element[]> {
    return Array.from(this.elements.values());
  }

  async getElementById(id: number): Promise<Element | undefined> {
    return this.elements.get(id);
  }

  async getElementBySymbol(symbol: string): Promise<Element | undefined> {
    return Array.from(this.elements.values()).find(
      (element) => element.symbol.toLowerCase() === symbol.toLowerCase(),
    );
  }

  async createElement(insertElement: InsertElement): Promise<Element> {
    const id = this.elementCurrentId++;
    const element: Element = { ...insertElement, id };
    this.elements.set(id, element);
    return element;
  }
}

export const storage = new MemStorage();
