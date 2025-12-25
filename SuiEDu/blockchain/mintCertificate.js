import { Transaction } from '@mysten/sui/transactions';
import { PACKAGE_ID, MODULE_NAME } from './constants';
import { suiClient } from './suiClient';
const ISSUE_CERTIFICATE_TARGET = `${PACKAGE_ID}::${MODULE_NAME}::issue_certificate`;
export const mintCertificate = async ({ signAndExecuteTransactionBlock, recipientWallet, certificateId, title, description, imageUrl, issueDate, }) => {
    // Input validation
    if (!recipientWallet || recipientWallet.trim() === "") {
        throw new Error("Recipient wallet address is required");
    }
    if (!certificateId || certificateId.trim() === "") {
        throw new Error("Certificate ID is required");
    }
    if (!title || title.trim() === "") {
        throw new Error("Certificate title is required");
    }
    if (!signAndExecuteTransactionBlock) {
        throw new Error("signAndExecuteTransactionBlock function is required");
    }
    // Validate wallet address format (basic check)
    if (!recipientWallet.startsWith("0x") || recipientWallet.length < 20) {
        throw new Error("Invalid wallet address format");
    }
    const tx = new Transaction();
    // Convert strings to bytes (vector<u8>) as required by the smart contract
    const certificateIdBytes = new TextEncoder().encode(certificateId);
    const titleBytes = new TextEncoder().encode(title);
    const descriptionBytes = new TextEncoder().encode(description || "");
    const imageUrlBytes = new TextEncoder().encode(imageUrl || "");
    // Validate and convert issueDate
    if (!issueDate || isNaN(issueDate)) {
        throw new Error("Invalid issue date");
    }
    const issueDateBigInt = BigInt(Math.floor(issueDate));
    tx.moveCall({
        target: ISSUE_CERTIFICATE_TARGET,
        arguments: [
            tx.pure.address(recipientWallet),
            tx.pure.vector('u8', certificateIdBytes),
            tx.pure.vector('u8', titleBytes),
            tx.pure.vector('u8', descriptionBytes),
            tx.pure.vector('u8', imageUrlBytes),
            tx.pure.u64(issueDateBigInt),
        ],
    });
    // Wrap in Promise để xử lý mutate function từ useSignAndExecuteTransaction
    const response = await new Promise((resolve, reject) => {
        try {
            signAndExecuteTransactionBlock({
                transaction: tx,
                options: {
                    showEffects: true,
                    showObjectChanges: true,
                    showEvents: true,
                    showInput: false,
                },
            }, {
                onSuccess: (result) => {
                    console.log("Transaction success:", result);
                    resolve(result);
                },
                onError: (error) => {
                    console.error("Transaction error:", error);
                    // Nếu user reject transaction trong wallet
                    if (error?.message?.includes('reject') ||
                        error?.message?.includes('denied') ||
                        error?.message?.includes('User rejected') ||
                        error?.code === 'USER_REJECTED') {
                        reject(new Error("Transaction đã bị hủy bởi người dùng trong ví"));
                    }
                    else {
                        reject(new Error(`Lỗi khi ký transaction: ${error?.message || error || 'Unknown error'}`));
                    }
                },
            });
        }
        catch (error) {
            reject(new Error(`Lỗi khi gọi signAndExecuteTransactionBlock: ${error?.message || error || 'Unknown error'}`));
        }
    });
    if (!response) {
        throw new Error("Transaction response is undefined. Có thể transaction đã bị reject hoặc có lỗi xảy ra.");
    }
    if (!response.digest) {
        throw new Error("Transaction digest is missing");
    }
    // Extract object ID from multiple sources with improved logic
    let objectId;
    console.log("🔍 Analyzing transaction response for objectId...");
    console.log("Transaction digest:", response.digest);
    // Helper function to extract objectId from various response structures
    const extractObjectId = (data, source) => {
        if (!data)
            return undefined;
        // Check if it's an array
        if (Array.isArray(data)) {
            for (const item of data) {
                // Try different possible structures
                const id = item?.objectId || item?.reference?.objectId || item?.object?.objectId;
                if (id) {
                    console.log(`✅ Found objectId from ${source} (array):`, id);
                    return id;
                }
            }
        }
        // Check if it's an object
        else if (typeof data === 'object') {
            const id = data.objectId || data.reference?.objectId || data.object?.objectId;
            if (id) {
                console.log(`✅ Found objectId from ${source} (object):`, id);
                return id;
            }
        }
        return undefined;
    };
    // Method 1: Try objectChanges first (most reliable for Sui SDK v1.x)
    if (response.objectChanges && Array.isArray(response.objectChanges)) {
        console.log("📋 Checking objectChanges:", response.objectChanges.length, "items");
        // Look for created objects
        const createdObjects = response.objectChanges.filter((change) => change.type === 'created' || change.type === 'publish');
        if (createdObjects.length > 0) {
            // Try to find Certificate object by type
            const CERT_TYPE = `${PACKAGE_ID}::${MODULE_NAME}::Certificate`;
            const certificateObject = createdObjects.find((change) => {
                const objType = change.objectType || change.type;
                return objType?.includes('Certificate') ||
                    objType?.includes('certificate') ||
                    objType === CERT_TYPE;
            });
            if (certificateObject) {
                objectId = certificateObject.objectId || certificateObject.reference?.objectId;
                if (objectId) {
                    console.log("✅ Found Certificate objectId from objectChanges:", objectId);
                }
            }
            // Fallback: get first created object if Certificate not found
            if (!objectId && createdObjects[0]) {
                objectId = createdObjects[0].objectId || createdObjects[0].reference?.objectId;
                if (objectId) {
                    console.log("✅ Using first created objectId from objectChanges:", objectId);
                }
            }
        }
    }
    // Method 2: Try effects.createdObjects (alternative structure)
    if (!objectId && response.effects?.createdObjects) {
        console.log("📋 Checking effects.createdObjects:", response.effects.createdObjects.length, "items");
        objectId = extractObjectId(response.effects.createdObjects, "effects.createdObjects");
    }
    // Method 3: Try effects.created
    if (!objectId && response.effects?.created) {
        console.log("📋 Checking effects.created");
        objectId = extractObjectId(response.effects.created, "effects.created");
    }
    // Method 4: Try effects.mutated (in case object was mutated)
    if (!objectId && response.effects?.mutated) {
        console.log("📋 Checking effects.mutated");
        objectId = extractObjectId(response.effects.mutated, "effects.mutated");
    }
    // Method 5: Try direct query from transaction digest (fallback with retry)
    if (!objectId && response.digest) {
        console.log("📋 Fallback: Querying transaction details from RPC...");
        // Retry logic: sometimes transaction needs a moment to be indexed
        const maxRetries = 3;
        const retryDelay = 1000; // 1 second
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                // Wait a bit before querying (transaction might not be indexed immediately)
                if (attempt > 1) {
                    await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
                }
                const txDetails = await suiClient.getTransactionBlock({
                    digest: response.digest,
                    options: {
                        showEffects: true,
                        showObjectChanges: true,
                        showInput: false,
                        showEvents: true,
                    },
                });
                console.log(`📋 Transaction details from RPC (attempt ${attempt}):`, JSON.stringify(txDetails, null, 2));
                // Try to extract from queried transaction
                if (txDetails.objectChanges && Array.isArray(txDetails.objectChanges)) {
                    const createdObjects = txDetails.objectChanges.filter((change) => change.type === 'created');
                    if (createdObjects.length > 0) {
                        const CERT_TYPE = `${PACKAGE_ID}::${MODULE_NAME}::Certificate`;
                        const certificateObject = createdObjects.find((change) => {
                            const objType = change.objectType || change.type;
                            return objType?.includes('Certificate') || objType === CERT_TYPE;
                        });
                        objectId = certificateObject?.objectId || createdObjects[0]?.objectId;
                        if (objectId) {
                            console.log(`✅ Found objectId from RPC query (attempt ${attempt}):`, objectId);
                            break; // Success, exit retry loop
                        }
                    }
                }
                // If we got here and still no objectId, try next attempt
                if (attempt < maxRetries) {
                    console.log(`⏳ Retrying transaction query (attempt ${attempt + 1}/${maxRetries})...`);
                }
            }
            catch (error) {
                console.warn(`⚠️ Failed to query transaction details (attempt ${attempt}):`, error?.message || error);
                if (attempt === maxRetries) {
                    console.error("❌ All retry attempts failed to get objectId from RPC");
                }
            }
        }
    }
    // Final check and logging
    if (!objectId) {
        console.warn("⚠️ Could not extract objectId from transaction response");
        console.warn("Available response structure:", {
            hasEffects: !!response.effects,
            hasObjectChanges: !!response.objectChanges,
            effectsKeys: response.effects ? Object.keys(response.effects) : [],
            objectChangesCount: response.objectChanges?.length || 0,
            digest: response.digest,
        });
        console.warn("Full response:", JSON.stringify(response, null, 2));
    }
    else {
        console.log("✅ Successfully extracted objectId:", objectId);
    }
    return {
        transactionDigest: response.digest,
        objectId: objectId,
    };
};
