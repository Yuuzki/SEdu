import { suiClient } from "./suiClient";
import { PACKAGE_ID, MODULE_NAME } from "./constants";
import { ADMIN_ALLOWLIST } from "./roles";
const CERT_TYPE = `${PACKAGE_ID}::${MODULE_NAME}::Certificate`;
const normalize = (address) => address?.trim().toLowerCase();
export const verifyCertificate = async (objectId) => {
    const object = await suiClient.getObject({
        id: objectId,
        options: { showContent: true },
    });
    const content = object.data?.content;
    if (!content || content.dataType !== "moveObject" || content.type !== CERT_TYPE) {
        return { valid: false };
    }
    const fields = content.fields;
    const issuer = fields.issuer?.toString?.();
    const courseId = fields.course_id?.toString?.();
    const isIssuerAllowed = ADMIN_ALLOWLIST.has(normalize(issuer) ?? "");
    const valid = Boolean(isIssuerAllowed && issuer && courseId);
    return {
        valid,
        courseId,
        issuer,
    };
};
