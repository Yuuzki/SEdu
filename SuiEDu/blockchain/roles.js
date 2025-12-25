const normalize = (address) => address?.trim().toLowerCase();
// TODO: Replace with real admin Sui addresses as they are onboarded.
export const ADMIN_ALLOWLIST = new Set([
// "0xadminaddress",
]);
export const isAdmin = (address) => {
    const normalized = normalize(address);
    return normalized ? ADMIN_ALLOWLIST.has(normalized) : false;
};
