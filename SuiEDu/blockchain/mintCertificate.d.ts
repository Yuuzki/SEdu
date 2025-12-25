export type MintCertificateInput = {
    signAndExecuteTransactionBlock: any;
    recipientWallet: string;
    certificateId: string;
    title: string;
    description: string;
    imageUrl: string;
    issueDate: number;
};
export type MintCertificateResult = {
    transactionDigest: string;
    objectId?: string;
};
export declare const mintCertificate: ({ signAndExecuteTransactionBlock, recipientWallet, certificateId, title, description, imageUrl, issueDate, }: MintCertificateInput) => Promise<MintCertificateResult>;
