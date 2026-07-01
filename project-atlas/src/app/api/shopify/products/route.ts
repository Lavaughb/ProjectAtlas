import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductsByCollection, getProductByHandle } from '@/lib/shopify/products';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const collection = searchParams.get('collection');
  const handle = searchParams.get('handle');

  try {
    if (handle) {
      const product = await getProductByHandle(handle);
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product);
    }

    if (collection) {
      const products = await getProductsByCollection(collection);
      return NextResponse.json(products);
    }

    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Shopify products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
