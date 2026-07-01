import { NextRequest, NextResponse } from 'next/server';
import { createCart, getCart, addToCart, updateCartItem, removeFromCart } from '@/lib/shopify/cart';

// GET — fetch an existing cart
export async function GET(request: NextRequest) {
  const cartId = request.nextUrl.searchParams.get('cartId');
  if (!cartId) {
    return NextResponse.json({ error: 'cartId is required' }, { status: 400 });
  }

  try {
    const cart = await getCart(cartId);
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Shopify cart fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

// POST — create cart, add item, update item, or remove item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, cartId, variantId, lineItemId, quantity } = body;

    switch (action) {
      case 'create': {
        const cart = await createCart();
        return NextResponse.json(cart);
      }

      case 'add': {
        if (!cartId || !variantId) {
          return NextResponse.json({ error: 'cartId and variantId are required' }, { status: 400 });
        }
        const cart = await addToCart(cartId, variantId, quantity ?? 1);
        return NextResponse.json(cart);
      }

      case 'update': {
        if (!cartId || !lineItemId || quantity === undefined) {
          return NextResponse.json({ error: 'cartId, lineItemId, and quantity are required' }, { status: 400 });
        }
        const cart = await updateCartItem(cartId, lineItemId, quantity);
        return NextResponse.json(cart);
      }

      case 'remove': {
        if (!cartId || !lineItemId) {
          return NextResponse.json({ error: 'cartId and lineItemId are required' }, { status: 400 });
        }
        const cart = await removeFromCart(cartId, lineItemId);
        return NextResponse.json(cart);
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Shopify cart error:', error);
    return NextResponse.json({ error: 'Cart operation failed' }, { status: 500 });
  }
}
