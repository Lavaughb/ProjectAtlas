import { getShopifyClient } from './client';
import type { ShopifyCart, ShopifyLineItem } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCart(checkout: any): ShopifyCart {
  return {
    id: String(checkout.id),
    webUrl: checkout.webUrl,
    lineItems: checkout.lineItems.map((item: any) => ({
      id: String(item.id),
      title: item.title,
      quantity: item.quantity,
      variant: {
        id: String(item.variant.id),
        title: item.variant.title,
        price: item.variant.price?.amount ?? item.variant.price,
        available: item.variant.available,
      },
      image: item.variant.image
        ? { src: item.variant.image.src, altText: item.variant.image.altText ?? null }
        : null,
    })) as ShopifyLineItem[],
    subtotalPrice: checkout.subtotalPrice?.amount ?? checkout.subtotalPrice,
    totalPrice: checkout.totalPrice?.amount ?? checkout.totalPrice,
    lineItemCount: checkout.lineItems.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    ),
  };
}

export async function createCart(): Promise<ShopifyCart> {
  const checkout = await getShopifyClient().checkout.create();
  return mapCart(checkout);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const checkout = await getShopifyClient().checkout.fetch(cartId);
    if (!checkout) return null;
    return mapCart(checkout);
  } catch {
    return null;
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCart> {
  const checkout = await getShopifyClient().checkout.addLineItems(cartId, [
    { variantId, quantity },
  ]);
  return mapCart(checkout);
}

export async function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<ShopifyCart> {
  const checkout = await getShopifyClient().checkout.updateLineItems(cartId, [
    { id: lineItemId, quantity },
  ]);
  return mapCart(checkout);
}

export async function removeFromCart(
  cartId: string,
  lineItemId: string
): Promise<ShopifyCart> {
  const checkout = await getShopifyClient().checkout.removeLineItems(cartId, [
    lineItemId,
  ]);
  return mapCart(checkout);
}
