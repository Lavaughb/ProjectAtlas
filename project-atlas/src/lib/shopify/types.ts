export interface ShopifyImage {
  src: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  available: boolean;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

export interface ShopifyLineItem {
  id: string;
  title: string;
  quantity: number;
  variant: ShopifyVariant;
  image: ShopifyImage | null;
}

export interface ShopifyCart {
  id: string;
  webUrl: string;
  lineItems: ShopifyLineItem[];
  subtotalPrice: string;
  totalPrice: string;
  lineItemCount: number;
}
