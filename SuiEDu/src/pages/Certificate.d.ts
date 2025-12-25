import React from "react";
import { AdminQueueEntry, NotificationItem } from "../AdminView";
declare global {
    interface Window {
        confetti?: (options: Record<string, unknown>) => void;
    }
}
interface CertificateProps {
    onEnterAdmin?: (preview?: string | null) => void;
    onQueueSubmission?: (entry: AdminQueueEntry) => void;
    onQueueNotification?: (notification: NotificationItem) => void;
}
declare const Certificate: React.FC<CertificateProps>;
export default Certificate;
