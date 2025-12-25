export const TESTNET_HELLO_WORLD_PACKAGE_ID = "0x0de8f0a090b81b642d62f6ad9459f2e1cad737bf51d6a3584f5082a91ee3f90c";
// Blog contract values (copied from the blog project)
export const BLOG_CONTRACT = {
    PACKAGE_ID: '0x3c11d4819905061150ee607e605180ed2d8090009d85c45775d8a6ed49390f6f',
    MODULE_NAME: 'blog',
    MODULE_ADDRESS: '0x3c11d4819905061150ee607e605180ed2d8090009d85c45775d8a6ed49390f6f',
};
// Certificate contract configuration
export const PACKAGE_ID = '0xfce5a748488d2365ac0f55055766f44d46006285fcee68b7059121dcee44b2f5'; // Deployed package ID
export const MODULE_NAME = 'certificate'; // Module name từ certificate.move
// Generic export for compatibility if other code expects CONTRACT_CONFIG
export const CONTRACT_CONFIG = {
    PACKAGE_ID: BLOG_CONTRACT.PACKAGE_ID,
    MODULE_NAME: BLOG_CONTRACT.MODULE_NAME,
    MODULE_ADDRESS: BLOG_CONTRACT.MODULE_ADDRESS,
};
