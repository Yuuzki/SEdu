import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X, Sparkles, User, Wallet } from "lucide-react";
// Mock users for authentication
const mockUsers = [
    { id: 1, email: "user1@gmail.com", password: "user12345", fullName: "Nguyễn Văn Học Viên", role: "student" },
    { id: 2, email: "admin1@gmail.com", password: "admin12345", fullName: "Admin Sui Academy", role: "admin" }
];
const SuiLogo = ({ className = "w-6 h-6" }) => (_jsxs("svg", { viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: className, children: [_jsx("path", { d: "M50 0C50 0 20 35 20 60C20 76.5685 33.4315 90 50 90C66.5685 90 80 76.5685 80 60C80 35 50 0 50 0Z", fill: "currentColor" }), _jsx("path", { d: "M50 15C50 15 30 40 30 60C30 71.0457 38.9543 80 50 80C61.0457 80 70 71.0457 70 60C70 40 50 15 50 15Z", fill: "white", fillOpacity: "0.3" })] }));
const AuthModal = ({ isOpen, onClose, initialMode = "login", onLoginSuccess }) => {
    const [mode, setMode] = useState(initialMode);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    // Form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // Reset mode and clear form when modal opens with new initialMode
    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            setError(null);
            setEmail("");
            setPassword("");
            setFullName("");
            setConfirmPassword("");
        }
    }, [isOpen, initialMode]);
    // Clear error when switching modes
    useEffect(() => {
        setError(null);
    }, [mode]);
    if (!isOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        // Normalize inputs - trim spaces and lowercase email
        const normalizedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();
        const trimmedFullName = fullName.trim();
        const trimmedConfirm = confirmPassword.trim();
        if (mode === "register") {
            // Check if email already exists
            const existingUser = mockUsers.find(user => user.email.toLowerCase() === normalizedEmail);
            if (existingUser) {
                setError("Email đã được sử dụng");
                return;
            }
            // Check password confirmation
            if (trimmedPassword !== trimmedConfirm) {
                setError("Mật khẩu xác nhận không khớp");
                return;
            }
            // Successful registration - default to student role
            const newUser = {
                fullName: trimmedFullName || "Người dùng",
                role: "student",
                email: normalizedEmail
            };
            console.log("Đăng ký thành công:", newUser);
            onLoginSuccess(newUser);
            onClose();
        }
        else {
            // Login mode - find user by normalized email and trimmed password
            const foundUser = mockUsers.find(user => user.email.toLowerCase() === normalizedEmail && user.password === trimmedPassword);
            console.log("Thử đăng nhập:", { normalizedEmail, trimmedPassword, foundUser: !!foundUser });
            if (!foundUser) {
                setError("Email hoặc mật khẩu không đúng");
                return;
            }
            console.log("Đăng nhập thành công:", foundUser);
            onLoginSuccess({
                fullName: foundUser.fullName,
                role: foundUser.role,
                email: foundUser.email
            });
            onClose();
        }
    };
    const handleWalletLogin = () => {
        console.log("Đăng nhập bằng ví Sui");
        // Mock successful wallet login - always student role
        onLoginSuccess({
            fullName: "Sui Wallet User",
            role: "student",
            email: "wallet@sui.io"
        });
        onClose();
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [_jsxs(motion.div, { className: "fixed inset-0 bg-gradient-to-br from-slate-900/95 via-primary-900/90 to-neon-purple/80 backdrop-blur-xl", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, children: [_jsx(motion.div, { className: "absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-500/20 blur-3xl", animate: { y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.1, 1] }, transition: { duration: 8, repeat: Infinity } }), _jsx(motion.div, { className: "absolute bottom-20 right-32 w-80 h-80 rounded-full bg-neon-purple/20 blur-3xl", animate: { y: [20, -20, 20], x: [10, -10, 10], scale: [1.1, 1, 1.1] }, transition: { duration: 10, repeat: Infinity } }), _jsx(motion.div, { className: "absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl", animate: { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }, transition: { duration: 6, repeat: Infinity } })] }), _jsx(motion.div, { className: "relative w-full max-w-sm sm:max-w-md overflow-hidden", initial: { scale: 0.9, opacity: 0, y: 20 }, animate: { scale: 1, opacity: 1, y: 0 }, exit: { scale: 0.9, opacity: 0, y: 20 }, transition: { type: "spring", stiffness: 300, damping: 25 }, onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden max-h-[90vh] overflow-y-auto", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" }), _jsx(motion.button, { onClick: onClose, className: "absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors z-10 backdrop-blur-md border border-white/20", whileHover: { scale: 1.1, rotate: 90 }, whileTap: { scale: 0.9 }, children: _jsx(X, { className: "w-4 h-4 text-white" }) }), _jsxs("div", { className: "relative p-4 pt-12", children: [_jsxs(motion.div, { className: "flex items-center gap-3 mb-2", initial: { y: 12, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.06 }, children: [_jsx("div", { className: "inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-neon-purple rounded-lg shadow-glow", children: _jsx(SuiLogo, { className: "text-white w-6 h-6" }) }), _jsxs("div", { className: "leading-none", children: [_jsx("div", { className: "text-sm font-black text-white tracking-tight uppercase", children: "Sui Academy" }), _jsx("div", { className: "text-[10px] text-cyan-300 font-bold tracking-widest uppercase", children: "Ecosystem Education" })] })] }), _jsxs(motion.div, { className: "text-left mb-2", initial: { y: 8, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.08 }, children: [_jsx("h2", { className: "text-xl font-black text-white tracking-tight", children: mode === "login" ? "Đăng nhập" : "Đăng ký" }), _jsx("p", { className: "text-[11px] text-white/60 mt-1", children: mode === "login"
                                                    ? "Chào mừng bạn quay lại Sui Academy"
                                                    : "Tạo tài khoản để bắt đầu học" })] }), _jsxs(motion.form, { onSubmit: handleSubmit, className: "space-y-2", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.12 }, children: [_jsx(AnimatePresence, { mode: "wait", children: mode === "register" && (_jsxs(motion.div, { className: "relative", initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2 }, children: [_jsx(User, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: "text", placeholder: "H\u1ECD v\u00E0 t\u00EAn", value: fullName, onChange: (e) => setFullName(e.target.value), className: "w-full pl-12 pr-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-xl text-white placeholder:text-white/30 border border-white/10 focus:outline-none focus:ring-4 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-inner", required: true })] })) }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full pl-12 pr-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-xl text-white placeholder:text-white/30 border border-white/10 focus:outline-none focus:ring-4 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-inner", required: true })] }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: showPassword ? "text" : "password", placeholder: "M\u1EADt kh\u1EA9u", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full pl-12 pr-12 py-2.5 bg-white/5 backdrop-blur-sm rounded-xl text-white placeholder:text-white/30 border border-white/10 focus:outline-none focus:ring-4 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-inner", required: true }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors", children: showPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] }), _jsx(AnimatePresence, { mode: "wait", children: mode === "register" && (_jsxs(motion.div, { className: "relative", initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2 }, children: [_jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" }), _jsx("input", { type: showConfirmPassword ? "text" : "password", placeholder: "X\u00E1c nh\u1EADn m\u1EADt kh\u1EA9u", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full pl-12 pr-12 py-2.5 bg-white/5 backdrop-blur-sm rounded-xl text-white placeholder:text-white/30 border border-white/10 focus:outline-none focus:ring-4 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all shadow-inner", required: true }), _jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors", children: showConfirmPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] })) }), mode === "login" && (_jsx("div", { className: "text-right", children: _jsx("button", { type: "button", className: "text-xs text-white/60 hover:text-white font-medium transition-colors", children: "Qu\u00EAn m\u1EADt kh\u1EA9u?" }) })), _jsxs(motion.button, { type: "submit", className: "w-full py-2.5 bg-gradient-to-r from-primary-500 to-neon-purple text-white font-bold rounded-xl relative overflow-hidden group", whileHover: { scale: 1.02, y: -1.5 }, whileTap: { scale: 0.98, y: 0 }, style: {
                                                    boxShadow: "0 3px 0 #0082CC, 0 6px 12px rgba(0, 163, 255, 0.3)",
                                                }, children: [_jsxs("span", { className: "relative z-10 flex items-center justify-center space-x-2", children: [_jsx(Sparkles, { className: "w-5 h-5" }), _jsx("span", { children: mode === "login" ? "Đăng nhập" : "Đăng ký" })] }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-neon-purple to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(motion.div, { className: "absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity", style: {
                                                            background: "radial-gradient(circle at center, white 0%, transparent 70%)"
                                                        } })] }), _jsx(AnimatePresence, { children: error && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800", children: _jsx("p", { className: "text-sm text-red-600 dark:text-red-400 text-center font-medium", children: error }) })) })] }), _jsxs("div", { className: "relative my-4", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-slate-200 dark:border-slate-700" }) }), _jsx("div", { className: "relative flex justify-center", children: _jsx("span", { className: "px-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-xs text-slate-400 rounded-full", children: "ho\u1EB7c" }) })] }), _jsxs(motion.button, { type: "button", onClick: handleWalletLogin, className: "w-full flex items-center justify-center space-x-3 py-2.5 bg-white/5 backdrop-blur-sm text-white font-bold rounded-xl relative overflow-hidden group border border-white/10", whileHover: { scale: 1.02, y: -1.5 }, whileTap: { scale: 0.98, y: 0 }, style: {
                                            boxShadow: "0 3px 12px rgba(255, 255, 255, 0.08)",
                                        }, children: [_jsx(Wallet, { className: "w-5 h-5 group-hover:rotate-12 transition-transform" }), _jsx("span", { children: "\u0110\u0103ng nh\u1EADp b\u1EB1ng V\u00ED Sui" }), _jsx(motion.div, { className: "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity", style: {
                                                    background: "radial-gradient(circle at center, white 0%, transparent 70%)"
                                                } })] }), _jsxs("p", { className: "text-center mt-3 text-[11px] text-white/60", children: [mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?", " ", _jsx("button", { type: "button", onClick: () => setMode(mode === "login" ? "register" : "login"), className: "text-white font-bold hover:text-primary-300 transition-colors", children: mode === "login" ? "Đăng ký ngay" : "Đăng nhập" })] })] })] }) })] })) }));
};
export default AuthModal;
