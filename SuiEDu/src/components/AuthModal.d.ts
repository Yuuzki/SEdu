import React from "react";
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: "login" | "register";
    onLoginSuccess: (user: {
        fullName: string;
        role: "student" | "admin";
        email: string;
    }) => void;
}
declare const AuthModal: React.FC<AuthModalProps>;
export default AuthModal;
