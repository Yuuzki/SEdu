import React from "react";
export type UserPayload = {
    request_id: string;
    user_wallet: string;
    course: {
        course_id: string;
        course_name: string;
    };
    display_name: string;
    completion: {
        completed: boolean;
        completed_at: string;
    };
    certificate_preview: {
        preview_url: string | null;
        preview_hash: string;
    };
    status: "pending" | "approved" | "rejected";
    submitted_at: string;
};
export type AdminPayload = {
    request_id: string;
    recipient_wallet: string;
    course: {
        course_id: string;
        course_name: string;
    };
    completion_status: {
        verified: boolean;
        completed_at: string;
    };
    certificate_preview: {
        preview_url: string | null;
        preview_hash: string;
    };
    admin_decision: {
        status: "pending" | "approved" | "rejected";
        reviewed_by: string;
        reviewed_at: string;
        note: string;
    };
};
export type AdminQueueEntry = {
    requestId: string;
    studentName: string;
    courseName: string;
    courseId: string;
    completionDate: string;
    wallet: string;
    certificatePreview?: string | null;
    userPayload: UserPayload;
    adminPayload: AdminPayload;
};
export type NotificationItem = {
    id: string;
    requestId: string;
    message: string;
    createdAt: string;
    status: "pending" | "seen";
};
declare const AdminView: React.FC<{
    onExit?: () => void;
    certificateImage?: string | null;
    requests?: AdminQueueEntry[];
    notifications?: NotificationItem[];
    onMarkNotificationSeen?: (id: string) => void;
}>;
export default AdminView;
