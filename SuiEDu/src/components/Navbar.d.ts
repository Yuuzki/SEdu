import React from "react";
interface NavbarProps {
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
    currentAccount: any;
    onConnect: () => void;
    onDisconnect: () => void;
    currentUser?: {
        fullName: string;
        role: string;
        email: string;
    } | null;
    onLogout?: () => void;
}
declare const Navbar: React.FC<NavbarProps>;
export default Navbar;
