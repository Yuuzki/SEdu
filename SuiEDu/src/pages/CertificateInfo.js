import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, CheckCircle, Sparkles, ShieldCheck, Briefcase, BookOpen, Trophy, Zap, ArrowRight, } from "lucide-react";
import { HeroCapybara, AnimatedCapybaraWaving, AnimatedCapybaraStudying, AnimatedCapybaraExam, AnimatedCapybaraGraduate, } from "../components/CapybaraMascot";
const SuiLogo = ({ className = "w-6 h-6" }) => (_jsxs("svg", { viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: className, children: [_jsx("path", { d: "M50 0C50 0 20 35 20 60C20 76.5685 33.4315 90 50 90C66.5685 90 80 76.5685 80 60C80 35 50 0 50 0Z", fill: "currentColor" }), _jsx("path", { d: "M50 15C50 15 30 40 30 60C30 71.0457 38.9543 80 50 80C61.0457 80 70 71.0457 70 60C70 40 50 15 50 15Z", fill: "white", fillOpacity: "0.3" })] }));
// Sparkles Component
const SparklesEffect = ({ active }) => {
    if (!active)
        return null;
    return (_jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [...Array(12)].map((_, i) => (_jsx(motion.div, { className: "absolute w-2 h-2 bg-yellow-300 rounded-full", initial: {
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0,
                scale: 0
            }, animate: {
                y: [null, Math.random() * -100 - 20],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
            }, transition: {
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
            } }, i))) }));
};
// 3D Certificate Preview Component
const CertificatePreview = () => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientY - rect.top - rect.height / 2) / 20;
        const y = -(e.clientX - rect.left - rect.width / 2) / 20;
        setRotation({ x, y });
    };
    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
        setIsHovered(false);
    };
    return (_jsx("div", { className: "relative perspective-[1000px] py-12", children: _jsxs(motion.div, { className: "relative mx-auto w-full max-w-3xl cursor-pointer", style: {
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.1s ease-out",
            }, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onMouseEnter: () => setIsHovered(true), whileHover: { scale: 1.02 }, children: [isHovered && (_jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 rounded-3xl blur-2xl opacity-75 animate-pulse" })), _jsx(SparklesEffect, { active: isHovered }), _jsxs("div", { className: "relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-2 border-cyan-200/50 dark:border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl aspect-[1.6/1]", children: [_jsx("div", { className: "absolute inset-0 opacity-5", children: _jsx(SuiLogo, { className: "w-full h-full text-cyan-600 dark:text-cyan-400 rotate-[-15deg]" }) }), _jsx("div", { className: "absolute inset-6 border-2 border-cyan-100 dark:border-cyan-800 rounded-xl" }), _jsxs("div", { className: "relative z-10 p-8 md:p-12 flex flex-col h-full justify-between", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl", children: _jsx(SuiLogo, { className: "text-white w-10 h-10" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-slate-900 dark:text-white uppercase italic", children: "Sui Academy" }), _jsx("p", { className: "text-[10px] font-mono tracking-widest font-bold text-cyan-600 dark:text-cyan-400", children: "BLOCKCHAIN VERIFIED NFT" })] })] }), _jsx(Award, { className: "text-amber-400 w-12 h-12" })] }), _jsxs("div", { className: "text-center space-y-3", children: [_jsx("p", { className: "text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold", children: "Certificate of Completion" }), _jsx("h1", { className: "text-4xl md:text-6xl text-slate-900 dark:text-white", style: {
                                                fontFamily: '"Playfair Display", "Noto Serif", serif',
                                                fontWeight: 600,
                                                fontStyle: "italic",
                                            }, children: "Your Name Here" }), _jsx("div", { className: "h-px w-48 bg-gradient-to-r from-transparent via-cyan-300 to-transparent mx-auto" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 text-sm font-medium", children: "Has successfully completed" }), _jsx("p", { className: "text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800", children: "Fullstack Web3 & Sui Move Development" })] }), _jsxs("div", { className: "flex justify-between items-end text-xs text-slate-500 dark:text-slate-400", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold", children: "Issue Date" }), _jsx("p", { children: new Date().toLocaleDateString() })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-px bg-slate-300 dark:bg-slate-600 mb-1" }), _jsx("p", { className: "text-[10px]", children: "Instructor Signature" })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "font-bold", children: "Certificate ID" }), _jsxs("p", { className: "font-mono", children: ["NFT-", Math.random().toString(36).substr(2, 6).toUpperCase()] })] })] })] })] })] }) }));
};
const CertificateInfo = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });
    const roadmapProgress = useTransform(scrollYProgress, [0.4, 0.8], [0, 100]);
    const benefits = [
        {
            icon: ShieldCheck,
            title: "Tính xác thực",
            description: "Kiểm tra trực tiếp trên Sui Explorer. Mọi thông tin đều minh bạch và không thể giả mạo.",
            color: "from-emerald-500 to-teal-600",
        },
        {
            icon: Award,
            title: "Sở hữu vĩnh viễn",
            description: "Chứng chỉ NFT nằm trong ví cá nhân của bạn mãi mãi. Không ai có thể thu hồi hoặc xóa bỏ.",
            color: "from-cyan-500 to-blue-600",
        },
        {
            icon: Briefcase,
            title: "Cơ hội nghề nghiệp",
            description: "Dễ dàng chia sẻ lên LinkedIn, Portfolio để gây ấn tượng với nhà tuyển dụng Web3.",
            color: "from-violet-500 to-purple-600",
        },
    ];
    const roadmapSteps = [
        {
            step: 1,
            title: "Đăng ký",
            description: "Tham gia cộng đồng Sui Academy",
            icon: BookOpen,
            mascot: "waving",
        },
        {
            step: 2,
            title: "Học tập",
            description: "Hoàn thành các bài giảng từ chuyên gia",
            icon: Sparkles,
            mascot: "studying",
        },
        {
            step: 3,
            title: "Vượt thử thách",
            description: "Đạt 100% điểm bài Quiz cuối khóa",
            icon: Trophy,
            mascot: "exam",
        },
        {
            step: 4,
            title: "Đúc NFT",
            description: "Nhận chứng chỉ số vào ví cá nhân",
            icon: Zap,
            mascot: "graduate",
        },
    ];
    const getMascotComponent = (type) => {
        switch (type) {
            case "waving":
                return _jsx(AnimatedCapybaraWaving, { className: "w-40 h-40" });
            case "studying":
                return _jsx(AnimatedCapybaraStudying, { className: "w-40 h-40" });
            case "exam":
                return _jsx(AnimatedCapybaraExam, { className: "w-40 h-40" });
            case "graduate":
                return _jsx(AnimatedCapybaraGraduate, { className: "w-40 h-40" });
            default:
                return _jsx(AnimatedCapybaraWaving, { className: "w-40 h-40" });
        }
    };
    return (_jsxs("div", { ref: containerRef, className: "min-h-screen bg-gradient-to-b from-cyan-50/30 via-blue-50/20 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900", style: { fontFamily: 'Quicksand, sans-serif' }, children: [_jsxs("section", { className: "relative pt-24 pb-16 px-4 overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [_jsx(motion.div, { className: "absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-3xl", animate: {
                                    y: [0, 50, 0],
                                    x: [0, 30, 0],
                                }, transition: { duration: 8, repeat: Infinity } }), _jsx(motion.div, { className: "absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl", animate: {
                                    y: [0, -50, 0],
                                    x: [0, -30, 0],
                                }, transition: { duration: 10, repeat: Infinity } })] }), _jsxs("div", { className: "max-w-7xl mx-auto text-center relative z-10", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "mb-8", children: [_jsxs("h1", { className: "text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight", children: ["Ch\u1EE9ng ch\u1EC9 NFT", _jsx("br", {}), "D\u1EA5u \u1EA5n s\u1EF1 nghi\u1EC7p Web3 c\u1EE7a b\u1EA1n"] }), _jsxs("p", { className: "text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed", children: ["S\u1EDF h\u1EEFu m\u1ED9t t\u00E0i s\u1EA3n s\u1ED1 v\u0129nh vi\u1EC5n, minh b\u1EA1ch v\u00E0 c\u00F3 th\u1EC3 x\u00E1c th\u1EF1c tr\u00EAn m\u1EA1ng l\u01B0\u1EDBi", " ", _jsx("span", { className: "font-bold text-cyan-600 dark:text-cyan-400", children: "Sui Network" }), ". Kh\u1EB3ng \u0111\u1ECBnh n\u0103ng l\u1EF1c c\u1EE7a b\u1EA1n v\u1EDBi c\u00F4ng ngh\u1EC7 blockchain ti\u00EAn ti\u1EBFn nh\u1EA5t."] })] }), _jsx("div", { className: "relative inline-block mb-12", children: _jsxs("div", { className: "w-48 h-48 md:w-64 md:h-64 mx-auto relative", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-2xl" }), _jsx(HeroCapybara, { className: "w-full h-full" })] }) })] })] }), _jsx("section", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, className: "text-center mb-12", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4", children: "Xem tr\u01B0\u1EDBc ch\u1EE9ng ch\u1EC9 c\u1EE7a b\u1EA1n" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg", children: "Di chu\u1ED9t \u0111\u1EC3 kh\u00E1m ph\u00E1 hi\u1EC7u \u1EE9ng 3D \u0111\u1ED9c \u0111\u00E1o" })] }), _jsx(CertificatePreview, {})] }) }), _jsx("section", { className: "py-16 px-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4", children: "T\u1EA1i sao ch\u1ECDn ch\u1EE9ng ch\u1EC9 NFT?" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg max-w-3xl mx-auto", children: "Kh\u00E1m ph\u00E1 nh\u1EEFng l\u1EE3i \u00EDch v\u01B0\u1EE3t tr\u1ED9i m\u00E0 c\u00F4ng ngh\u1EC7 blockchain mang l\u1EA1i" })] }), _jsx("div", { className: "grid md:grid-cols-3 gap-8", children: benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.2 }, whileHover: { y: -10, scale: 1.02 }, className: "relative group", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10", style: { background: `linear-gradient(to bottom right, ${benefit.color})` } }), _jsxs("div", { className: "bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-300 h-full", children: [_jsx("div", { className: `w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`, children: _jsx(Icon, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-4", children: benefit.title }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 leading-relaxed", children: benefit.description })] })] }, index));
                            }) })] }) }), _jsx("section", { className: "py-16 px-4", children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, className: "text-center mb-16", children: [_jsx("h2", { className: "text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4", children: "4 B\u01B0\u1EDBc s\u1EDF h\u1EEFu ch\u1EE9ng ch\u1EC9" }), _jsx("p", { className: "text-slate-600 dark:text-slate-300 text-lg", children: "H\u00E0nh tr\u00ECnh \u0111\u01A1n gi\u1EA3n \u0111\u1EC3 tr\u1EDF th\u00E0nh chuy\u00EAn gia Web3" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform -translate-x-1/2 hidden md:block" }), _jsx("div", { className: "space-y-12", children: roadmapSteps.map((step, index) => {
                                        const Icon = step.icon;
                                        const isEven = index % 2 === 0;
                                        return (_jsxs(motion.div, { initial: { opacity: 0, x: isEven ? -50 : 50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: index * 0.2 }, className: `relative flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-col gap-8`, children: [_jsx("div", { className: "flex-1 w-full md:w-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-cyan-200 dark:border-cyan-700 shadow-xl hover:shadow-2xl transition-all duration-300", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg", children: _jsx(Icon, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsxs("div", { className: "text-sm font-bold text-cyan-600 dark:text-cyan-400", children: ["B\u01AF\u1EDAC ", step.step] }), _jsx("h3", { className: "text-2xl font-black text-slate-900 dark:text-white", children: step.title })] })] }), _jsx("p", { className: "text-slate-600 dark:text-slate-300", children: step.description })] }) }), _jsxs("div", { className: "relative hidden md:flex w-16 h-16 items-center justify-center flex-shrink-0", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full animate-pulse" }), _jsx("div", { className: "relative w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center font-bold text-cyan-600 dark:text-cyan-400 text-xl border-4 border-cyan-500", children: step.step })] }), _jsx("div", { className: "flex-1 w-full md:w-auto flex justify-center", children: _jsxs(motion.div, { whileHover: { scale: 1.1 }, className: "relative", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-xl" }), _jsx("div", { className: "relative z-10", children: getMascotComponent(step.mascot) })] }) })] }, index));
                                    }) })] })] }) }), _jsx("section", { className: "py-20 px-4", children: _jsxs(motion.div, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 }, className: "max-w-4xl mx-auto text-center", children: [_jsxs("div", { className: "relative inline-block mb-8", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" }), _jsx("h2", { className: "relative text-4xl md:text-6xl font-black text-slate-900 dark:text-white", children: "S\u1EB5n s\u00E0ng b\u1EAFt \u0111\u1EA7u ch\u01B0a?" })] }), _jsx("p", { className: "text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto", children: "H\u00E3y tham gia c\u00F9ng h\u00E0ng ngh\u00ECn h\u1ECDc vi\u00EAn \u0111\u00E3 nh\u1EADn \u0111\u01B0\u1EE3c ch\u1EE9ng ch\u1EC9 NFT v\u00E0 m\u1EDF ra c\u01A1 h\u1ED9i ngh\u1EC1 nghi\u1EC7p trong l\u0129nh v\u1EF1c Web3" }), _jsx(Link, { to: "/courses", children: _jsxs(motion.button, { whileHover: { scale: 1.05, y: -5 }, whileTap: { scale: 0.95 }, className: "group relative px-12 py-5 text-xl font-black text-white rounded-full overflow-hidden shadow-2xl", style: {
                                    background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4), 0 0 0 0 rgba(6, 182, 212, 0.4)",
                                }, children: [_jsxs("span", { className: "relative z-10 flex items-center gap-3", children: ["B\u1EAFt \u0111\u1EA7u h\u1ECDc ngay \u0111\u1EC3 nh\u1EADn NFT", _jsx(ArrowRight, { className: "w-6 h-6 group-hover:translate-x-2 transition-transform" })] }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600", initial: { x: "-100%" }, whileHover: { x: 0 }, transition: { duration: 0.3 } })] }) }), _jsxs("div", { className: "mt-8 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-500" }), _jsx("span", { children: "Mi\u1EC5n ph\u00ED \u0111\u0103ng k\u00FD" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-500" }), _jsx("span", { children: "Ch\u1EE9ng ch\u1EC9 v\u0129nh vi\u1EC5n" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-500" }), _jsx("span", { children: "H\u1ED7 tr\u1EE3 24/7" })] })] })] }) })] }));
};
export default CertificateInfo;
