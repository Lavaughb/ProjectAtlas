import ShopifyBuy from 'shopify-buy';

const domain = process.env.SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

if (!domain || !storefrontAccessToken) {
  throw new Error(
    'Missing SHOPIFY_DOMAIN or SHOPIFY_STOREFRONT_TOKEN environment variables'
  );
}

export const shopifyClient = ShopifyBuy.buildClient({
  domain,
  storefrontAccessToken,
  apiVersion: '2024-01',
});
