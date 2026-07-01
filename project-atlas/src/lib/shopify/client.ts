import ShopifyBuy from 'shopify-buy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: any = null;

export function getShopifyClient() {
  if (_client) return _client;

  const domain = process.env.SHOPIFY_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

  if (!domain || !storefrontAccessToken) {
    throw new Error(
      'Missing SHOPIFY_DOMAIN or SHOPIFY_STOREFRONT_TOKEN environment variables'
    );
  }

  _client = ShopifyBuy.buildClient({
    domain,
    storefrontAccessToken,
    apiVersion: '2024-01',
  });

  return _client;
}
