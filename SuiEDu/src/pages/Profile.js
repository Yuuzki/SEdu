import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Award, BookOpen, ChevronRight, ExternalLink, LogOut, Wallet, Sparkles, Trophy, GraduationCap, Copy, Check, Coins, Calendar, Gamepad2, Users, Clock, } from "lucide-react";
import { useSlushWallet } from "../../blockchain/wallet";
// Mock data for user progress
const userProgress = [
    {
        courseId: 1,
        courseName: "Lập trình Move cơ bản",
        courseImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
        progress: 100,
        isCertified: true,
        lessonsCompleted: 12,
        totalLessons: 12,
        lastAccessed: "2024-12-15",
    },
    {
        courseId: 2,
        courseName: "DeFi trên Sui Network",
        courseImage: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop",
        progress: 65,
        isCertified: false,
        lessonsCompleted: 10,
        totalLessons: 15,
        lastAccessed: "2024-12-18",
    },
    {
        courseId: 3,
        courseName: "NFT & Digital Assets",
        courseImage: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop",
        progress: 30,
        isCertified: false,
        lessonsCompleted: 3,
        totalLessons: 10,
        lastAccessed: "2024-12-10",
    },
];
// Mock data for certificates
const userCertificates = [
    {
        id: "cert-1",
        courseId: 1,
        courseName: "Lập trình Move cơ bản",
        issuedDate: "2024-12-15",
        txHash: "0x8a7f...3e2b",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    },
];
// Mock data for token history
const mockTokenHistory = [
    { date: "2024-12-20", source: "Hoàn thành khóa học Lập trình Move cơ bản", amount: 5, icon: BookOpen },
    { date: "2024-12-18", source: "Tham gia Minigame", amount: 3, icon: Gamepad2 },
    { date: "2024-12-15", source: "Tham gia Workshop", amount: 10, icon: Users },
    { date: "2024-12-14", source: "Điểm danh hàng ngày", amount: 2, icon: Calendar },
];
// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
    const handleMouseMove = (e) => {
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX / rect.width - 0.5);
        y.set(e.clientY / rect.height - 0.5);
    };
    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };
    return (_jsx(motion.div, { ref: ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, style: {
            rotateY,
            rotateX,
            transformStyle: "preserve-3d",
        }, className: `${className} perspective-1000`, children: _jsx("div", { style: { transform: "translateZ(20px)" }, children: children }) }));
};
// Web3 Avatar component with animation
const Web3Avatar = ({ address, size = "lg" }) => {
    const generateColors = (addr) => {
        const hash = addr.slice(2, 10);
        const hue1 = parseInt(hash.slice(0, 2), 16) % 360;
        const hue2 = (hue1 + 60) % 360;
        return {
            from: `hsl(${hue1}, 70%, 60%)`,
            to: `hsl(${hue2}, 70%, 50%)`,
        };
    };
    const colors = generateColors(address);
    const sizeClasses = {
        sm: "w-12 h-12",
        md: "w-20 h-20",
        lg: "w-28 h-28",
    };
    return (_jsxs(motion.div, { className: `${sizeClasses[size]} rounded-3xl flex items-center justify-center shadow-3d relative overflow-hidden`, style: {
            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
        }, whileHover: { scale: 1.05, rotate: 5 }, animate: {
            boxShadow: [
                "0 10px 30px rgba(0, 163, 255, 0.3)",
                "0 15px 40px rgba(168, 85, 247, 0.3)",
                "0 10px 30px rgba(0, 163, 255, 0.3)",
            ],
        }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }, children: [_jsx("div", { className: "absolute inset-0 opacity-30", children: _jsx("div", { className: "absolute inset-0", style: {
                        backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
                    } }) }), _jsx(motion.div, { animate: { rotate: [0, 360] }, transition: { duration: 20, repeat: Infinity, ease: "linear" }, children: _jsx(Wallet, { className: `${size === "lg" ? "w-12 h-12" : size === "md" ? "w-8 h-8" : "w-5 h-5"} text-white relative z-10` }) })] }));
};
// Progress Bar component with animation
const ProgressBar = ({ progress }) => (_jsx("div", { className: "w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden", children: _jsx(motion.div, { className: "h-full rounded-full", initial: { width: 0 }, whileInView: { width: `${progress}%` }, viewport: { once: true }, transition: { duration: 1, delay: 0.2, ease: "easeOut" }, style: {
            background: progress === 100
                ? "linear-gradient(90deg, #10B981, #34D399)"
                : "linear-gradient(90deg, #00A3FF, #A855F7)",
        } }) }));
// Course Card component
const CourseCard = ({ course }) => (_jsx(TiltCard, { children: _jsxs(motion.div, { className: "glass-card dark:glass-card rounded-3xl overflow-hidden cursor-pointer h-full", whileHover: {
            y: -10,
            boxShadow: "0 20px 40px rgba(0, 163, 255, 0.2)",
        }, children: [_jsxs("div", { className: "relative h-44 overflow-hidden", children: [_jsx(motion.img, { src: course.courseImage, alt: course.courseName, className: "w-full h-full object-cover", whileHover: { scale: 1.1 }, transition: { duration: 0.5 } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }), course.progress === 100 && (_jsxs(motion.div, { className: "absolute top-3 right-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg", initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: "spring", stiffness: 500 }, children: [_jsx(Trophy, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Ho\u00E0n th\u00E0nh" })] }))] }), _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "font-bold text-slate-900 dark:text-white mb-4 text-lg line-clamp-2", children: course.courseName }), _jsxs("div", { className: "mb-5", children: [_jsxs("div", { className: "flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 mb-2", children: [_jsxs("span", { children: [course.lessonsCompleted, "/", course.totalLessons, " b\u00E0i h\u1ECDc"] }), _jsxs("span", { className: "font-bold", style: { color: course.progress === 100 ? "#10B981" : "#00A3FF" }, children: [course.progress, "%"] })] }), _jsx(ProgressBar, { progress: course.progress })] }), _jsx(Link, { to: `/learn/${course.courseId}`, children: _jsxs(motion.button, { className: "w-full py-3 rounded-xl glass-light dark:glass-dark text-slate-700 dark:text-white text-sm font-bold flex items-center justify-center space-x-2 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-600 transition-colors", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(BookOpen, { className: "w-4 h-4" }), _jsx("span", { children: course.progress === 100 ? "Xem bài học" : "Tiếp tục học" })] }) })] })] }) }));
// Certificate Card component
const CertificateCard = ({ certificate }) => (_jsx(TiltCard, { children: _jsxs(motion.div, { className: "glass-card dark:glass-card rounded-3xl overflow-hidden cursor-pointer h-full", whileHover: {
            y: -10,
            boxShadow: "0 20px 40px rgba(0, 163, 255, 0.25)",
        }, children: [_jsxs("div", { className: "relative h-40 overflow-hidden bg-gradient-to-br from-primary-500/20 to-neon-purple/20 dark:from-primary-900/30 dark:to-neon-purple/30", children: [_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(motion.div, { className: "w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-400 to-neon-purple flex items-center justify-center shadow-glow", animate: {
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                            }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }, children: _jsx(Award, { className: "w-12 h-12 text-white" }) }) }), _jsxs(motion.div, { className: "absolute top-3 left-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg", animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity }, children: [_jsx(Sparkles, { className: "w-3 h-3" }), _jsx("span", { children: "NFT" })] })] }), _jsxs("div", { className: "p-5", children: [_jsx("h3", { className: "font-bold text-slate-900 dark:text-white text-sm mb-2 line-clamp-2", children: certificate.courseName }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-4", children: ["C\u1EA5p ng\u00E0y: ", new Date(certificate.issuedDate).toLocaleDateString("vi-VN")] }), _jsx(Link, { to: "/certificate", children: _jsxs(motion.button, { className: "w-full py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-neon-purple text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-3d", whileHover: { scale: 1.02, y: -2 }, whileTap: { scale: 0.98, y: 0 }, children: [_jsx(ExternalLink, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Xem chi ti\u1EBFt" })] }) })] })] }) }));
// Empty State component
const EmptyState = ({ icon, title, description, actionLabel, actionLink }) => (_jsxs(motion.div, { className: "text-center py-20", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: [_jsx(motion.div, { className: "w-24 h-24 mx-auto rounded-3xl glass-light dark:glass-dark flex items-center justify-center mb-8", animate: {
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 1],
            }, transition: { duration: 3, repeat: Infinity }, children: icon }), _jsx("h3", { className: "text-xl font-bold text-slate-900 dark:text-white mb-3", children: title }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto", children: description }), _jsx(Link, { to: actionLink, children: _jsxs(motion.button, { className: "inline-flex items-center space-x-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-neon-purple text-white font-bold shadow-3d", whileHover: { scale: 1.05, y: -3 }, whileTap: { scale: 0.98 }, children: [_jsx("span", { children: actionLabel }), _jsx(ChevronRight, { className: "w-5 h-5" })] }) })] }));
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
    },
};
const Profile = () => {
    const { currentAccount, disconnectWallet, isDisconnecting, connectSlush, isConnecting } = useSlushWallet();
    const [activeTab, setActiveTab] = useState("courses");
    const [copied, setCopied] = useState(false);
    const [totalTokens, setTotalTokens] = useState(0);
    const [tokenHistory, setTokenHistory] = useState([]);
    // Fetch token data
    useEffect(() => {
        // Calculate total from mock data
        const total = mockTokenHistory.reduce((sum, item) => sum + item.amount, 0);
        setTotalTokens(total);
        setTokenHistory(mockTokenHistory);
    }, []);
    const walletAddress = currentAccount?.address ?? null;
    const shortWallet = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "";
    const completedCourses = userProgress.filter((c) => c.progress === 100 && c.isCertified);
    const handleCopyAddress = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    if (!walletAddress) {
        return (_jsx("div", { className: "min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900", children: _jsxs(motion.div, { className: "max-w-4xl mx-auto text-center py-20", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, children: [_jsx(motion.div, { className: "w-28 h-28 mx-auto rounded-3xl glass-light dark:glass-dark flex items-center justify-center mb-8", animate: {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.05, 1],
                        }, transition: { duration: 3, repeat: Infinity }, children: _jsx(Wallet, { className: "w-14 h-14 text-slate-400" }) }), _jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-4", children: "Vui l\u00F2ng k\u1EBFt n\u1ED1i v\u00ED" }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 mb-6", children: "B\u1EA1n c\u1EA7n k\u1EBFt n\u1ED1i v\u00ED Sui \u0111\u1EC3 xem h\u1ED3 s\u01A1 c\u00E1 nh\u00E2n" }), _jsx("div", { className: "flex justify-center", children: _jsxs(motion.button, { onClick: () => connectSlush(), disabled: isConnecting, className: "inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-3d", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Wallet, { className: "w-5 h-5" }), _jsx("span", { children: isConnecting ? 'Đang kết nối...' : 'Kết nối ví Slush' })] }) })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen pt-32 pb-20 px-4 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden", children: [_jsxs("div", { className: "fixed inset-0 pointer-events-none overflow-hidden", children: [_jsx(motion.div, { className: "absolute top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/20 to-neon-purple/10 rounded-full blur-3xl", animate: {
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }, transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } }), _jsx(motion.div, { className: "absolute bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-neon-cyan/20 to-primary-400/10 rounded-full blur-3xl", animate: {
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }, transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 } })] }), _jsxs(motion.div, { className: "relative max-w-6xl mx-auto", variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: itemVariants, className: "glass-card dark:glass-card rounded-[2rem] p-8 md:p-10 mb-10", children: _jsxs("div", { className: "flex flex-col md:flex-row items-center md:items-start gap-8", children: [_jsx(Web3Avatar, { address: walletAddress, size: "lg" }), _jsxs("div", { className: "flex-1 text-center md:text-left", children: [_jsx("h1", { className: "text-3xl font-black text-slate-900 dark:text-white mb-4", children: "H\u1ED3 s\u01A1 h\u1ECDc vi\u00EAn" }), _jsxs(motion.div, { className: "inline-flex items-center space-x-3 px-5 py-3 rounded-2xl glass-light dark:glass-dark mb-6", whileHover: { scale: 1.02 }, children: [_jsx(Wallet, { className: "w-5 h-5 text-slate-500 dark:text-slate-400" }), _jsx("span", { className: "text-sm font-mono text-slate-700 dark:text-slate-300", children: shortWallet }), _jsx(motion.button, { onClick: handleCopyAddress, className: "text-primary-500 hover:text-primary-600 dark:text-primary-400", whileTap: { scale: 0.9 }, children: _jsx(AnimatePresence, { mode: "wait", children: copied ? (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, exit: { scale: 0 }, children: _jsx(Check, { className: "w-4 h-4 text-emerald-500" }) }, "check")) : (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, exit: { scale: 0 }, children: _jsx(Copy, { className: "w-4 h-4" }) }, "copy")) }) })] }), _jsxs("div", { className: "flex flex-wrap justify-center md:justify-start gap-6", children: [_jsxs(motion.div, { className: "flex items-center space-x-3", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400/20 to-primary-500/20 dark:from-primary-900/50 dark:to-primary-800/50 flex items-center justify-center", children: _jsx(BookOpen, { className: "w-5 h-5 text-primary-500" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-lg text-slate-900 dark:text-white", children: userProgress.length }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 text-xs", children: "Kh\u00F3a h\u1ECDc" })] })] }), _jsxs(motion.div, { className: "flex items-center space-x-3", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-500/20 dark:from-emerald-900/50 dark:to-emerald-800/50 flex items-center justify-center", children: _jsx(Trophy, { className: "w-5 h-5 text-emerald-500" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-lg text-slate-900 dark:text-white", children: completedCourses.length }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 text-xs", children: "Ho\u00E0n th\u00E0nh" })] })] }), _jsxs(motion.div, { className: "flex items-center space-x-3", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-500/20 dark:from-purple-900/50 dark:to-purple-800/50 flex items-center justify-center", children: _jsx(Award, { className: "w-5 h-5 text-purple-500" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-lg text-slate-900 dark:text-white", children: userCertificates.length }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 text-xs", children: "Ch\u1EE9ng ch\u1EC9" })] })] }), _jsxs(motion.div, { className: "flex items-center space-x-3", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 dark:from-yellow-900/50 dark:to-yellow-800/50 flex items-center justify-center", children: _jsx(Coins, { className: "w-5 h-5 text-yellow-500" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-lg text-slate-900 dark:text-white", children: totalTokens }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 text-xs", children: "Token" })] })] })] })] }), _jsxs(motion.button, { onClick: () => disconnectWallet(), disabled: isDisconnecting, className: "flex items-center space-x-2 px-6 py-3 rounded-xl border-2 border-red-200 dark:border-red-900 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 font-bold text-sm transition-all disabled:opacity-50", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(LogOut, { className: "w-4 h-4" }), _jsx("span", { children: isDisconnecting ? "Đang đăng xuất..." : "Đăng xuất" })] })] }) }), _jsxs(motion.div, { variants: itemVariants, className: "glass-card dark:glass-card rounded-[2rem] p-8 md:p-10 mb-10", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [_jsx("div", { className: "w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg", children: _jsx(Coins, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-slate-900 dark:text-white", children: "Qu\u1EA3n l\u00FD Token" }), _jsx("p", { className: "text-slate-500 dark:text-slate-400 text-sm", children: "L\u1ECBch s\u1EED nh\u1EADn token t\u1EEB c\u00E1c ho\u1EA1t \u0111\u1ED9ng" })] })] }), _jsxs("div", { className: "mb-8 p-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800", children: [_jsx("p", { className: "text-sm text-yellow-700 dark:text-yellow-300 mb-1", children: "T\u1ED5ng Token" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Coins, { className: "w-8 h-8 text-yellow-500" }), _jsx("span", { className: "text-4xl font-black text-yellow-600 dark:text-yellow-400", children: totalTokens }), _jsx("span", { className: "text-lg text-yellow-600 dark:text-yellow-400 font-medium", children: "Token" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-700", children: [_jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Ng\u00E0y" }), _jsx("th", { className: "text-left py-3 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "Ngu\u1ED3n" }), _jsx("th", { className: "text-right py-3 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: "S\u1ED1 l\u01B0\u1EE3ng" })] }) }), _jsx("tbody", { children: tokenHistory.map((item, index) => {
                                                const Icon = item.icon;
                                                return (_jsxs(motion.tr, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors", children: [_jsx("td", { className: "py-4 px-4", children: _jsxs("div", { className: "flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300", children: [_jsx(Clock, { className: "w-4 h-4 text-slate-400" }), _jsx("span", { children: new Date(item.date).toLocaleDateString("vi-VN") })] }) }), _jsx("td", { className: "py-4 px-4", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center", children: _jsx(Icon, { className: "w-4 h-4 text-slate-600 dark:text-slate-300" }) }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: item.source })] }) }), _jsx("td", { className: "py-4 px-4 text-right", children: _jsxs("span", { className: "inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold text-sm", children: [_jsxs("span", { children: ["+", item.amount] }), _jsx(Coins, { className: "w-3.5 h-3.5" })] }) })] }, index));
                                            }) })] }) }), tokenHistory.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Coins, { className: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" }), _jsx("p", { className: "text-slate-500 dark:text-slate-400", children: "Ch\u01B0a c\u00F3 l\u1ECBch s\u1EED token" })] }))] }), _jsxs(motion.div, { variants: itemVariants, className: "flex items-center space-x-3 mb-8", children: [_jsxs(motion.button, { onClick: () => setActiveTab("courses"), className: `flex items-center space-x-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === "courses"
                                    ? "bg-gradient-to-r from-primary-500 to-neon-purple text-white shadow-3d"
                                    : "glass-light dark:glass-dark text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(GraduationCap, { className: "w-5 h-5" }), _jsx("span", { children: "Kh\u00F3a h\u1ECDc c\u1EE7a t\u00F4i" })] }), _jsxs(motion.button, { onClick: () => setActiveTab("certificates"), className: `flex items-center space-x-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === "certificates"
                                    ? "bg-gradient-to-r from-primary-500 to-neon-purple text-white shadow-3d"
                                    : "glass-light dark:glass-dark text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx(Award, { className: "w-5 h-5" }), _jsx("span", { children: "Ch\u1EE9ng ch\u1EC9 c\u1EE7a t\u00F4i" })] })] }), _jsxs(AnimatePresence, { mode: "wait", children: [activeTab === "courses" && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: userProgress.length > 0 ? (_jsx(motion.div, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", variants: containerVariants, initial: "hidden", animate: "visible", children: userProgress.map((course) => (_jsx(motion.div, { variants: itemVariants, children: _jsx(CourseCard, { course: course }) }, course.courseId))) })) : (_jsx(EmptyState, { icon: _jsx(BookOpen, { className: "w-12 h-12 text-slate-400" }), title: "Ch\u01B0a c\u00F3 kh\u00F3a h\u1ECDc n\u00E0o", description: "B\u1EA1n ch\u01B0a tham gia kh\u00F3a h\u1ECDc n\u00E0o. Kh\u00E1m ph\u00E1 ngay!", actionLabel: "Kh\u00E1m ph\u00E1 kh\u00F3a h\u1ECDc", actionLink: "/courses" })) }, "courses")), activeTab === "certificates" && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: userCertificates.length > 0 ? (_jsx(motion.div, { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", variants: containerVariants, initial: "hidden", animate: "visible", children: userCertificates.map((cert) => (_jsx(motion.div, { variants: itemVariants, children: _jsx(CertificateCard, { certificate: cert }) }, cert.id))) })) : (_jsx(EmptyState, { icon: _jsx(Award, { className: "w-12 h-12 text-slate-400" }), title: "Ch\u01B0a c\u00F3 ch\u1EE9ng ch\u1EC9 n\u00E0o", description: "Ho\u00E0n th\u00E0nh kh\u00F3a h\u1ECDc \u0111\u1EC3 nh\u1EADn ch\u1EE9ng ch\u1EC9 NFT c\u1EE7a b\u1EA1n!", actionLabel: "Xem kh\u00F3a h\u1ECDc", actionLink: "/courses" })) }, "certificates"))] })] })] }));
};
export default Profile;
