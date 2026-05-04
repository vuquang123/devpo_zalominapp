export interface VariantOption {
  id: string;
  name: string;
  extraPrice: number;
  image?: string;
  defaultValue?: string | number | boolean;
  value?: string | number;
  maxValue?: string | number;
  step?: number;
}

export interface VariantGroup {
  id: string;
  title: string;
  description: string;
  type: "SINGLE" | "MULTIPLE" | "ADJUSTMENT" | "QUANTITY";
  isRequired: boolean;
  options: VariantOption[];
}

export interface ProductFeature {
  id: string;
  name: string;
  icon?: string;
}

export interface ProductSales {
  freeShipping?: boolean;
  discount?: number;
  specialPrice?: number;
}

import { StockUnit } from "./stock.types";

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  variantGroups: VariantGroup[];
  features: string[];
  stockUnits?: StockUnit[];

  newMarked?: boolean;
  sales?: ProductSales;

  categoryId: string;
  subCategoryId: string;
}
