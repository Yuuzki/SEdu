import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Download,
  Info,
  Loader2,
  Share2,
  Sparkles,
  User,
  Wallet,
  Waves,
} from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { submitCertificateRequest } from '../services/certificateService';
import { useCurrentAccount, ConnectButton, useDisconnectWallet } from '@mysten/dapp-kit';
import { AdminQueueEntry, NotificationItem } from "../AdminView";

// --- Types & Globals ---
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

const COURSE_INFO = { id: "course-fullstack-sui", name: "Fullstack Web3 & Sui Move Development" };

// --- Helper Components ---
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

const CertificateCard: React.FC<{ 
  studentName: string; 
  courseName: string; 
  date: string; 
  txHash: string; 
  isSuccess: boolean; 
  walletAddress?: string | null; 
  certificateRef?: React.RefObject<HTMLDivElement> 
}> = ({
  studentName,
  courseName,
  date,
  txHash,
  isSuccess,
  walletAddress,
  certificateRef,
}) => {
  const evidenceValue = txHash || walletAddress || "Chưa kết nối ví (Not connected)";

  return (
    // ID QUAN TRỌNG: certificate-container
    <div ref={certificateRef} id="certificate-container" data-certificate="true" className="relative w-full max-w-4xl mx-auto transition-all duration-700 bg-white">
      {isSuccess && (
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
          <div className="absolute w-[120%] h-[120%] border-2 border-cyan-400/20 rounded-full animate-ping opacity-0" style={{ animationDuration: "3s" }} />
        </div>
      )}

      {/* --- PHẦN BADGE "ĐÃ XÁC THỰC" (Đã thêm ID để xóa khi in PDF) --- */}
      <div id="cert-badge" className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
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
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center overflow-hidden">
          <SuiLogo className={`w-[90%] h-[90%] transition-colors duration-1000 ${isSuccess ? "text-emerald-500" : "text-cyan-600"} rotate-[-15deg]`} />
        </div>

        <div className={`absolute inset-6 border ${isSuccess ? "border-emerald-100" : "border-slate-100"} rounded-[1.5rem] pointer-events-none transition-colors`}>
           <div className="absolute bottom-0 left-0 w-full h-24 opacity-[0.05] pointer-events-none overflow-hidden rounded-b-[1.5rem]">
             <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-full w-full">
               <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
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
            
            {/* ID NÀY RẤT QUAN TRỌNG ĐỂ CODE TÌM VÀ SỬA LỖI */}
            <div id="wrapper-student-name">
                <h1
                id="cert-student-name"
                className="text-5xl md:text-7xl text-slate-900 min-h-[1.1em] px-4 truncate leading-tight tracking-tight pb-2"
                style={{ fontFamily: '"Playfair Display", "Noto Serif", "Times New Roman", serif', fontWeight: 700, fontStyle: "italic" }}
                >
                {studentName || "Họ Tên Của Bạn"}
                </h1>
            </div>
            
            <div className={`h-px w-48 bg-gradient-to-r from-transparent ${isSuccess ? "via-emerald-200" : "via-slate-200"} to-transparent mx-auto`} />
            <p className="text-slate-500 text-base font-medium">Đã đạt đủ điều kiện chuyên môn cho khóa đào tạo</p>
            
            {/* ID NÀY RẤT QUAN TRỌNG ĐỂ CODE TÌM VÀ SỬA LỖI */}
            <div id="wrapper-course-name">
                <p 
                    id="cert-course-name" 
                    className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800 pb-1"
                >
                {courseName}
                </p>
            </div>
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

// --- Utils ---
const createPreviewHash = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(16)}`;
};

// --- Main Component ---
const Certificate: React.FC<CertificateProps> = ({ 
  onEnterAdmin, 
  onQueueSubmission, 
  onQueueNotification 
}) => {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnectWallet, isPending: isDisconnecting } = useDisconnectWallet();
  const wallet = currentAccount?.address ?? null;
  const certificateRef = useRef<HTMLDivElement>(null);
  const [issueDate, setIssueDate] = useState<string>("");
  const [studentName, setStudentName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const course = COURSE_INFO;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const triggerWaterBurst = () => {
    if (!window.confetti) return;
    window.confetti({
      particleCount: 500,
      spread: 120,
      origin: { y: 0.6 },
      colors: ["#06b6d4", "#0ea5e9", "#3b82f6", "#ffffff", "#7dd3fc"],
      shapes: ["circle"],
      scalar: 1.4,
      gravity: 0.8,
      ticks: 300,
      startVelocity: 40,
    });
  };

  useEffect(() => {
    if (!wallet) setCurrentStep(1);
    else if (!studentName) setCurrentStep(2);
    else if (!isSuccess) setCurrentStep(3);
    else setCurrentStep(4);
  }, [wallet, studentName, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      triggerWaterBurst();
    }
  }, [isSuccess]);

  const handleDisconnect = () => {
    disconnectWallet();
    setStudentName("");
    setIsSuccess(false);
    setCurrentStep(1);
  };

  useEffect(() => {
    const formatted = new Date().toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setIssueDate(formatted);
  }, []);

  // --- HÀM TẠO PDF: FIX TUYỆT ĐỐI + XÓA BADGE "ĐÃ XÁC THỰC" ---
  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    
    try {
      document.body.style.cursor = "wait";
      await document.fonts.ready;

      const canvas = await html2canvas(certificateRef.current, {
        scale: 4, 
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        allowTaint: true,
        onclone: (clonedDoc) => {
          // --- CHIẾN LƯỢC: TÌM VÀ DIỆT (Xóa class cũ, thay style inline mới) ---

          // 1. XÓA BADGE "ĐÃ XÁC THỰC" TRÊN ĐỈNH
          const badge = clonedDoc.getElementById('cert-badge');
          if (badge) {
            badge.remove(); // Xóa hoàn toàn khỏi file PDF
          }

          // 2. XỬ LÝ TÊN HỌC VIÊN
          const wrapperName = clonedDoc.getElementById('wrapper-student-name');
          if (wrapperName) {
            wrapperName.innerHTML = ""; 
            const newH1 = clonedDoc.createElement('h1');
            newH1.innerText = studentName || "Học Viên";
            
            newH1.style.fontFamily = '"Times New Roman", serif'; 
            newH1.style.color = '#1e293b'; 
            newH1.style.fontSize = '60px';
            newH1.style.fontWeight = 'bold';
            newH1.style.textAlign = 'center';
            newH1.style.margin = '0';
            newH1.style.padding = '10px 0';
            
            wrapperName.appendChild(newH1);
          }

          // 3. XỬ LÝ TÊN KHÓA HỌC (LOẠI BỎ THANH MÀU XANH)
          const wrapperCourse = clonedDoc.getElementById('wrapper-course-name');
          if (wrapperCourse) {
            wrapperCourse.innerHTML = ""; 
            
            const newP = clonedDoc.createElement('p');
            newP.innerText = course.name;

            newP.style.fontFamily = 'Arial, sans-serif';
            newP.style.color = '#0891b2'; 
            newP.style.fontSize = '32px';
            newP.style.fontWeight = 'bold';
            newP.style.textAlign = 'center';
            newP.style.margin = '10px 0';
            
            wrapperCourse.appendChild(newP);
          }

          // 4. Reset Transform
          const container = clonedDoc.getElementById('certificate-container');
          if (container) {
            container.style.transform = 'none';
            container.style.boxShadow = 'none'; 
          }
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();
      const yOffset = (pageHeight - pdfHeight) / 2;

      pdf.addImage(imgData, "JPEG", 0, yOffset > 0 ? yOffset : 0, pdfWidth, pdfHeight);

      const sanitizedName = (studentName || "Sui-Certificate").replace(/[^a-zA-Z0-9\s]/g, "").trim();
      pdf.save(`Certificate-${sanitizedName}.pdf`);

    } catch (error) {
      console.error("Lỗi khi xuất PDF:", error);
      alert("Lỗi tạo PDF. Vui lòng thử lại.");
    } finally {
      document.body.style.cursor = "default";
    }
  };

  const capturePreview = useCallback(async (): Promise<string | null> => {
    if (!certificateRef.current) return null;
    try {
        const canvas = await html2canvas(certificateRef.current, {
            scale: 2,
            backgroundColor: "#ffffff",
            useCORS: true,
            onclone: (clonedDoc) => {
                const wrapperCourse = clonedDoc.getElementById('wrapper-course-name');
                if (wrapperCourse) {
                    const el = wrapperCourse.querySelector('p');
                    if(el) {
                        el.style.background = 'none';
                        el.style.webkitTextFillColor = '#0891b2';
                        el.style.color = '#0891b2';
                    }
                }
                // Xóa badge trong preview admin luôn cho đẹp
                const badge = clonedDoc.getElementById('cert-badge');
                if (badge) badge.remove();
            }
        });
        return canvas.toDataURL("image/png");
    } catch (e) {
        return null;
    }
  }, []);

  const handleCreateRequest = async () => {
    if (!wallet || !studentName) {
      alert("Vui lòng nhập tên và kết nối ví");
      return;
    }
    
    setIsSubmitting(true);
    let previewUrl: string | null = null;
    
    try {
      try {
        previewUrl = await capturePreview();
      } catch (previewError) {
        console.warn("Lỗi chụp preview:", previewError);
      }

      const submittedAt = new Date().toISOString();
      const requestId = `REQ-${Date.now()}`;

      const requestData = {
        requestId,
        studentName,
        courseName: course.name,
        walletAddress: wallet,
        issueDate: issueDate,
        previewUrl: previewUrl,
        status: "pending",
        submittedAt: submittedAt,
      };

      let backendSuccess = false;
      try {
        await submitCertificateRequest(requestData);
        backendSuccess = true;
      } catch (apiError: any) {
        console.warn("Backend không khả dụng, chỉ lưu local:", apiError);
      }

      const previewHash = createPreviewHash(`${requestId}-${wallet}-${previewUrl || ''}`);
      const adminEntry: AdminQueueEntry = {
        requestId: requestId,
        studentName: studentName,
        courseName: course.name,
        courseId: course.id,
        completionDate: submittedAt,
        wallet: wallet,
        certificatePreview: previewUrl?.startsWith('data:image/') 
          ? `placeholder:${previewHash}` 
          : previewUrl, 
        userPayload: {
          request_id: requestId,
          user_wallet: wallet,
          course: { course_id: course.id, course_name: course.name },
          display_name: studentName,
          completion: { completed: true, completed_at: submittedAt },
          certificate_preview: { 
            preview_url: previewUrl?.startsWith('data:image/') 
              ? `placeholder:${previewHash}` 
              : previewUrl,
            preview_hash: previewHash
          },
          status: "pending",
          submitted_at: submittedAt,
        },
        adminPayload: {
          request_id: requestId,
          recipient_wallet: wallet,
          course: { course_id: course.id, course_name: course.name },
          completion_status: { verified: true, completed_at: submittedAt },
          certificate_preview: { 
            preview_url: previewUrl?.startsWith('data:image/')
              ? `placeholder:${previewHash}`
              : previewUrl,
            preview_hash: previewHash
          },
          admin_decision: {
            status: "pending",
            reviewed_by: "",
            reviewed_at: "",
            note: "",
          },
        },
      };

      try {
        if (onQueueSubmission) onQueueSubmission(adminEntry);
      } catch (queueError) { console.error(queueError); }

      try {
        if (onQueueNotification) {
          onQueueNotification({
            id: `noti-${requestId}`,
            requestId: requestId,
            message: `Yêu cầu mới từ ${studentName} - ${course.name}`,
            createdAt: submittedAt,
            status: "pending"
          });
        }
      } catch (notifError) { console.error(notifError); }

      if (backendSuccess) {
        alert("Đã gửi yêu cầu tạo chứng chỉ lên hệ thống Admin thành công!");
      } else {
        alert("Đã lưu yêu cầu vào hệ thống local.");
      }
      setIsSuccess(true);
      
    } catch (error: any) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert(`Gửi thất bại: ${error.message || "Lỗi server"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: "Kết nối ví", status: wallet ? "complete" : "current" },
    { id: 2, name: "Thông tin", status: studentName ? "complete" : wallet ? "current" : "upcoming" },
    { id: 3, name: "Gửi yêu cầu", status: isSuccess ? "complete" : studentName ? "current" : "upcoming" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
      <main className="px-6 max-w-6xl mx-auto">
        {/* Steps */}
        <div className="mb-12 flex justify-center items-center space-x-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step.status === "complete"
                      ? "bg-emerald-500 text-white"
                      : step.status === "current"
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step.status === "complete" ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                </div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${step.status === "current" ? "text-slate-900" : "text-slate-400"}`}
                >
                  {step.name}
                </span>
              </div>
              {idx < steps.length - 1 && <div className="w-8 h-px bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>

        {/* Header */}
        {!isSuccess ? (
          <div className="text-center mb-12 space-y-3 animate-in fade-in duration-700">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Chứng nhận Kỹ năng Sui</h1>
            <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Bạn đã hoàn thành khóa học xuất sắc. Hãy xác nhận tên để đúc <strong>Sui Object NFT</strong> vĩnh viễn trên mạng lưới.
            </p>
          </div>
        ) : (
          <div className="text-center mb-12 space-y-3 animate-in zoom-in duration-500">
            <div className="inline-flex items-center space-x-2 bg-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-2 shadow-sm">
              <Sparkles className="w-4 h-4 animate-pulse" /> <span>Hành trình mới bắt đầu từ đây!</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Bằng chứng kỹ năng đã được đúc!</h1>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-8">
            <CertificateCard
              studentName={studentName}
              courseName={course.name}
              date={issueDate || "--"}
              txHash={""}
              isSuccess={isSuccess}
              walletAddress={wallet}
              certificateRef={certificateRef as React.RefObject<HTMLDivElement>}
            />
          </div>

          <div className="lg:col-span-4 space-y-6">
            {!wallet && (
              <div className="bg-white border border-cyan-200 rounded-[2rem] p-8 shadow-xl shadow-cyan-100/50">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-200">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Kết nối ví Slush</h3>
                  <p className="text-sm text-slate-500">
                    Ứng dụng chỉ hỗ trợ ví Slush. Vui lòng cài đặt và mở ví Slush để tiếp tục.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 font-semibold">
                    ⚠️ Chỉ hỗ trợ ví Slush
                  </div>
                  <div className="flex justify-center">
                    <ConnectButton />
                  </div>
                </div>
              </div>
            )}

            {wallet && (
              <div className={`bg-white border rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 transition-all ${currentStep === 2 ? "ring-2 ring-cyan-500 ring-offset-4" : ""}`}>
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center">
                  <User className="w-5 h-5 mr-2 text-cyan-600" />
                  Dữ liệu học viên
                </h3>

                <div className="space-y-6">
                  <div className="p-3 bg-cyan-50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wallet className="w-4 h-4 text-cyan-600" />
                      <span className="text-sm font-bold text-cyan-700">
                        {wallet.slice(0, 6)}...{wallet.slice(-4)}
                      </span>
                    </div>
                    <button
                      onClick={handleDisconnect}
                      disabled={isDisconnecting}
                      className="text-xs text-slate-500 hover:text-slate-700 font-semibold"
                    >
                      {isDisconnecting ? "Đang gỡ..." : "Gỡ ví"}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Họ và tên hiển thị</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="VD: Nguyễn Văn A"
                      className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500 focus:bg-white transition-all font-medium"
                      disabled={isSuccess}
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-50">
                    {!isSuccess ? (
                      <button
                        disabled={isSubmitting || !studentName}
                        onClick={handleCreateRequest}
                        className={`w-full group flex items-center justify-center space-x-3 px-6 py-5 rounded-2xl font-black text-base transition-all ${
                          !studentName
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                            : "bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:scale-[1.02] shadow-xl shadow-blue-500/20 active:scale-95"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Đang gửi yêu cầu...</span>
                          </>
                        ) : (
                          <>
                            <span>Tạo chứng chỉ</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-3 animate-in slide-in-from-bottom duration-500">
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                          <p className="text-sm font-bold text-emerald-800 mb-1">Đã gửi yêu cầu thành công!</p>
                          <p className="text-xs text-emerald-600">Admin sẽ xem xét và ký transaction để mint chứng chỉ.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={handleDownloadPdf}
                            className="flex items-center justify-center space-x-2 py-3 border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-tighter text-slate-600 hover:bg-slate-50 transition-all"
                          >
                            <Download className="w-4 h-4" />
                            <span>Tải PDF</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 py-3 border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-tighter text-slate-600 hover:bg-slate-50 transition-all">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Technical info */}
            <div className="bg-cyan-50/30 rounded-3xl p-6 border border-cyan-100/50 space-y-3">
              <h4 className="text-[10px] font-black text-cyan-700 uppercase flex items-center tracking-widest">
                <Info className="w-3 h-3 mr-1.5" /> Thông tin kỹ thuật
              </h4>
              <ul className="space-y-2">
                <li className="flex justify-between text-[10px] font-bold">
                  <span className="text-cyan-600/60 uppercase">Mạng lưới</span>
                  <span className="text-cyan-800">SUI Mainnet</span>
                </li>
                <li className="flex justify-between text-[10px] font-bold">
                  <span className="text-cyan-600/60 uppercase">Dạng dữ liệu</span>
                  <span className="text-cyan-800">Move Object</span>
                </li>
                <li className="flex justify-between text-[10px] font-bold">
                  <span className="text-emerald-600">Thời gian thực</span>
                  <span className="text-emerald-600">Đã xác thực</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Partners section */}
        <div className="mt-24 pt-16 border-t border-slate-100">
          <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mb-12">Bảo chứng bởi hệ sinh thái Sui</p>
          <div className="flex flex-wrap justify-center gap-x-20 gap-y-12 items-center px-10 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center space-x-2 font-black text-xl italic text-slate-900">
              <div className="w-6 h-6 bg-cyan-500 rounded-full scale-75 blur-[1px]" /> SUI FOUNDATION
            </div>
            <div className="font-bold text-2xl tracking-tighter text-slate-900 decoration-cyan-400 decoration-4 underline">MYSTEN LABS</div>
            <div className="flex items-center space-x-2">
              <SuiLogo className="w-8 h-8 text-cyan-600" />
              <span className="font-black text-2xl tracking-tighter italic text-slate-900 uppercase">Sui Network</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Certificate;