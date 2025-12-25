import { suiClient } from "./suiClient";
import { PACKAGE_ID, MODULE_NAME } from "./constants";
const CERT_TYPE = `${PACKAGE_ID}::${MODULE_NAME}::Certificate`;
const toCertificate = (obj) => {
    if (!obj)
        return null;
    const content = obj?.content;
    if (!content || content.dataType !== "moveObject") {
        console.warn("Object is not a Move object:", obj.objectId);
        return null;
    }
    // Check if type matches (allow partial match for flexibility)
    const objType = content.type || "";
    if (!objType.includes("Certificate") && objType !== CERT_TYPE) {
        console.warn("Object type mismatch. Expected Certificate, got:", objType);
        return null;
    }
    try {
        const fields = content.fields;
        // Extract fields with better error handling
        const certificate = {
            objectId: obj.objectId,
            courseId: fields.course_id?.toString?.() || fields.courseId?.toString?.() || "",
            issuer: fields.issuer?.toString?.() || "",
            issuedAt: fields.issued_at || fields.issuedAt || fields.issue_date || "",
        };
        // Add optional fields if they exist
        if (fields.title)
            certificate.title = fields.title;
        if (fields.description)
            certificate.description = fields.description;
        if (fields.image_url)
            certificate.imageUrl = fields.image_url;
        if (fields.imageUrl)
            certificate.imageUrl = fields.imageUrl;
        return certificate;
    }
    catch (error) {
        console.error("Error parsing certificate object:", obj.objectId, error);
        return null;
    }
};
export const getMyCertificates = async (walletAddress) => {
    if (!walletAddress || walletAddress.trim() === "") {
        console.warn("Invalid wallet address provided to getMyCertificates");
        return [];
    }
    try {
        console.log("🔍 Fetching certificates for wallet:", walletAddress);
        console.log("🔍 Certificate type filter:", CERT_TYPE);
        const owned = await suiClient.getOwnedObjects({
            owner: walletAddress,
            filter: { StructType: CERT_TYPE },
            options: {
                showContent: true,
                showType: true,
                showOwner: true,
            },
        });
        console.log(`📋 Found ${owned.data?.length || 0} objects for wallet`);
        const certificates = (owned.data ?? [])
            .map(({ data }) => {
            try {
                return toCertificate(data ?? undefined);
            }
            catch (error) {
                console.error("Error processing certificate:", error);
                return null;
            }
        })
            .filter((item) => Boolean(item));
        console.log(`✅ Successfully parsed ${certificates.length} certificates`);
        return certificates;
    }
    catch (error) {
        console.error("❌ Error fetching certificates:", error);
        // Return empty array instead of throwing to prevent UI crashes
        return [];
    }
};
