import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Award, Bell, CheckCircle2, Clock, CloudUpload, Copy, Cpu, Database, Edit3, ExternalLink, FileVideo, Fingerprint, FolderOpen, Image as ImageIcon, Info, Loader2, Play, Rocket, Search, ShieldCheck, Sparkles, Trash2, Upload, Video, Wallet, Waves, X, } from "lucide-react";
import { useCurrentAccount, useSignAndExecuteTransaction, ConnectButton } from "@mysten/dapp-kit";
import { mintCertificate } from "../blockchain/mintCertificate";
const SuiLogo = ({ className = "w-6 h-6" }) => (_jsxs("svg", { viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: className, children: [_jsx("path", { d: "M50 0C50 0 20 35 20 60C20 76.5685 33.4315 90 50 90C66.5685 90 80 76.5685 80 60C80 35 50 0 50 0Z", fill: "currentColor" }), _jsx("path", { d: "M50 15C50 15 30 40 30 60C30 71.0457 38.9543 80 50 80C61.0457 80 70 71.0457 70 60C70 40 50 15 50 15Z", fill: "white", fillOpacity: "0.3" })] }));
// Certificate Preview Card - giống hệt CertificateCard từ user side
const CertificatePreviewCard = ({ studentName, courseName, date, walletAddress, isSuccess, }) => {
    const evidenceValue = walletAddress || "Chưa kết nối ví (Not connected)";
    return (_jsxs("div", { className: "relative w-full max-w-4xl mx-auto transition-all duration-700", children: [isSuccess && (_jsxs("div", { className: "absolute inset-0 flex items-center justify-center -z-10 pointer-events-none", children: [_jsx("div", { className: "absolute w-[120%] h-[120%] border-2 border-cyan-400/20 rounded-full animate-ping opacity-0", style: { animationDuration: "3s" } }), _jsx("div", { className: "absolute w-[140%] h-[140%] border-2 border-blue-400/10 rounded-full animate-ping opacity-0", style: { animationDuration: "4s", animationDelay: "0.5s" } })] })), _jsx("div", { className: "absolute -top-4 left-1/2 -translate-x-1/2 z-20", children: _jsx("span", { className: `px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm flex items-center space-x-2 ${isSuccess ? "bg-emerald-500 border-emerald-400 text-white shadow-emerald-200" : "bg-white border-slate-200 text-slate-500"}`, children: isSuccess ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-3 h-3" }), " ", _jsx("span", { children: "\u0110\u00E3 x\u00E1c th\u1EF1c tr\u00EAn Sui Network" })] })) : (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "w-3 h-3 text-cyan-500" }), " ", _jsx("span", { children: "B\u1EA3n xem tr\u01B0\u1EDBc tr\u1EF1c ti\u1EBFp" })] })) }) }), _jsx("div", { className: `absolute -inset-2 bg-gradient-to-r ${isSuccess ? "from-emerald-400/30 to-cyan-400/30" : "from-cyan-400/20 via-blue-500/10 to-indigo-500/20"} rounded-[2.5rem] blur-2xl opacity-50` }), _jsxs("div", { className: `relative bg-white border ${isSuccess ? "border-emerald-200 shadow-emerald-100" : "border-slate-200 shadow-slate-200"} rounded-[2rem] overflow-hidden aspect-[1.6/1] shadow-2xl flex flex-col transition-all duration-500`, children: [isSuccess && (_jsx("div", { className: "absolute inset-0 z-30 pointer-events-none overflow-hidden", children: _jsxs("div", { className: "absolute inset-0 flex items-center justify-center", children: [_jsx("div", { className: "absolute h-[200%] w-[150%] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-[-20deg]", style: { animation: "wave-sweep 2s ease-out forwards" } }), _jsx("style", { children: `
                @keyframes wave-sweep {
                  0% { transform: translateX(-150%); }
                  100% { transform: translateX(150%); }
                }
              ` })] }) })), _jsx("div", { className: "absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden", children: _jsx(SuiLogo, { className: `w-[90%] h-[90%] transition-colors duration-1000 ${isSuccess ? "text-emerald-500" : "text-cyan-600"} rotate-[-15deg]` }) }), _jsx("div", { className: `absolute inset-6 border ${isSuccess ? "border-emerald-100" : "border-slate-100"} rounded-[1.5rem] pointer-events-none transition-colors`, children: _jsx("div", { className: "absolute bottom-0 left-0 w-full h-24 opacity-[0.05] pointer-events-none overflow-hidden rounded-b-[1.5rem]", children: _jsx("svg", { viewBox: "0 0 1200 120", preserveAspectRatio: "none", className: "h-full w-full", children: _jsx("path", { d: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z", fill: "currentColor" }) }) }) }), _jsxs("div", { className: "relative z-10 p-12 flex flex-col h-full justify-between", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: `w-16 h-16 bg-gradient-to-br ${isSuccess ? "from-emerald-500 to-cyan-500" : "from-cyan-400 to-blue-600"} rounded-2xl flex items-center justify-center shadow-xl transition-all`, children: _jsx(SuiLogo, { className: "text-white w-10 h-10" }) }), _jsxs("div", { className: "space-y-0.5", children: [_jsx("h2", { className: "text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none", children: "Sui Academy" }), _jsx("p", { className: `text-[10px] font-mono tracking-[0.2em] font-bold uppercase ${isSuccess ? "text-emerald-600" : "text-cyan-600"}`, children: "Blockchain Verified NFT Object" })] })] }), _jsxs("div", { className: "flex flex-col items-end opacity-80", children: [_jsx(Award, { className: `${isSuccess ? "text-emerald-500" : "text-amber-400"} w-14 h-14 drop-shadow-sm mb-1 transition-colors` }), _jsx("span", { className: "text-[10px] font-black text-slate-400 italic tracking-widest", children: "SUI GENESIS" })] })] }), _jsxs("div", { className: "text-center space-y-3", children: [_jsx("p", { className: "text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold", children: "Ch\u1EE9ng nh\u1EADn ho\u00E0n t\u1EA5t ch\u01B0\u01A1ng tr\u00ECnh" }), _jsx("h1", { className: "text-5xl md:text-7xl text-slate-900 min-h-[1.1em] px-4 truncate leading-tight tracking-tight", style: { fontFamily: '"Playfair Display", "Noto Serif", "Times New Roman", serif', fontWeight: 600, fontStyle: "italic" }, children: studentName || "Họ Tên Của Bạn" }), _jsx("div", { className: `h-px w-48 bg-gradient-to-r from-transparent ${isSuccess ? "via-emerald-200" : "via-slate-200"} to-transparent mx-auto` }), _jsx("p", { className: "text-slate-500 text-base font-medium", children: "\u0110\u00E3 \u0111\u1EA1t \u0111\u1EE7 \u0111i\u1EC1u ki\u1EC7n chuy\u00EAn m\u00F4n cho kh\u00F3a \u0111\u00E0o t\u1EA1o" }), _jsx("p", { className: "text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800", children: courseName })] }), _jsxs("div", { className: "flex justify-between items-end border-t border-slate-50 pt-8", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-[9px] text-slate-400 uppercase font-mono font-bold tracking-wider", children: "Ng\u00E0y c\u1EA5p b\u1EB1ng" }), _jsx("p", { className: "text-slate-800 font-bold text-sm", children: date })] }), _jsxs("div", { className: "text-center flex flex-col items-center", children: [_jsx(Waves, { className: `${isSuccess ? "text-emerald-500" : "text-cyan-500"} w-10 h-10 mb-2 opacity-20 transition-colors` }), _jsx("p", { className: "text-[7px] text-slate-400 font-mono tracking-widest uppercase", children: "NODE: SUI-MAIN-01" })] }), _jsxs("div", { className: "space-y-1 text-right max-w-[240px]", children: [_jsx("p", { className: "text-[9px] text-slate-400 uppercase font-mono font-bold tracking-wider", children: "Wallet Address" }), _jsx("div", { className: `text-[10px] font-mono px-3 py-1 rounded-lg truncate ${isSuccess ? "bg-emerald-50 text-emerald-700 font-bold" : "bg-slate-50 text-slate-400"}`, children: evidenceValue })] })] })] })] })] }));
};
const Navbar = ({ adminAddress, onExit, activeSection, onSectionChange, currentAccount }) => {
    return (_jsx("nav", { className: "fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg", children: _jsx(SuiLogo, { className: "text-white w-7 h-7" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-lg font-black text-slate-900 leading-none tracking-tight uppercase italic", children: "Sui Mint Portal" }), _jsx("span", { className: "text-[10px] text-indigo-600 font-bold tracking-widest uppercase italic", children: "Administrator Access" })] })] }), _jsxs("div", { className: "flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200", children: [_jsxs("button", { onClick: () => onSectionChange("mint"), className: `px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeSection === "mint"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"}`, children: [_jsx(Award, { className: "w-4 h-4 inline mr-2" }), "Mint Ch\u1EE9ng ch\u1EC9"] }), _jsxs("button", { onClick: () => onSectionChange("courses"), className: `px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeSection === "courses"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"}`, children: [_jsx(Video, { className: "w-4 h-4 inline mr-2" }), "Qu\u1EA3n l\u00FD b\u00E0i gi\u1EA3ng"] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [currentAccount ? (_jsxs("div", { className: "flex items-center space-x-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200", children: [_jsx("div", { className: "w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center", children: _jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-white" }) }), _jsxs("div", { className: "flex flex-col leading-tight", children: [_jsx("span", { className: "text-[9px] font-black text-indigo-700 uppercase tracking-widest", children: "Authorized Issuer" }), _jsxs("span", { className: "text-[11px] font-mono text-slate-600", children: [currentAccount.address.slice(0, 6), "...", currentAccount.address.slice(-4)] })] })] })) : (_jsx(ConnectButton, {})), onExit && (_jsx("button", { onClick: onExit, className: "px-4 py-2 rounded-full border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition-all active:scale-95", children: "Tho\u00E1t Admin" }))] })] }) }));
};
const NotificationQueue = ({ items, onMarkSeen }) => {
    if (!items.length) {
        return (_jsx("div", { className: "bg-white border border-slate-200 rounded-[1.5rem] p-4 text-xs text-slate-500 font-bold", children: "Ch\u01B0a c\u00F3 th\u00F4ng b\u00E1o m\u1EDBi." }));
    }
    return (_jsx("div", { className: "bg-white border border-slate-200 rounded-[1.5rem] p-4 shadow-sm", children: _jsx("div", { className: "space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2", children: items.map((item) => (_jsxs("div", { className: "flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100", children: [_jsxs("div", { className: "space-y-1 flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "w-3.5 h-3.5 text-indigo-600 flex-shrink-0" }), _jsx("span", { className: "text-[10px] font-black text-slate-500 uppercase tracking-widest truncate", children: item.requestId })] }), _jsx("p", { className: "text-[11px] font-semibold text-slate-800 leading-tight break-words", children: item.message }), _jsx("span", { className: "text-[9px] text-slate-400 font-bold uppercase tracking-wider", children: new Date(item.createdAt).toLocaleString("vi-VN") })] }), _jsx("button", { onClick: () => onMarkSeen?.(item.id), className: `text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all flex-shrink-0 ${item.status === "seen"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}`, children: item.status === "seen" ? "Đã xem" : "Đánh dấu đã xem" })] }, item.id))) }) }));
};
const PayloadPreview = ({ adminPayload }) => (_jsxs("div", { className: "bg-white border border-slate-200 rounded-[1.5rem] p-4 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-emerald-700 text-[11px] font-black uppercase tracking-widest", children: [_jsx(Fingerprint, { className: "w-4 h-4" }), _jsx("span", { children: "Payload admin (admin.txt)" })] }), _jsx("span", { className: "text-[10px] font-bold text-slate-400", children: "Chuy\u1EC3n \u0111\u1ED5i off-chain" })] }), _jsx("pre", { className: "bg-slate-900 text-emerald-300 text-[10px] font-mono p-4 rounded-xl overflow-auto max-h-64 border border-slate-800", children: JSON.stringify(adminPayload, null, 2) })] }));
// Mock course library data
const mockVideoLibrary = [
    {
        id: "v1",
        title: "Giới thiệu về Sui Move",
        description: "Bài học đầu tiên về ngôn ngữ Move trên Sui",
        module: "Module 1: Cơ bản",
        blobId: "blob_a1b2c3d4e5f6g7h8i9j0",
        thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop",
        duration: "12:34",
        uploadedAt: "2024-12-20",
        status: "stored",
    },
    {
        id: "v2",
        title: "Cấu trúc Module trong Move",
        description: "Hiểu về cách tổ chức code trong Move",
        module: "Module 1: Cơ bản",
        blobId: "blob_k1l2m3n4o5p6q7r8s9t0",
        thumbnail: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=300&h=200&fit=crop",
        duration: "18:45",
        uploadedAt: "2024-12-19",
        status: "stored",
    },
    {
        id: "v3",
        title: "Objects và Ownership",
        description: "Mô hình ownership độc đáo của Sui",
        module: "Module 2: Nâng cao",
        blobId: "blob_u1v2w3x4y5z6a7b8c9d0",
        thumbnail: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=300&h=200&fit=crop",
        duration: "22:10",
        uploadedAt: "2024-12-18",
        status: "stored",
    },
];
const moduleOptions = [
    "Module 1: Cơ bản",
    "Module 2: Nâng cao",
    "Module 3: DeFi",
    "Module 4: NFT",
    "Module 5: Gaming",
];
// Walrus Icon Component
const WalrusIcon = ({ className = "w-6 h-6", glowing }) => (_jsxs(motion.div, { className: `relative ${className}`, animate: glowing ? { scale: [1, 1.1, 1] } : {}, transition: { duration: 1, repeat: Infinity }, children: [_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", className: "w-full h-full", children: [_jsx("circle", { cx: "12", cy: "12", r: "10", fill: glowing ? "#10B981" : "#64748B" }), _jsx("ellipse", { cx: "12", cy: "14", rx: "6", ry: "4", fill: "white", fillOpacity: "0.3" }), _jsx("circle", { cx: "9", cy: "10", r: "1.5", fill: "white" }), _jsx("circle", { cx: "15", cy: "10", r: "1.5", fill: "white" }), _jsx("path", { d: "M8 16 Q12 18 16 16", stroke: "white", strokeWidth: "1.5", strokeLinecap: "round", fill: "none" }), _jsx("line", { x1: "6", y1: "14", x2: "3", y2: "15", stroke: "white", strokeWidth: "1", strokeLinecap: "round" }), _jsx("line", { x1: "6", y1: "15", x2: "3", y2: "16", stroke: "white", strokeWidth: "1", strokeLinecap: "round" }), _jsx("line", { x1: "18", y1: "14", x2: "21", y2: "15", stroke: "white", strokeWidth: "1", strokeLinecap: "round" }), _jsx("line", { x1: "18", y1: "15", x2: "21", y2: "16", stroke: "white", strokeWidth: "1", strokeLinecap: "round" })] }), glowing && (_jsx(motion.div, { className: "absolute inset-0 rounded-full bg-emerald-400/30 blur-md", animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 1.5, repeat: Infinity } }))] }));
// Upload Progress Component
const UploadProgress = ({ status, progress }) => {
    const steps = [
        { key: "encoding", label: "Đang mã hóa", icon: Cpu },
        { key: "uploading", label: "Đang tải lên Walrus", icon: CloudUpload },
        { key: "verifying", label: "Đang xác thực", icon: ShieldCheck },
    ];
    const getCurrentStep = () => {
        if (status === "encoding")
            return 0;
        if (status === "uploading")
            return 1;
        if (status === "verifying")
            return 2;
        if (status === "success")
            return 3;
        return -1;
    };
    const currentStep = getCurrentStep();
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-between", children: steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isComplete = index < currentStep;
                    return (_jsxs(React.Fragment, { children: [_jsxs(motion.div, { className: `flex flex-col items-center ${isComplete ? "text-emerald-600" : isActive ? "text-cyan-600" : "text-slate-300"}`, animate: isActive ? { scale: [1, 1.05, 1] } : {}, transition: { duration: 0.5, repeat: isActive ? Infinity : 0 }, children: [_jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${isComplete ? "bg-emerald-100" : isActive ? "bg-cyan-100" : "bg-slate-100"}`, children: isComplete ? (_jsx(CheckCircle2, { className: "w-5 h-5" })) : isActive ? (_jsx(Loader2, { className: "w-5 h-5 animate-spin" })) : (_jsx(Icon, { className: "w-5 h-5" })) }), _jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider", children: step.label })] }), index < steps.length - 1 && (_jsx("div", { className: `flex-1 h-0.5 mx-2 ${index < currentStep ? "bg-emerald-400" : "bg-slate-200"}` }))] }, step.key));
                }) }), status !== "idle" && status !== "success" && (_jsx("div", { className: "w-full bg-slate-200 rounded-full h-2 overflow-hidden", children: _jsx(motion.div, { className: "h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full", initial: { width: 0 }, animate: { width: `${progress}%` }, transition: { duration: 0.3 } }) }))] }));
};
// Video Card Component
const VideoCard = ({ video, onEdit, onCopyBlobId }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(video.blobId);
        setCopied(true);
        onCopyBlobId?.();
        setTimeout(() => setCopied(false), 2000);
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition-all group", children: [_jsxs("div", { className: "relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100", children: [_jsx("img", { src: video.thumbnail, alt: video.title, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: _jsx(Play, { className: "w-8 h-8 text-white" }) }), _jsx("span", { className: "absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded", children: video.duration })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "font-bold text-slate-900 text-sm truncate", children: video.title }), _jsx("p", { className: "text-[10px] text-slate-500 truncate", children: video.description }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx("span", { className: "text-[9px] font-bold text-slate-400 uppercase", children: video.module }), _jsx("span", { className: "w-1 h-1 bg-slate-300 rounded-full" }), _jsx("span", { className: "text-[9px] text-slate-400", children: video.uploadedAt })] })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs(motion.div, { className: "flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full", animate: { scale: [1, 1.02, 1] }, transition: { duration: 2, repeat: Infinity }, children: [_jsx(WalrusIcon, { className: "w-4 h-4", glowing: true }), _jsx("span", { className: "text-[9px] font-bold text-emerald-700 uppercase", children: "Stored on Walrus" })] }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: onEdit, className: "p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors", title: "Ch\u1EC9nh s\u1EEDa", children: _jsx(Edit3, { className: "w-4 h-4" }) }), _jsx("button", { onClick: handleCopy, className: `p-2 rounded-lg transition-colors ${copied ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`, title: "Copy Blob ID", children: copied ? _jsx(CheckCircle2, { className: "w-4 h-4" }) : _jsx(Copy, { className: "w-4 h-4" }) })] })] }));
};
// Toast Notification Component
const Toast = ({ message, type, onClose }) => (_jsxs(motion.div, { initial: { opacity: 0, y: 50, x: "-50%" }, animate: { opacity: 1, y: 0, x: "-50%" }, exit: { opacity: 0, y: 50, x: "-50%" }, className: `fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`, children: [type === "success" ? (_jsx(WalrusIcon, { className: "w-6 h-6", glowing: true })) : (_jsx(X, { className: "w-5 h-5" })), _jsx("span", { className: "font-bold text-sm", children: message }), _jsx("button", { onClick: onClose, className: "ml-2 hover:opacity-70", children: _jsx(X, { className: "w-4 h-4" }) })] }));
// Course Manager Component
const CourseManager = () => {
    const [dragOver, setDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("idle");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [blobId, setBlobId] = useState(null);
    const [videoLibrary, setVideoLibrary] = useState(mockVideoLibrary);
    const [toast, setToast] = useState(null);
    const [copiedBlobId, setCopiedBlobId] = useState(false);
    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [module, setModule] = useState(moduleOptions[0]);
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    // Handle file drop
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("video/")) {
            handleFileSelect(file);
        }
    }, []);
    // Handle file select
    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setVideoPreviewUrl(URL.createObjectURL(file));
        setUploadStatus("idle");
        setBlobId(null);
        setUploadProgress(0);
    };
    // Handle file input change
    const handleFileInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file)
            handleFileSelect(file);
    };
    // Upload via server proxy to avoid exposing API key in client
    const handleUploadToWalrus = async () => {
        if (!selectedFile || !title)
            return;
        setUploadStatus("encoding");
        setUploadProgress(5);
        try {
            // small delay to show encoding state
            await new Promise((r) => setTimeout(r, 700));
            setUploadStatus("uploading");
            const form = new FormData();
            form.append("file", selectedFile);
            form.append("title", title);
            form.append("description", description);
            form.append("module", module);
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "/api/upload-walrus");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const pct = Math.round((e.loaded / e.total) * 90);
                    setUploadProgress(pct);
                }
            };
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const resp = JSON.parse(xhr.responseText || "{}");
                        const returnedBlobId = resp.blobId || resp.id || resp.data?.id || resp.blob_id || resp.blob || resp.cid || null;
                        const returnedUrl = resp.url || resp.videoUrl || resp.data?.url || null;
                        setBlobId(returnedBlobId ?? null);
                        setUploadStatus("success");
                        setUploadProgress(100);
                        const newVideo = {
                            id: `v${Date.now()}`,
                            title,
                            description,
                            module,
                            blobId: returnedBlobId ?? "",
                            thumbnail: videoPreviewUrl || "",
                            duration: "00:00",
                            uploadedAt: new Date().toISOString().split("T")[0],
                            status: "stored",
                        };
                        setVideoLibrary((prev) => [newVideo, ...prev]);
                        setToast({ message: "Video đã được tải lên Walrus!", type: "success" });
                        setTimeout(() => setToast(null), 4000);
                    }
                    catch (err) {
                        setUploadStatus("error");
                        setToast({ message: "Không thể đọc phản hồi server.", type: "error" });
                    }
                }
                else {
                    setUploadStatus("error");
                    setToast({ message: `Upload thất bại (${xhr.status})`, type: "error" });
                }
            };
            xhr.onerror = () => {
                setUploadStatus("error");
                setToast({ message: "Lỗi upload (mạng)", type: "error" });
            };
            xhr.send(form);
        }
        catch (err) {
            setUploadStatus("error");
            setToast({ message: "Upload thất bại", type: "error" });
        }
    };
    // Copy blob ID
    const handleCopyBlobId = () => {
        if (blobId) {
            navigator.clipboard.writeText(blobId);
            setCopiedBlobId(true);
            setTimeout(() => setCopiedBlobId(false), 2000);
        }
    };
    // Reset form
    const handleReset = () => {
        setSelectedFile(null);
        setVideoPreviewUrl(null);
        setUploadStatus("idle");
        setBlobId(null);
        setUploadProgress(0);
        setTitle("");
        setDescription("");
        setModule(moduleOptions[0]);
    };
    return (_jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [_jsx("div", { className: "lg:col-span-5 space-y-6", children: _jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl p-6 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center", children: _jsx(CloudUpload, { className: "w-5 h-5 text-cyan-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-black text-slate-900 uppercase tracking-widest", children: "Walrus Upload Zone" }), _jsx("p", { className: "text-[10px] text-slate-500", children: "T\u1EA3i video l\u00EAn Walrus Storage" })] })] }), _jsxs("div", { onDragOver: (e) => { e.preventDefault(); setDragOver(true); }, onDragLeave: () => setDragOver(false), onDrop: handleDrop, onClick: () => fileInputRef.current?.click(), className: `relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${dragOver
                                ? "border-cyan-500 bg-cyan-50"
                                : selectedFile
                                    ? "border-emerald-400 bg-emerald-50/30"
                                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"}`, children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "video/*", onChange: handleFileInputChange, className: "hidden" }), videoPreviewUrl ? (_jsx("video", { ref: videoRef, src: videoPreviewUrl, className: "w-full h-full object-cover", controls: true })) : (_jsxs("div", { className: "text-center p-6", children: [_jsx(motion.div, { animate: dragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }, transition: { duration: 0.2 }, children: _jsx(CloudUpload, { className: `w-12 h-12 mx-auto mb-4 ${dragOver ? "text-cyan-500" : "text-slate-300"}` }) }), _jsx("p", { className: "text-sm font-bold text-slate-600 mb-1", children: "K\u00E9o th\u1EA3 video v\u00E0o \u0111\u00E2y" }), _jsx("p", { className: "text-[10px] text-slate-400", children: "ho\u1EB7c click \u0111\u1EC3 ch\u1ECDn file" }), _jsx("p", { className: "text-[9px] text-slate-300 mt-2", children: "H\u1ED7 tr\u1EE3: MP4, WebM, MOV (t\u1ED1i \u0111a 500MB)" })] }))] }), selectedFile && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mt-4 p-3 bg-slate-50 rounded-xl flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(FileVideo, { className: "w-5 h-5 text-cyan-600" }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-bold text-slate-700 truncate max-w-[200px]", children: selectedFile.name }), _jsxs("p", { className: "text-[10px] text-slate-400", children: [(selectedFile.size / 1024 / 1024).toFixed(2), " MB"] })] })] }), _jsx("button", { onClick: (e) => { e.stopPropagation(); handleReset(); }, className: "p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600", children: _jsx(Trash2, { className: "w-4 h-4" }) })] })), _jsxs("div", { className: "mt-6 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block", children: "Ti\u00EAu \u0111\u1EC1 b\u00E0i h\u1ECDc *" }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "VD: Gi\u1EDBi thi\u1EC7u v\u1EC1 Sui Move", className: "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block", children: "M\u00F4 t\u1EA3 ng\u1EAFn" }), _jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "M\u00F4 t\u1EA3 n\u1ED9i dung b\u00E0i h\u1ECDc...", rows: 2, className: "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block", children: "Module kh\u00F3a h\u1ECDc" }), _jsx("select", { value: module, onChange: (e) => setModule(e.target.value), className: "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white", children: moduleOptions.map((opt) => (_jsx("option", { value: opt, children: opt }, opt))) })] })] }), uploadStatus !== "idle" && (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mt-6", children: _jsx(UploadProgress, { status: uploadStatus, progress: uploadProgress }) })), blobId && (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(WalrusIcon, { className: "w-5 h-5", glowing: true }), _jsx("span", { className: "text-[10px] font-bold text-emerald-700 uppercase tracking-wider", children: "Walrus Blob ID" })] }), _jsxs("button", { onClick: handleCopyBlobId, className: `flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${copiedBlobId
                                                ? "bg-emerald-600 text-white"
                                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}`, children: [copiedBlobId ? _jsx(CheckCircle2, { className: "w-3 h-3" }) : _jsx(Copy, { className: "w-3 h-3" }), _jsx("span", { children: copiedBlobId ? "Đã copy" : "Copy" })] })] }), _jsx("input", { type: "text", value: blobId, readOnly: true, className: "w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg text-xs font-mono text-slate-600" })] })), _jsx("button", { onClick: handleUploadToWalrus, disabled: !selectedFile || !title || uploadStatus === "encoding" || uploadStatus === "uploading" || uploadStatus === "verifying", className: `mt-6 w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${uploadStatus === "success"
                                ? "bg-emerald-500 text-white"
                                : !selectedFile || !title
                                    ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                                    : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-200"}`, children: uploadStatus === "encoding" || uploadStatus === "uploading" || uploadStatus === "verifying" ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin" }), _jsx("span", { children: "\u0110ang x\u1EED l\u00FD..." })] })) : uploadStatus === "success" ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-5 h-5" }), _jsx("span", { children: "\u0110\u00E3 l\u01B0u l\u00EAn Walrus" })] })) : (_jsxs(_Fragment, { children: [_jsx(Rocket, { className: "w-5 h-5" }), _jsx("span", { children: "L\u01B0u l\u00EAn Chain" })] })) }), uploadStatus === "success" && (_jsx("button", { onClick: handleReset, className: "mt-3 w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50", children: "T\u1EA3i video m\u1EDBi" }))] }) }), _jsx("div", { className: "lg:col-span-7", children: _jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl p-6 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center", children: _jsx(FolderOpen, { className: "w-5 h-5 text-indigo-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-black text-slate-900 uppercase tracking-widest", children: "Course Library" }), _jsxs("p", { className: "text-[10px] text-slate-500", children: [videoLibrary.length, " video \u0111\u00E3 upload"] })] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }), _jsx("input", { type: "text", placeholder: "T\u00ECm ki\u1EBFm...", className: "pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 w-48" })] })] }), _jsx("div", { className: "space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar", children: _jsx(AnimatePresence, { children: videoLibrary.map((video) => (_jsx(VideoCard, { video: video, onEdit: () => console.log("Edit", video.id), onCopyBlobId: () => setToast({ message: "Blob ID đã được copy!", type: "success" }) }, video.id))) }) }), videoLibrary.length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Video, { className: "w-12 h-12 text-slate-300 mx-auto mb-4" }), _jsx("p", { className: "text-slate-500 font-bold", children: "Ch\u01B0a c\u00F3 video n\u00E0o" }), _jsx("p", { className: "text-[10px] text-slate-400 mt-1", children: "Upload video \u0111\u1EA7u ti\u00EAn \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u" })] }))] }) }), _jsx(AnimatePresence, { children: toast && (_jsx(Toast, { message: toast.message, type: toast.type, onClose: () => setToast(null) })) })] }));
};
const AdminView = ({ onExit, certificateImage, requests = [], notifications = [], onMarkNotificationSeen }) => {
    const currentAccount = useCurrentAccount();
    const { mutate: signAndExecuteTransactionBlock, isPending: isSigning } = useSignAndExecuteTransaction();
    const [selectedRequest, setSelectedRequest] = useState(requests[0] ?? null);
    const [activeTab, setActiveTab] = useState("metadata");
    const [isMinting, setIsMinting] = useState(false);
    const [mintStatus, setMintStatus] = useState({ success: false, tx: "" });
    const [uploadedImage, setUploadedImage] = useState(null);
    const [activeSection, setActiveSection] = useState("mint");
    useEffect(() => {
        if (requests.length && requests[0].requestId !== selectedRequest?.requestId) {
            setSelectedRequest(requests[0]);
            setMintStatus({ success: false, tx: "", objectId: undefined });
        }
    }, [requests]);
    const handleMint = async () => {
        if (!selectedRequest || !currentAccount) {
            alert("Vui lòng kết nối ví Admin để ký transaction");
            return;
        }
        if (!signAndExecuteTransactionBlock) {
            alert("Wallet chưa sẵn sàng. Vui lòng thử lại.");
            return;
        }
        setIsMinting(true);
        try {
            console.log("Đang tạo transaction mint certificate cho Admin...");
            // Lấy thông tin từ request
            const certificateId = selectedRequest.requestId;
            const studentName = selectedRequest.studentName;
            const courseName = selectedRequest.courseName;
            // Xử lý imageUrl: Nếu là Base64 data URL (quá dài), thay bằng URL ngắn hoặc hash
            let imageUrl;
            const preview = selectedRequest.certificatePreview ||
                selectedRequest.adminPayload?.certificate_preview?.preview_url ||
                selectedRequest.userPayload?.certificate_preview?.preview_url;
            if (preview && preview.startsWith('data:image/')) {
                // Base64 data URL quá dài, không thể đưa vào transaction
                // Thay bằng URL pattern hoặc hash từ requestId
                imageUrl = `https://certificates.suiedu.com/${certificateId}.png`;
                console.warn("Base64 image detected, using placeholder URL instead. Image should be uploaded to IPFS/storage service.");
            }
            else if (preview && preview.startsWith('placeholder:')) {
                // Nếu là placeholder, dùng URL pattern
                imageUrl = `https://certificates.suiedu.com/${certificateId}.png`;
            }
            else {
                imageUrl = preview || "https://assets.suiedu.com/certificate-placeholder.png";
            }
            // Parse issueDate từ request hoặc dùng thời gian hiện tại
            let issueDate;
            if (selectedRequest.completionDate) {
                issueDate = new Date(selectedRequest.completionDate).getTime();
            }
            else if (selectedRequest.userPayload?.completion?.completed_at) {
                issueDate = new Date(selectedRequest.userPayload.completion.completed_at).getTime();
            }
            else {
                issueDate = Date.now();
            }
            // Gọi hàm mintCertificate với transaction signing
            // Popup transaction request sẽ tự động hiển thị từ wallet
            const result = await mintCertificate({
                signAndExecuteTransactionBlock,
                recipientWallet: selectedRequest.wallet,
                certificateId: certificateId,
                title: `Certificate: ${courseName}`,
                description: `Chứng chỉ hoàn thành khóa học cấp cho ${studentName}`,
                imageUrl: imageUrl,
                issueDate: issueDate,
            });
            console.log("Kết quả mint từ Admin:", result);
            const txHash = result.transactionDigest || "Giao dịch thành công";
            const objectId = result.objectId;
            setMintStatus({
                success: true,
                tx: txHash,
                objectId: objectId,
            });
            // Cập nhật request với objectId và txHash để tracking
            if (selectedRequest && objectId) {
                // Có thể lưu vào localStorage hoặc gửi lên backend
                console.log("Certificate Object ID:", objectId);
                console.log("Transaction Hash:", txHash);
                console.log("Request ID:", selectedRequest.requestId);
            }
            const successMessage = objectId
                ? `Mint thành công!\nTransaction: ${txHash}\nObject ID: ${objectId}`
                : `Mint thành công!\nTransaction: ${txHash}`;
            alert(successMessage);
        }
        catch (err) {
            console.error("Lỗi khi mint từ Admin:", err);
            // Xử lý các loại lỗi khác nhau
            let errorMessage = "Có lỗi xảy ra khi tạo transaction";
            if (err.message) {
                if (err.message.includes("reject") || err.message.includes("hủy") || err.message.includes("denied")) {
                    errorMessage = "Transaction đã bị hủy bởi người dùng trong ví Slush";
                }
                else if (err.message.includes("undefined")) {
                    errorMessage = "Transaction không nhận được phản hồi từ ví. Vui lòng thử lại hoặc kiểm tra kết nối ví.";
                }
                else {
                    errorMessage = err.message;
                }
            }
            alert("Mint thất bại: " + errorMessage);
            setMintStatus({
                success: false,
                tx: "",
                objectId: undefined,
            });
        }
        finally {
            setIsMinting(false);
        }
    };
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file)
            setUploadedImage(URL.createObjectURL(file));
    };
    const effectivePreviewUrl = selectedRequest?.adminPayload.certificate_preview?.preview_url ||
        selectedRequest?.certificatePreview ||
        certificateImage ||
        null;
    const adminPayloadWithPreview = selectedRequest
        ? {
            ...selectedRequest.adminPayload,
            certificate_preview: {
                preview_url: effectivePreviewUrl,
                preview_hash: selectedRequest.adminPayload.certificate_preview?.preview_hash || selectedRequest.userPayload?.certificate_preview?.preview_hash || "",
            },
        }
        : null;
    return (_jsxs("div", { className: "min-h-screen bg-[#f1f5f9] text-slate-800 font-sans antialiased overflow-x-hidden", children: [_jsx(Navbar, { adminAddress: currentAccount?.address || "0x8e2b...4f91", onExit: onExit, activeSection: activeSection, onSectionChange: setActiveSection, currentAccount: currentAccount }), _jsx("main", { className: "pt-24 pb-20 px-6 max-w-7xl mx-auto", children: _jsx(AnimatePresence, { mode: "wait", children: activeSection === "courses" ? (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 }, children: _jsx(CourseManager, {}) }, "courses")) : (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, transition: { duration: 0.3 }, children: _jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [_jsxs("div", { className: "lg:col-span-4 space-y-6", children: [_jsxs("div", { className: "bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h3", { className: "text-sm font-black text-slate-900 uppercase tracking-widest flex items-center", children: [_jsx(Bell, { className: "w-4 h-4 mr-2 text-indigo-600" }), "Y\u00EAu c\u1EA7u ph\u00EA duy\u1EC7t"] }), _jsx("div", { className: "px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded-full", children: "M\u1EDAI" })] }), _jsx("div", { className: "space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2", children: requests.map((req) => (_jsxs("button", { onClick: () => {
                                                            setSelectedRequest(req);
                                                            setMintStatus({ success: false, tx: "", objectId: undefined });
                                                        }, className: `w-full text-left p-4 rounded-2xl border-2 transition-all ${selectedRequest?.requestId === req.requestId ? "border-indigo-600 bg-indigo-50/30 shadow-md" : "border-slate-50 bg-slate-50 hover:border-slate-200"}`, children: [_jsxs("div", { className: "flex justify-between items-start mb-1", children: [_jsx("span", { className: "text-[9px] font-black text-slate-400 uppercase", children: req.requestId }), _jsx(Clock, { className: "w-3 h-3 text-slate-300" })] }), _jsx("p", { className: "font-black text-slate-900 truncate text-sm", children: req.studentName }), _jsxs("div", { className: "flex items-center justify-between mt-2", children: [_jsx("span", { className: "text-[10px] font-bold text-slate-500 uppercase tracking-tighter truncate", children: req.courseName }), _jsx(ArrowRight, { className: "w-3 h-3 text-indigo-600" })] })] }, req.requestId))) })] }), _jsxs("div", { className: "bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group", children: [_jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10", children: _jsx(Cpu, { size: 80 }) }), _jsxs("div", { className: "relative z-10", children: [_jsx("h4", { className: "text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-4", children: "H\u1EC7 th\u1ED1ng Ph\u00E1t h\u00E0nh" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-xs font-bold border-b border-white/5 pb-2", children: [_jsx("span", { className: "opacity-50 uppercase tracking-tighter", children: "M\u1EA1ng l\u01B0\u1EDBi" }), _jsx("span", { className: "text-emerald-400", children: "SUI TESTNET" })] }), _jsxs("div", { className: "flex justify-between text-xs font-bold border-b border-white/5 pb-2", children: [_jsx("span", { className: "opacity-50 uppercase tracking-tighter", children: "Quy\u1EC1n h\u1EA1n" }), _jsx("span", { className: "text-indigo-400", children: "MINTER_ADMIN" })] }), _jsxs("div", { className: "pt-2 flex items-center justify-between", children: [_jsx("span", { className: "text-[9px] font-bold opacity-40 uppercase tracking-widest", children: "Node Status" }), _jsxs("div", { className: "flex space-x-1", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-[9px] text-emerald-500 font-black", children: "ONLINE" })] })] })] })] })] }), _jsxs("div", { className: "bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("h3", { className: "text-sm font-black text-slate-900 uppercase tracking-widest flex items-center", children: [_jsx(Bell, { className: "w-4 h-4 mr-2 text-indigo-600" }), "Th\u00F4ng b\u00E1o queue"] }), _jsx("div", { className: "px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-black rounded-full", children: notifications.length })] }), _jsx(NotificationQueue, { items: notifications, onMarkSeen: onMarkNotificationSeen })] })] }), _jsx("div", { className: "lg:col-span-8 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2", children: selectedRequest ? (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white p-1.5 rounded-2xl border border-slate-200 flex shadow-sm", children: [_jsxs("button", { onClick: () => setActiveTab("metadata"), className: `flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "metadata" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`, children: [_jsx(Database, { size: 16 }), _jsx("span", { children: "Mint Metadata Chu\u1EA9n" })] }), _jsxs("button", { onClick: () => setActiveTab("image"), className: `flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "image" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`, children: [_jsx(ImageIcon, { size: 16 }), _jsx("span", { children: "Chuy\u1EC3n \u1EA2nh th\u00E0nh NFT" })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col", children: [_jsxs("div", { className: "flex justify-between items-start mb-6", children: [_jsx("div", { className: "w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center", children: _jsx(SuiLogo, { className: "text-slate-900 w-6 h-6" }) }), _jsx(Award, { className: "text-indigo-500 w-10 h-10" })] }), _jsxs("div", { className: "text-center space-y-4 mb-8 flex-1 flex flex-col justify-center", children: [_jsx("p", { className: "text-[9px] font-black text-slate-400 uppercase tracking-widest", children: "B\u1EA3n xem tr\u01B0\u1EDBc ch\u1EE9ng ch\u1EC9" }), _jsx(CertificatePreviewCard, { studentName: selectedRequest.studentName, courseName: selectedRequest.courseName, date: selectedRequest.completionDate ? new Date(selectedRequest.completionDate).toLocaleDateString("vi-VN", {
                                                                            day: "2-digit",
                                                                            month: "long",
                                                                            year: "numeric",
                                                                        }) : new Date().toLocaleDateString("vi-VN", {
                                                                            day: "2-digit",
                                                                            month: "long",
                                                                            year: "numeric",
                                                                        }), walletAddress: selectedRequest.wallet, isSuccess: false })] }), _jsxs("div", { className: "mt-6 space-y-2 pt-4 border-t border-slate-50", children: [_jsxs("div", { className: "flex justify-between text-[9px] font-bold", children: [_jsx("span", { className: "text-slate-400 uppercase tracking-tighter", children: "V\u00ED sinh vi\u00EAn" }), _jsx("span", { className: "text-slate-900 font-mono truncate max-w-[120px]", children: selectedRequest.wallet })] }), _jsxs("div", { className: "flex justify-between text-[9px] font-bold", children: [_jsx("span", { className: "text-slate-400 uppercase tracking-tighter", children: "Ng\u00E0y ho\u00E0n th\u00E0nh" }), _jsx("span", { className: "text-slate-900", children: selectedRequest.completionDate })] })] })] }), activeTab === "metadata" ? (_jsxs("div", { className: "bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col", children: [_jsxs("h3", { className: "text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center", children: [_jsx(Fingerprint, { className: "w-4 h-4 mr-2 text-indigo-600" }), "\u0110\u00FAc D\u1EEF li\u1EC7u Blockchain"] }), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsx("div", { className: "p-4 bg-slate-50 rounded-2xl border border-slate-100", children: _jsx("p", { className: "text-[9px] text-slate-500 font-bold leading-relaxed italic", children: "Payload g\u1EEDi admin (admin.txt) s\u1EBD \u0111\u01B0\u1EE3c d\u00F9ng cho b\u01B0\u1EDBc \u0111\u00FAc, kh\u00F4ng hi\u1EC3n th\u1ECB metadata m\u1EABu." }) }), adminPayloadWithPreview && _jsx(PayloadPreview, { adminPayload: adminPayloadWithPreview })] }), _jsx("button", { onClick: handleMint, disabled: isMinting || isSigning || mintStatus.success || !currentAccount, className: `mt-6 w-full flex items-center justify-center space-x-3 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 ${mintStatus.success
                                                                    ? "bg-emerald-500 text-white"
                                                                    : !currentAccount
                                                                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                                                                        : "bg-slate-900 text-white hover:bg-black shadow-slate-200"}`, children: isMinting || isSigning ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "animate-spin size-4" }), _jsx("span", { children: isSigning ? "Đang chờ ký transaction trong ví..." : "Đang xử lý..." })] })) : mintStatus.success ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { size: 16 }), " ", _jsx("span", { children: "\u0110\u00E3 \u0111\u00FAc xong" })] })) : !currentAccount ? (_jsxs(_Fragment, { children: [_jsx(Wallet, { className: "size-4" }), " ", _jsx("span", { children: "Vui l\u00F2ng k\u1EBFt n\u1ED1i v\u00ED Slush" })] })) : (_jsxs(_Fragment, { children: [_jsx(Rocket, { size: 16 }), " ", _jsx("span", { children: "X\u00E1c nh\u1EADn & Mint NFT" })] })) })] })) : (_jsxs("div", { className: "bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col", children: [_jsxs("h3", { className: "text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center", children: [_jsx(ImageIcon, { className: "w-4 h-4 mr-2 text-indigo-600" }), "\u0110\u00FAc NFT t\u1EEB H\u00ECnh \u1EA3nh"] }), _jsxs("div", { className: "flex-1 space-y-6", children: [_jsxs("div", { className: `relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${uploadedImage ? "border-indigo-400 bg-white" : "border-slate-200 bg-slate-50"}`, children: [uploadedImage ? (_jsx("img", { src: uploadedImage, className: "w-full h-full object-cover", alt: "NFT Preview" })) : (_jsxs("div", { className: "text-center p-6", children: [_jsx(Upload, { className: "w-8 h-8 text-slate-300 mx-auto mb-3" }), _jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase", children: "T\u1EA3i l\u00EAn thi\u1EBFt k\u1EBF ch\u1EE9ng ch\u1EC9" }), _jsx("input", { type: "file", onChange: handleImageUpload, className: "absolute inset-0 opacity-0 cursor-pointer" })] })), uploadedImage && (_jsx("button", { onClick: () => setUploadedImage(null), className: "absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-[8px] uppercase font-bold backdrop-blur-sm", children: "Thay \u0111\u1ED5i" }))] }), _jsx("div", { className: "p-4 bg-indigo-50 border border-indigo-100 rounded-2xl", children: _jsxs("div", { className: "flex items-start space-x-2 text-indigo-700", children: [_jsx(Info, { size: 14, className: "mt-0.5 flex-shrink-0" }), _jsx("p", { className: "text-[9px] leading-relaxed font-bold", children: "H\u00ECnh \u1EA3nh s\u1EBD \u0111\u01B0\u1EE3c \u0111\u00FAc th\u00E0nh NFT h\u00ECnh \u1EA3nh thu\u1EA7n t\u00FAy, \u0111\u1ECBnh danh qua t\u00EAn h\u1ECDc vi\u00EAn v\u00E0 m\u00E3 kh\u00F3a h\u1ECDc." })] }) })] }), _jsxs("button", { disabled: !uploadedImage || isMinting, className: `mt-6 w-full flex items-center justify-center space-x-3 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 ${!uploadedImage ? "bg-slate-100 text-slate-300" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"}`, children: [_jsx(Rocket, { size: 16 }), _jsx("span", { children: "\u0110\u00FAc NFT H\u00ECnh \u1EA3nh" })] })] }))] }), mintStatus.success && (_jsx("div", { className: "bg-white border-2 border-emerald-100 rounded-3xl p-6 shadow-2xl shadow-emerald-100/50 animate-in slide-in-from-bottom duration-500", children: _jsxs("div", { className: "flex flex-col gap-6", children: [_jsxs("div", { className: "flex items-center space-x-2 text-emerald-600", children: [_jsx(CheckCircle2, { size: 20 }), _jsx("span", { className: "text-base font-black uppercase tracking-tight", children: "Giao d\u1ECBch th\u00E0nh c\u00F4ng!" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("span", { className: "text-[10px] font-black text-slate-400 uppercase tracking-widest", children: "Transaction Hash" }), _jsxs("div", { className: "flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-100", children: [_jsx("p", { className: "text-[11px] font-mono font-bold text-slate-600 break-all flex-1", children: mintStatus.tx }), _jsxs("div", { className: "flex items-center space-x-1 ml-2", children: [_jsx("button", { onClick: () => {
                                                                                                const txHash = mintStatus.tx;
                                                                                                // Sử dụng Sui Explorer chính thức cho testnet
                                                                                                const explorerUrl = `https://suiexplorer.com/txblock/${txHash}?network=testnet`;
                                                                                                window.open(explorerUrl, '_blank');
                                                                                            }, className: "hover:opacity-70 transition-opacity p-1", title: "Xem transaction tr\u00EAn Sui Explorer (Testnet)", children: _jsx(ExternalLink, { className: "w-4 h-4 text-indigo-500 cursor-pointer" }) }), _jsx("button", { onClick: () => {
                                                                                                navigator.clipboard.writeText(mintStatus.tx);
                                                                                                alert('Đã copy Transaction Hash!');
                                                                                            }, className: "hover:opacity-70 transition-opacity p-1", title: "Copy Transaction Hash", children: _jsx(Copy, { className: "w-4 h-4 text-indigo-500 cursor-pointer" }) })] })] })] }), mintStatus.objectId ? (_jsxs("div", { className: "space-y-2", children: [_jsx("span", { className: "text-[10px] font-black text-emerald-600 uppercase tracking-widest", children: "Certificate Object ID" }), _jsxs("div", { className: "flex items-center space-x-2 bg-emerald-50 p-3 rounded-xl border border-emerald-100", children: [_jsx("p", { className: "text-[11px] font-mono font-bold text-emerald-700 break-all flex-1", children: mintStatus.objectId }), _jsxs("div", { className: "flex items-center space-x-1 ml-2", children: [_jsx("button", { onClick: () => {
                                                                                                // Sử dụng Sui Explorer chính thức cho testnet
                                                                                                const explorerUrl = `https://suiexplorer.com/object/${mintStatus.objectId}?network=testnet`;
                                                                                                window.open(explorerUrl, '_blank');
                                                                                            }, className: "hover:opacity-70 transition-opacity p-1", title: "Xem object tr\u00EAn Sui Explorer (Testnet)", children: _jsx(ExternalLink, { className: "w-4 h-4 text-emerald-600 cursor-pointer" }) }), _jsx("button", { onClick: () => {
                                                                                                navigator.clipboard.writeText(mintStatus.objectId || '');
                                                                                                alert('Đã copy Object ID!');
                                                                                            }, className: "hover:opacity-70 transition-opacity p-1", title: "Copy Object ID", children: _jsx(Copy, { className: "w-4 h-4 text-emerald-600 cursor-pointer" }) })] })] }), _jsx("p", { className: "text-[9px] text-slate-400 italic", children: "Object ID n\u00E0y c\u00F3 th\u1EC3 d\u00F9ng \u0111\u1EC3 truy v\u1EBFt certificate tr\u00EAn blockchain" })] })) : (_jsx("div", { className: "bg-amber-50 border border-amber-200 rounded-xl p-3", children: _jsx("p", { className: "text-[9px] text-amber-700 font-semibold", children: "\u26A0\uFE0F Kh\u00F4ng t\u00ECm th\u1EA5y Object ID. Vui l\u00F2ng ki\u1EC3m tra console \u0111\u1EC3 xem chi ti\u1EBFt transaction response." }) }))] }), _jsx("div", { className: "flex gap-2 pt-2 border-t border-slate-100", children: _jsxs("button", { onClick: () => {
                                                                    // Sử dụng Sui Explorer chính thức cho testnet
                                                                    const explorerUrl = `https://suiexplorer.com/txblock/${mintStatus.tx}?network=testnet`;
                                                                    window.open(explorerUrl, '_blank');
                                                                }, className: "bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-md hover:bg-black transition-all flex-1 justify-center", title: "Xem tr\u00EAn Sui Explorer (Testnet)", children: [_jsx(Search, { size: 14 }), " ", _jsx("span", { children: "Xem tr\u00EAn Explorer" })] }) })] }) }))] })) : (_jsxs("div", { className: "h-full min-h-[500px] flex flex-col items-center justify-center text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-10 opacity-60", children: [_jsx("div", { className: "w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6", children: _jsx(Database, { className: "w-10 h-10 text-slate-300" }) }), _jsx("h2", { className: "text-xl font-black text-slate-400 uppercase italic", children: "Ch\u1EDD ph\u00EA duy\u1EC7t h\u1ED3 s\u01A1" }), _jsx("p", { className: "text-slate-400 text-sm max-w-xs mt-2", children: "Vui l\u00F2ng ch\u1ECDn m\u1ED9t y\u00EAu c\u1EA7u t\u1EEB danh s\u00E1ch b\u00EAn tr\u00E1i \u0111\u1EC3 th\u1EF1c hi\u1EC7n ki\u1EC3m tra v\u00E0 \u0111\u00FAc ch\u1EE9ng ch\u1EC9 NFT." })] })) })] }) }, "mint")) }) }), _jsx("footer", { className: "bg-white border-t border-slate-200 py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-widest gap-6", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm", children: _jsx(SuiLogo, { className: "text-slate-300 w-6 h-6" }) }), _jsx("p", { children: "\u00A9 2024 SUI ACADEMY - ISSUANCE PORTAL. VERSION 1.1-MANUAL." })] }), _jsxs("div", { className: "flex space-x-12 opacity-50 italic font-bold", children: [_jsxs("span", { className: "flex items-center", children: [_jsx("div", { className: "w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" }), " NETWORK: SUI TESTNET"] }), _jsx("span", { children: "SYSTEM: MANUAL CONTROL" })] })] }) }), _jsx("style", { children: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      ` })] }));
};
export default AdminView;
