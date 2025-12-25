export type VerificationResult = {
    valid: boolean;
    courseId?: string;
    issuer?: string;
};
export declare const verifyCertificate: (objectId: string) => Promise<VerificationResult>;
