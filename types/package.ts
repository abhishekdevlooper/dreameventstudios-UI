// types/package.ts
export interface PackageOut {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    category: string;
    popular: boolean;
    is_active: boolean;
    image_urls: string[];
    inclusions: string[];
    reviews: string[];
  }
  