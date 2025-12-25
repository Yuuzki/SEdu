export type Certificate = {
    objectId: string;
    courseId: string;
    issuer: string;
    issuedAt: string | number;
    title?: string;
    description?: string;
    imageUrl?: string;
};
export declare const getMyCertificates: (walletAddress: string) => Promise<Certificate[]>;
