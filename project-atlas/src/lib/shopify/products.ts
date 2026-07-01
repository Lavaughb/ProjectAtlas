import { getShopifyClient } from './client';
import type { ShopifyProduct, ShopifyImage, ShopifyVariant } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(product: any): ShopifyProduct {
  return {
    id: String(product.id),
    title: product.title,
    handle: product.handle,
    description: product.description,
    images: product.images.map((img: any) => ({
      src: img.src,
      altText: img.altText ?? null,
    })) as ShopifyImage[],
    variants: product.variants.map((v: any) => ({
      id: String(v.id),
      title: v.title,
      price: v.price?.amount ?? v.price,
      available: v.available,
    })) as ShopifyVariant[],
  };
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const products = await getShopifyClient().product.fetchAll();
  return products.map(mapProduct);
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const product = await getShopifyClient().product.fetchByHandle(handle);
  if (!product) return null;
  return mapProduct(product);
}

export async function getProductsByCollection(
  collectionHandle: string
): Promise<ShopifyProduct[]> {
  const collection =
    await getShopifyClient().collection.fetchByHandle(collectionHandle);
  if (!collection) return [];

  // fetchByHandle doesn't include products, so fetch with products
  const collectionWithProducts = await getShopifyClient().collection.fetchWithProducts(
    collection.id
  );
  if (!collectionWithProducts?.products) return [];

  return collectionWithProducts.products.map(mapProduct);
}
