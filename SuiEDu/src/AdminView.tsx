import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bell,
  CheckCircle2,
  Clock,
  CloudUpload,
  Copy,
  Cpu,
  Database,
  Edit3,
  ExternalLink,
  FileVideo,
  Fingerprint,
  FolderOpen,
  Image as ImageIcon,
  Info,
  Loader2,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Video,
  Wallet,
  Waves,
  X,
} from "lucide-react";
import { useCurrentAccount, useSignAndExecuteTransaction, ConnectButton } from "@mysten/dapp-kit";
import { mintCertificate } from "../blockchain/mintCertificate";

export type UserPayload = {
  request_id: string;
  user_wallet: string;
  course: { course_id: string; course_name: string };
  display_name: string;
  completion: { completed: boolean; completed_at: string };
  certificate_preview: { preview_url: string | null; preview_hash: string };
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
};

export type AdminPayload = {
  request_id: string;
  recipient_wallet: string;
  course: { course_id: string; course_name: string };
  completion_status: { verified: boolean; completed_at: string };
  certificate_preview: { preview_url: string | null; preview_hash: string };
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

const SuiLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 0C50 0 20 35 20 60C20 76.5685 33.4315 90 50 90C66.5685 90 80 76.5685 80 60C80 35 50 0 50 0Z" fill="currentColor" />
    <path
      d="M50 15C50 15 30 40 30 60C30 71.0457 38.9543 80 50 80C61.0457 80 70 71.0457 70 60C70 40 50 15 50 15Z"
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);

// Certificate Preview Card - giống hệt CertificateCard từ user side
const CertificatePreviewCard: React.FC<{ 
  studentName: string; 
  courseName: string; 
  date: string; 
  walletAddress?: string | null; 
  isSuccess: boolean;
}> = ({
  studentName,
  courseName,
  date,
  walletAddress,
  isSuccess,
}) => {
  const evidenceValue = walletAddress || "Chưa kết nối ví (Not connected)";

  return (
    <div className="relative w-full max-w-4xl mx-auto transition-all duration-700">
      {isSuccess && (
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
          <div className="absolute w-[120%] h-[120%] border-2 border-cyan-400/20 rounded-full animate-ping opacity-0" style={{ animationDuration: "3s" }} />
          <div
            className="absolute w-[140%] h-[140%] border-2 border-blue-400/10 rounded-full animate-ping opacity-0"
            style={{ animationDuration: "4s", animationDelay: "0.5s" }}
          />
        </div>
      )}

      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <span
          className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm flex items-center space-x-2 ${
            isSuccess ? "bg-emerald-500 border-emerald-400 text-white shadow-emerald-200" : "bg-white border-slate-200 text-slate-500"
          }`}
        >
          {isSuccess ? (
            <>
              <CheckCircle2 className="w-3 h-3" /> <span>Đã xác thực trên Sui Network</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-cyan-500" /> <span>Bản xem trước trực tiếp</span>
            </>
          )}
        </span>
      </div>

      <div className={`absolute -inset-2 bg-gradient-to-r ${isSuccess ? "from-emerald-400/30 to-cyan-400/30" : "from-cyan-400/20 via-blue-500/10 to-indigo-500/20"} rounded-[2.5rem] blur-2xl opacity-50`} />

      <div className={`relative bg-white border ${isSuccess ? "border-emerald-200 shadow-emerald-100" : "border-slate-200 shadow-slate-200"} rounded-[2rem] overflow-hidden aspect-[1.6/1] shadow-2xl flex flex-col transition-all duration-500`}>
        {isSuccess && (
          <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute h-[200%] w-[150%] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-[-20deg]" style={{ animation: "wave-sweep 2s ease-out forwards" }} />
              <style>{`
                @keyframes wave-sweep {
                  0% { transform: translateX(-150%); }
                  100% { transform: translateX(150%); }
                }
              `}</style>
            </div>
          </div>
        )}

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
          <SuiLogo className={`w-[90%] h-[90%] transition-colors duration-1000 ${isSuccess ? "text-emerald-500" : "text-cyan-600"} rotate-[-15deg]`} />
        </div>

        <div className={`absolute inset-6 border ${isSuccess ? "border-emerald-100" : "border-slate-100"} rounded-[1.5rem] pointer-events-none transition-colors`}>
          <div className="absolute bottom-0 left-0 w-full h-24 opacity-[0.05] pointer-events-none overflow-hidden rounded-b-[1.5rem]">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        <div className="relative z-10 p-12 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${isSuccess ? "from-emerald-500 to-cyan-500" : "from-cyan-400 to-blue-600"} rounded-2xl flex items-center justify-center shadow-xl transition-all`}>
                <SuiLogo className="text-white w-10 h-10" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic leading-none">Sui Academy</h2>
                <p className={`text-[10px] font-mono tracking-[0.2em] font-bold uppercase ${isSuccess ? "text-emerald-600" : "text-cyan-600"}`}>
                  Blockchain Verified NFT Object
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end opacity-80">
              <Award className={`${isSuccess ? "text-emerald-500" : "text-amber-400"} w-14 h-14 drop-shadow-sm mb-1 transition-colors`} />
              <span className="text-[10px] font-black text-slate-400 italic tracking-widest">SUI GENESIS</span>
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold">Chứng nhận hoàn tất chương trình</p>
            <h1
              className="text-5xl md:text-7xl text-slate-900 min-h-[1.1em] px-4 truncate leading-tight tracking-tight"
              style={{ fontFamily: '"Playfair Display", "Noto Serif", "Times New Roman", serif', fontWeight: 600, fontStyle: "italic" }}
            >
              {studentName || "Họ Tên Của Bạn"}
            </h1>
            <div className={`h-px w-48 bg-gradient-to-r from-transparent ${isSuccess ? "via-emerald-200" : "via-slate-200"} to-transparent mx-auto`} />
            <p className="text-slate-500 text-base font-medium">Đã đạt đủ điều kiện chuyên môn cho khóa đào tạo</p>
            <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800">{courseName}</p>
          </div>

          <div className="flex justify-between items-end border-t border-slate-50 pt-8">
            <div className="space-y-1">
              <p className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-wider">Ngày cấp bằng</p>
              <p className="text-slate-800 font-bold text-sm">{date}</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <Waves className={`${isSuccess ? "text-emerald-500" : "text-cyan-500"} w-10 h-10 mb-2 opacity-20 transition-colors`} />
              <p className="text-[7px] text-slate-400 font-mono tracking-widest uppercase">NODE: SUI-MAIN-01</p>
            </div>

            <div className="space-y-1 text-right max-w-[240px]">
              <p className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-wider">Wallet Address</p>
              <div className={`text-[10px] font-mono px-3 py-1 rounded-lg truncate ${isSuccess ? "bg-emerald-50 text-emerald-700 font-bold" : "bg-slate-50 text-slate-400"}`}>
                {evidenceValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC<{ 
  adminAddress: string; 
  onExit?: () => void; 
  activeSection: "mint" | "courses"; 
  onSectionChange: (section: "mint" | "courses") => void;
  currentAccount?: any;
}> = ({ adminAddress, onExit, activeSection, onSectionChange, currentAccount }) => {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
            <SuiLogo className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black text-slate-900 leading-none tracking-tight uppercase italic">Sui Mint Portal</span>
            <span className="text-[10px] text-indigo-600 font-bold tracking-widest uppercase italic">Administrator Access</span>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => onSectionChange("mint")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === "mint" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Award className="w-4 h-4 inline mr-2" />
            Mint Chứng chỉ
          </button>
          <button
            onClick={() => onSectionChange("courses")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === "courses" 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Video className="w-4 h-4 inline mr-2" />
            Quản lý bài giảng
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {currentAccount ? (
            <div className="flex items-center space-x-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] font-black text-indigo-700 uppercase tracking-widest">Authorized Issuer</span>
                <span className="text-[11px] font-mono text-slate-600">{currentAccount.address.slice(0, 6)}...{currentAccount.address.slice(-4)}</span>
              </div>
            </div>
          ) : (
            <ConnectButton />
          )}
          {onExit && (
            <button
              onClick={onExit}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold uppercase tracking-wider transition-all active:scale-95"
            >
              Thoát Admin
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NotificationQueue: React.FC<{ items: NotificationItem[]; onMarkSeen?: (id: string) => void }> = ({ items, onMarkSeen }) => {
  if (!items.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-[1.5rem] p-4 text-xs text-slate-500 font-bold">
        Chưa có thông báo mới.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[1.5rem] p-4 shadow-sm">
      <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{item.requestId}</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-800 leading-tight break-words">{item.message}</p>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{new Date(item.createdAt).toLocaleString("vi-VN")}</span>
            </div>
            <button
              onClick={() => onMarkSeen?.(item.id)}
              className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all flex-shrink-0 ${
                item.status === "seen"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {item.status === "seen" ? "Đã xem" : "Đánh dấu đã xem"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PayloadPreview: React.FC<{ adminPayload: AdminPayload }> = ({ adminPayload }) => (
  <div className="bg-white border border-slate-200 rounded-[1.5rem] p-4 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 text-emerald-700 text-[11px] font-black uppercase tracking-widest">
        <Fingerprint className="w-4 h-4" />
        <span>Payload admin (admin.txt)</span>
      </div>
      <span className="text-[10px] font-bold text-slate-400">Chuyển đổi off-chain</span>
    </div>
    <pre className="bg-slate-900 text-emerald-300 text-[10px] font-mono p-4 rounded-xl overflow-auto max-h-64 border border-slate-800">
      {JSON.stringify(adminPayload, null, 2)}
    </pre>
  </div>
);

// ============== COURSE MANAGER TYPES & COMPONENTS ==============

type UploadStatus = "idle" | "encoding" | "uploading" | "verifying" | "success" | "error";

type VideoItem = {
  id: string;
  title: string;
  description: string;
  module: string;
  blobId: string;
  thumbnail: string;
  duration: string;
  uploadedAt: string;
  status: "stored" | "pending";
};

// Mock course library data
const mockVideoLibrary: VideoItem[] = [
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
const WalrusIcon: React.FC<{ className?: string; glowing?: boolean }> = ({ className = "w-6 h-6", glowing }) => (
  <motion.div
    className={`relative ${className}`}
    animate={glowing ? { scale: [1, 1.1, 1] } : {}}
    transition={{ duration: 1, repeat: Infinity }}
  >
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="12" cy="12" r="10" fill={glowing ? "#10B981" : "#64748B"} />
      <ellipse cx="12" cy="14" rx="6" ry="4" fill="white" fillOpacity="0.3" />
      <circle cx="9" cy="10" r="1.5" fill="white" />
      <circle cx="15" cy="10" r="1.5" fill="white" />
      <path d="M8 16 Q12 18 16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="6" y1="14" x2="3" y2="15" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="6" y1="15" x2="3" y2="16" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="14" x2="21" y2="15" stroke="white" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="15" x2="21" y2="16" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
    {glowing && (
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400/30 blur-md"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    )}
  </motion.div>
);

// Upload Progress Component
const UploadProgress: React.FC<{ status: UploadStatus; progress: number }> = ({ status, progress }) => {
  const steps = [
    { key: "encoding", label: "Đang mã hóa", icon: Cpu },
    { key: "uploading", label: "Đang tải lên Walrus", icon: CloudUpload },
    { key: "verifying", label: "Đang xác thực", icon: ShieldCheck },
  ];

  const getCurrentStep = () => {
    if (status === "encoding") return 0;
    if (status === "uploading") return 1;
    if (status === "verifying") return 2;
    if (status === "success") return 3;
    return -1;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          
          return (
            <React.Fragment key={step.key}>
              <motion.div
                className={`flex flex-col items-center ${
                  isComplete ? "text-emerald-600" : isActive ? "text-cyan-600" : "text-slate-300"
                }`}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                  isComplete ? "bg-emerald-100" : isActive ? "bg-cyan-100" : "bg-slate-100"
                }`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider">{step.label}</span>
              </motion.div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  index < currentStep ? "bg-emerald-400" : "bg-slate-200"
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {status !== "idle" && status !== "success" && (
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
    </div>
  );
};

// Video Card Component
const VideoCard: React.FC<{ video: VideoItem; onEdit?: () => void; onCopyBlobId?: () => void }> = ({ video, onEdit, onCopyBlobId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(video.blobId);
    setCopied(true);
    onCopyBlobId?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition-all group"
    >
      {/* Thumbnail */}
      <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="w-8 h-8 text-white" />
        </div>
        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-900 text-sm truncate">{video.title}</h4>
        <p className="text-[10px] text-slate-500 truncate">{video.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase">{video.module}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="text-[9px] text-slate-400">{video.uploadedAt}</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2">
        <motion.div
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <WalrusIcon className="w-4 h-4" glowing />
          <span className="text-[9px] font-bold text-emerald-700 uppercase">Stored on Walrus</span>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          title="Chỉnh sửa"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={handleCopy}
          className={`p-2 rounded-lg transition-colors ${
            copied ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
          title="Copy Blob ID"
        >
          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
};

// Toast Notification Component
const Toast: React.FC<{ message: string; type: "success" | "error"; onClose: () => void }> = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, x: "-50%" }}
    animate={{ opacity: 1, y: 0, x: "-50%" }}
    exit={{ opacity: 0, y: 50, x: "-50%" }}
    className={`fixed bottom-6 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl ${
      type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
    }`}
  >
    {type === "success" ? (
      <WalrusIcon className="w-6 h-6" glowing />
    ) : (
      <X className="w-5 h-5" />
    )}
    <span className="font-bold text-sm">{message}</span>
    <button onClick={onClose} className="ml-2 hover:opacity-70">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

// Course Manager Component
const CourseManager: React.FC = () => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [blobId, setBlobId] = useState<string | null>(null);
  const [videoLibrary, setVideoLibrary] = useState<VideoItem[]>(mockVideoLibrary);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [copiedBlobId, setCopiedBlobId] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [module, setModule] = useState(moduleOptions[0]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle file drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      handleFileSelect(file);
    }
  }, []);

  // Handle file select
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
    setUploadStatus("idle");
    setBlobId(null);
    setUploadProgress(0);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  // Upload via server proxy to avoid exposing API key in client
  const handleUploadToWalrus = async () => {
    if (!selectedFile || !title) return;

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

            const newVideo: VideoItem = {
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
          } catch (err) {
            setUploadStatus("error");
            setToast({ message: "Không thể đọc phản hồi server.", type: "error" });
          }
        } else {
          setUploadStatus("error");
          setToast({ message: `Upload thất bại (${xhr.status})`, type: "error" });
        }
      };

      xhr.onerror = () => {
        setUploadStatus("error");
        setToast({ message: "Lỗi upload (mạng)", type: "error" });
      };

      xhr.send(form);
    } catch (err) {
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

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Left Column - Upload Zone */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
              <CloudUpload className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Walrus Upload Zone</h3>
              <p className="text-[10px] text-slate-500">Tải video lên Walrus Storage</p>
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
              dragOver 
                ? "border-cyan-500 bg-cyan-50" 
                : selectedFile 
                  ? "border-emerald-400 bg-emerald-50/30" 
                  : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {videoPreviewUrl ? (
              <video
                ref={videoRef}
                src={videoPreviewUrl}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <div className="text-center p-6">
                <motion.div
                  animate={dragOver ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloudUpload className={`w-12 h-12 mx-auto mb-4 ${dragOver ? "text-cyan-500" : "text-slate-300"}`} />
                </motion.div>
                <p className="text-sm font-bold text-slate-600 mb-1">Kéo thả video vào đây</p>
                <p className="text-[10px] text-slate-400">hoặc click để chọn file</p>
                <p className="text-[9px] text-slate-300 mt-2">Hỗ trợ: MP4, WebM, MOV (tối đa 500MB)</p>
              </div>
            )}
          </div>

          {/* File Info */}
          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-slate-50 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <FileVideo className="w-5 h-5 text-cyan-600" />
                <div>
                  <p className="text-xs font-bold text-slate-700 truncate max-w-[200px]">{selectedFile.name}</p>
                  <p className="text-[10px] text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleReset(); }}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Metadata Form */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Tiêu đề bài học *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Giới thiệu về Sui Move"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Mô tả ngắn
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả nội dung bài học..."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                Module khóa học
              </label>
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white"
              >
                {moduleOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadStatus !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <UploadProgress status={uploadStatus} progress={uploadProgress} />
            </motion.div>
          )}

          {/* Blob ID Display */}
          {blobId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <WalrusIcon className="w-5 h-5" glowing />
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Walrus Blob ID</span>
                </div>
                <button
                  onClick={handleCopyBlobId}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                    copiedBlobId 
                      ? "bg-emerald-600 text-white" 
                      : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  }`}
                >
                  {copiedBlobId ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedBlobId ? "Đã copy" : "Copy"}</span>
                </button>
              </div>
              <input
                type="text"
                value={blobId}
                readOnly
                className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg text-xs font-mono text-slate-600"
              />
            </motion.div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUploadToWalrus}
            disabled={!selectedFile || !title || uploadStatus === "encoding" || uploadStatus === "uploading" || uploadStatus === "verifying"}
            className={`mt-6 w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
              uploadStatus === "success"
                ? "bg-emerald-500 text-white"
                : !selectedFile || !title
                  ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                  : "bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-200"
            }`}
          >
            {uploadStatus === "encoding" || uploadStatus === "uploading" || uploadStatus === "verifying" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang xử lý...</span>
              </>
            ) : uploadStatus === "success" ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Đã lưu lên Walrus</span>
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5" />
                <span>Lưu lên Chain</span>
              </>
            )}
          </button>

          {uploadStatus === "success" && (
            <button
              onClick={handleReset}
              className="mt-3 w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-50"
            >
              Tải video mới
            </button>
          )}
        </div>
      </div>

      {/* Right Column - Course Library */}
      <div className="lg:col-span-7">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Course Library</h3>
                <p className="text-[10px] text-slate-500">{videoLibrary.length} video đã upload</p>
              </div>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 w-48"
              />
            </div>
          </div>

          {/* Video List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
            <AnimatePresence>
              {videoLibrary.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onEdit={() => console.log("Edit", video.id)}
                  onCopyBlobId={() => setToast({ message: "Blob ID đã được copy!", type: "success" })}
                />
              ))}
            </AnimatePresence>
          </div>

          {videoLibrary.length === 0 && (
            <div className="text-center py-12">
              <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-bold">Chưa có video nào</p>
              <p className="text-[10px] text-slate-400 mt-1">Upload video đầu tiên để bắt đầu</p>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminView: React.FC<{
  onExit?: () => void;
  certificateImage?: string | null;
  requests?: AdminQueueEntry[];
  notifications?: NotificationItem[];
  onMarkNotificationSeen?: (id: string) => void;
}> = ({ onExit, certificateImage, requests = [], notifications = [], onMarkNotificationSeen }) => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecuteTransactionBlock, isPending: isSigning } = useSignAndExecuteTransaction();
  const [selectedRequest, setSelectedRequest] = useState<AdminQueueEntry | null>(requests[0] ?? null);
  const [activeTab, setActiveTab] = useState<"metadata" | "image">("metadata");
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<{ success: boolean; tx: string; objectId?: string }>({ success: false, tx: "" });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"mint" | "courses">("mint");

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
      let imageUrl: string;
      const preview = selectedRequest.certificatePreview || 
                     selectedRequest.adminPayload?.certificate_preview?.preview_url ||
                     selectedRequest.userPayload?.certificate_preview?.preview_url;
      
      if (preview && preview.startsWith('data:image/')) {
        // Base64 data URL quá dài, không thể đưa vào transaction
        // Thay bằng URL pattern hoặc hash từ requestId
        imageUrl = `https://certificates.suiedu.com/${certificateId}.png`;
        console.warn("Base64 image detected, using placeholder URL instead. Image should be uploaded to IPFS/storage service.");
      } else if (preview && preview.startsWith('placeholder:')) {
        // Nếu là placeholder, dùng URL pattern
        imageUrl = `https://certificates.suiedu.com/${certificateId}.png`;
      } else {
        imageUrl = preview || "https://assets.suiedu.com/certificate-placeholder.png";
      }

      // Parse issueDate từ request hoặc dùng thời gian hiện tại
      let issueDate: number;
      if (selectedRequest.completionDate) {
        issueDate = new Date(selectedRequest.completionDate).getTime();
      } else if (selectedRequest.userPayload?.completion?.completed_at) {
        issueDate = new Date(selectedRequest.userPayload.completion.completed_at).getTime();
      } else {
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

    } catch (err: any) {
      console.error("Lỗi khi mint từ Admin:", err);
      
      // Xử lý các loại lỗi khác nhau
      let errorMessage = "Có lỗi xảy ra khi tạo transaction";
      
      if (err.message) {
        if (err.message.includes("reject") || err.message.includes("hủy") || err.message.includes("denied")) {
          errorMessage = "Transaction đã bị hủy bởi người dùng trong ví Slush";
        } else if (err.message.includes("undefined")) {
          errorMessage = "Transaction không nhận được phản hồi từ ví. Vui lòng thử lại hoặc kiểm tra kết nối ví.";
        } else {
          errorMessage = err.message;
        }
      }
      
      alert("Mint thất bại: " + errorMessage);
      setMintStatus({
        success: false,
        tx: "",
        objectId: undefined,
      });
    } finally {
      setIsMinting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  const effectivePreviewUrl =
    selectedRequest?.adminPayload.certificate_preview?.preview_url ||
    selectedRequest?.certificatePreview ||
    certificateImage ||
    null;

  const adminPayloadWithPreview: AdminPayload | null = selectedRequest
    ? {
        ...selectedRequest.adminPayload,
        certificate_preview: {
          preview_url: effectivePreviewUrl,
          preview_hash: selectedRequest.adminPayload.certificate_preview?.preview_hash || selectedRequest.userPayload?.certificate_preview?.preview_hash || "",
        },
      }
    : null;

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans antialiased overflow-x-hidden">
      <Navbar 
        adminAddress={currentAccount?.address || "0x8e2b...4f91"} 
        onExit={onExit} 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        currentAccount={currentAccount}
      />

      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeSection === "courses" ? (
            <motion.div
              key="courses"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CourseManager />
            </motion.div>
          ) : (
            <motion.div
              key="mint"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
                  <Bell className="w-4 h-4 mr-2 text-indigo-600" />
                  Yêu cầu phê duyệt
                </h3>
                <div className="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black rounded-full">MỚI</div>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {requests.map((req) => (
                  <button
                    key={req.requestId}
                    onClick={() => {
                      setSelectedRequest(req);
                      setMintStatus({ success: false, tx: "", objectId: undefined });
                    }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      selectedRequest?.requestId === req.requestId ? "border-indigo-600 bg-indigo-50/30 shadow-md" : "border-slate-50 bg-slate-50 hover:border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase">{req.requestId}</span>
                      <Clock className="w-3 h-3 text-slate-300" />
                    </div>
                    <p className="font-black text-slate-900 truncate text-sm">{req.studentName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter truncate">{req.courseName}</span>
                      <ArrowRight className="w-3 h-3 text-indigo-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Cpu size={80} />
              </div>
              <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-4">Hệ thống Phát hành</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold border-b border-white/5 pb-2">
                    <span className="opacity-50 uppercase tracking-tighter">Mạng lưới</span>
                    <span className="text-emerald-400">SUI TESTNET</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold border-b border-white/5 pb-2">
                    <span className="opacity-50 uppercase tracking-tighter">Quyền hạn</span>
                    <span className="text-indigo-400">MINTER_ADMIN</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Node Status</span>
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[9px] text-emerald-500 font-black">ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
                  <Bell className="w-4 h-4 mr-2 text-indigo-600" />
                  Thông báo queue
                </h3>
                <div className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-black rounded-full">{notifications.length}</div>
              </div>
              <NotificationQueue items={notifications} onMarkSeen={onMarkNotificationSeen} />
            </div>
          </div>

          <div className="lg:col-span-8 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
            {selectedRequest ? (
              <div className="space-y-6">
                <div className="bg-white p-1.5 rounded-2xl border border-slate-200 flex shadow-sm">
                  <button
                    onClick={() => setActiveTab("metadata")}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === "metadata" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Database size={16} />
                    <span>Mint Metadata Chuẩn</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("image")}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeTab === "image" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <ImageIcon size={16} />
                    <span>Chuyển Ảnh thành NFT</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <SuiLogo className="text-slate-900 w-6 h-6" />
                      </div>
                      <Award className="text-indigo-500 w-10 h-10" />
                    </div>

                    <div className="text-center space-y-4 mb-8 flex-1 flex flex-col justify-center">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bản xem trước chứng chỉ</p>
                      <CertificatePreviewCard
                        studentName={selectedRequest.studentName}
                        courseName={selectedRequest.courseName}
                        date={selectedRequest.completionDate ? new Date(selectedRequest.completionDate).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }) : new Date().toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                        walletAddress={selectedRequest.wallet}
                        isSuccess={false}
                      />
                    </div>

                    <div className="mt-6 space-y-2 pt-4 border-t border-slate-50">
                      <div className="flex justify-between text-[9px] font-bold">
                        <span className="text-slate-400 uppercase tracking-tighter">Ví sinh viên</span>
                        <span className="text-slate-900 font-mono truncate max-w-[120px]">{selectedRequest.wallet}</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-bold">
                        <span className="text-slate-400 uppercase tracking-tighter">Ngày hoàn thành</span>
                        <span className="text-slate-900">{selectedRequest.completionDate}</span>
                      </div>
                    </div>
                  </div>

                  {activeTab === "metadata" ? (
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center">
                        <Fingerprint className="w-4 h-4 mr-2 text-indigo-600" />
                        Đúc Dữ liệu Blockchain
                      </h3>

                      <div className="flex-1 space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[9px] text-slate-500 font-bold leading-relaxed italic">
                            Payload gửi admin (admin.txt) sẽ được dùng cho bước đúc, không hiển thị metadata mẫu.
                          </p>
                        </div>
                        {adminPayloadWithPreview && <PayloadPreview adminPayload={adminPayloadWithPreview} />}
                      </div>

                      <button
                        onClick={handleMint}
                        disabled={isMinting || isSigning || mintStatus.success || !currentAccount}
                        className={`mt-6 w-full flex items-center justify-center space-x-3 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
                          mintStatus.success 
                            ? "bg-emerald-500 text-white" 
                            : !currentAccount
                            ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                            : "bg-slate-900 text-white hover:bg-black shadow-slate-200"
                        }`}
                      >
                        {isMinting || isSigning ? (
                          <>
                            <Loader2 className="animate-spin size-4" /> 
                            <span>{isSigning ? "Đang chờ ký transaction trong ví..." : "Đang xử lý..."}</span>
                          </>
                        ) : mintStatus.success ? (
                          <>
                            <CheckCircle2 size={16} /> <span>Đã đúc xong</span>
                          </>
                        ) : !currentAccount ? (
                          <>
                            <Wallet className="size-4" /> <span>Vui lòng kết nối ví Slush</span>
                          </>
                        ) : (
                          <>
                            <Rocket size={16} /> <span>Xác nhận & Mint NFT</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm flex flex-col">
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2 text-indigo-600" />
                        Đúc NFT từ Hình ảnh
                      </h3>

                      <div className="flex-1 space-y-6">
                        <div
                          className={`relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${
                            uploadedImage ? "border-indigo-400 bg-white" : "border-slate-200 bg-slate-50"
                          }`}
                        >
                          {uploadedImage ? (
                            <img src={uploadedImage} className="w-full h-full object-cover" alt="NFT Preview" />
                          ) : (
                            <div className="text-center p-6">
                              <Upload className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                              <p className="text-[10px] font-bold text-slate-400 uppercase">Tải lên thiết kế chứng chỉ</p>
                              <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                            </div>
                          )}
                          {uploadedImage && (
                            <button
                              onClick={() => setUploadedImage(null)}
                              className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-lg text-[8px] uppercase font-bold backdrop-blur-sm"
                            >
                              Thay đổi
                            </button>
                          )}
                        </div>

                        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                          <div className="flex items-start space-x-2 text-indigo-700">
                            <Info size={14} className="mt-0.5 flex-shrink-0" />
                            <p className="text-[9px] leading-relaxed font-bold">
                              Hình ảnh sẽ được đúc thành NFT hình ảnh thuần túy, định danh qua tên học viên và mã khóa học.
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={!uploadedImage || isMinting}
                        className={`mt-6 w-full flex items-center justify-center space-x-3 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 ${
                          !uploadedImage ? "bg-slate-100 text-slate-300" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
                        }`}
                      >
                        <Rocket size={16} />
                        <span>Đúc NFT Hình ảnh</span>
                      </button>
                    </div>
                  )}
                </div>

                {mintStatus.success && (
                  <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 shadow-2xl shadow-emerald-100/50 animate-in slide-in-from-bottom duration-500">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center space-x-2 text-emerald-600">
                        <CheckCircle2 size={20} />
                        <span className="text-base font-black uppercase tracking-tight">Giao dịch thành công!</span>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Hash</span>
                          <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <p className="text-[11px] font-mono font-bold text-slate-600 break-all flex-1">{mintStatus.tx}</p>
                            <div className="flex items-center space-x-1 ml-2">
                              <button
                                onClick={() => {
                                  const txHash = mintStatus.tx;
                                  // Sử dụng Sui Explorer chính thức cho testnet
                                  const explorerUrl = `https://suiexplorer.com/txblock/${txHash}?network=testnet`;
                                  window.open(explorerUrl, '_blank');
                                }}
                                className="hover:opacity-70 transition-opacity p-1"
                                title="Xem transaction trên Sui Explorer (Testnet)"
                              >
                                <ExternalLink className="w-4 h-4 text-indigo-500 cursor-pointer" />
                              </button>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(mintStatus.tx);
                                  alert('Đã copy Transaction Hash!');
                                }}
                                className="hover:opacity-70 transition-opacity p-1"
                                title="Copy Transaction Hash"
                              >
                                <Copy className="w-4 h-4 text-indigo-500 cursor-pointer" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {mintStatus.objectId ? (
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Certificate Object ID</span>
                            <div className="flex items-center space-x-2 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                              <p className="text-[11px] font-mono font-bold text-emerald-700 break-all flex-1">{mintStatus.objectId}</p>
                              <div className="flex items-center space-x-1 ml-2">
                                <button
                                  onClick={() => {
                                    // Sử dụng Sui Explorer chính thức cho testnet
                                    const explorerUrl = `https://suiexplorer.com/object/${mintStatus.objectId}?network=testnet`;
                                    window.open(explorerUrl, '_blank');
                                  }}
                                  className="hover:opacity-70 transition-opacity p-1"
                                  title="Xem object trên Sui Explorer (Testnet)"
                                >
                                  <ExternalLink className="w-4 h-4 text-emerald-600 cursor-pointer" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(mintStatus.objectId || '');
                                    alert('Đã copy Object ID!');
                                  }}
                                  className="hover:opacity-70 transition-opacity p-1"
                                  title="Copy Object ID"
                                >
                                  <Copy className="w-4 h-4 text-emerald-600 cursor-pointer" />
                                </button>
                              </div>
                            </div>
                            <p className="text-[9px] text-slate-400 italic">Object ID này có thể dùng để truy vết certificate trên blockchain</p>
                          </div>
                        ) : (
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                            <p className="text-[9px] text-amber-700 font-semibold">
                              ⚠️ Không tìm thấy Object ID. Vui lòng kiểm tra console để xem chi tiết transaction response.
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            // Sử dụng Sui Explorer chính thức cho testnet
                            const explorerUrl = `https://suiexplorer.com/txblock/${mintStatus.tx}?network=testnet`;
                            window.open(explorerUrl, '_blank');
                          }}
                          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 shadow-md hover:bg-black transition-all flex-1 justify-center"
                          title="Xem trên Sui Explorer (Testnet)"
                        >
                          <Search size={14} /> <span>Xem trên Explorer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-10 opacity-60">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Database className="w-10 h-10 text-slate-300" />
                </div>
                <h2 className="text-xl font-black text-slate-400 uppercase italic">Chờ phê duyệt hồ sơ</h2>
                <p className="text-slate-400 text-sm max-w-xs mt-2">Vui lòng chọn một yêu cầu từ danh sách bên trái để thực hiện kiểm tra và đúc chứng chỉ NFT.</p>
              </div>
            )}
          </div>
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[10px] font-black uppercase tracking-widest gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm">
              <SuiLogo className="text-slate-300 w-6 h-6" />
            </div>
            <p>© 2024 SUI ACADEMY - ISSUANCE PORTAL. VERSION 1.1-MANUAL.</p>
          </div>
          <div className="flex space-x-12 opacity-50 italic font-bold">
            <span className="flex items-center">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" /> NETWORK: SUI TESTNET
            </span>
            <span>SYSTEM: MANUAL CONTROL</span>
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default AdminView;
