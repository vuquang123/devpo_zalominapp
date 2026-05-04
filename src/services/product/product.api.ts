import { Product } from "@/types/product.types";
import { mockListOfProduct } from "./product.mock";
import { mockListOfSubCategory } from "../category/category.mock";

export const productService = {
  getProductsFromInventory: async (): Promise<Product[]> => {
    return mockListOfProduct;
  },

  getProducts: async (categoryId: string, featureId: string): Promise<Product[]> => {
    let products = [...mockListOfProduct];
    if (categoryId && categoryId !== "all") {
      products = products.filter(p => p.categoryId === categoryId);
    }
    if (featureId) {
      products = products.filter(p => p.features?.includes(featureId));
    }
    return products;
  },

  getProductById: async (productId: string | number): Promise<Product> => {
    const product = mockListOfProduct.find((p) => String(p.id) === String(productId));
    if (!product) throw new Error(`Product ${productId} not found`);
    return product;
  },

  getProductsBySubCategory: async (subCategoryId: string): Promise<Product[]> => {
    return mockListOfProduct.filter((product) => product.subCategoryId === subCategoryId);
  },

  getProductsGroupBySubCategory: async (categoryId: string, featureId: string) => {
    const products = await productService.getProducts(categoryId, featureId);
    
    const subCategoryMap = new Map<string, Product[]>();
    products.forEach((product) => {
      if (!subCategoryMap.has(product.subCategoryId)) {
        subCategoryMap.set(product.subCategoryId, []);
      }
      subCategoryMap.get(product.subCategoryId)?.push(product);
    });

    const result = Array.from(subCategoryMap.entries()).map(([subCategoryId, subCatProducts]) => {
      const subCategoryMock = mockListOfSubCategory.find(sub => sub.id === subCategoryId);
      return {
        id: subCategoryId,
        name: subCategoryMock ? subCategoryMock.name : subCategoryId,
        products: subCatProducts
      };
    });

    return result;
  },
};
