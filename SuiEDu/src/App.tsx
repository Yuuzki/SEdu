import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { SuiProviders, useSlushWallet } from "../blockchain/wallet";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseLearning from "./pages/CourseLearning";
import Certificate from "./pages/Certificate";
import CertificateInfo from "./pages/CertificateInfo";
import Profile from "./pages/Profile";
import AdminView, { AdminPayload, AdminQueueEntry, NotificationItem, UserPayload } from "./AdminView";

const STORAGE_KEYS = {
  queue: "cert_admin_queue",
  notifications: "cert_notifications_queue",
};

const createPreviewHash = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(16)}`;
};

const normalizeEntry = (entry: any): AdminQueueEntry => {
  const COURSE_INFO = { id: "course-fullstack-sui", name: "Fullstack Web3 & Sui Move Development" };
  const requestId = entry.requestId || entry.id || `REQ-${Date.now()}`;
  const courseId = entry.courseId || entry.course?.course_id || COURSE_INFO.id;
  const courseName = entry.courseName || entry.course?.course_name || COURSE_INFO.name;
  const wallet = entry.wallet || entry.recipient_wallet || entry.user_wallet || "";
  const displayName = entry.userPayload?.display_name || entry.studentName || "";
  const completionDate = entry.completionDate || entry.completion?.completed_at || new Date().toISOString();
  const previewUrl =
    entry.certificatePreview ||
    entry.certificate_preview?.preview_url ||
    entry.userPayload?.certificate_preview?.preview_url ||
    entry.adminPayload?.certificate_preview?.preview_url ||
    null;
  const previewHash =
    entry.certificate_preview?.preview_hash ||
    entry.userPayload?.certificate_preview?.preview_hash ||
    entry.adminPayload?.certificate_preview?.preview_hash ||
    (previewUrl ? createPreviewHash(`${requestId}-${wallet}-${previewUrl}`) : "");

  const userPayload: UserPayload = entry.userPayload
    ? {
        ...entry.userPayload,
        certificate_preview: {
          preview_url: entry.userPayload.certificate_preview?.preview_url || previewUrl,
          preview_hash: entry.userPayload.certificate_preview?.preview_hash || previewHash,
        },
      }
    : {
        request_id: requestId,
        user_wallet: wallet,
        course: { course_id: courseId, course_name: courseName },
        display_name: displayName,
        completion: { completed: true, completed_at: completionDate },
        certificate_preview: { preview_url: previewUrl, preview_hash: previewHash },
        status: "pending",
        submitted_at: completionDate,
      };

  const adminPayload: AdminPayload = entry.adminPayload
    ? {
        ...entry.adminPayload,
        certificate_preview: {
          preview_url: entry.adminPayload.certificate_preview?.preview_url || previewUrl,
          preview_hash: entry.adminPayload.certificate_preview?.preview_hash || previewHash,
        },
      }
    : {
        request_id: requestId,
        recipient_wallet: wallet,
        course: { course_id: courseId, course_name: courseName },
        completion_status: { verified: true, completed_at: completionDate },
        certificate_preview: { preview_url: previewUrl, preview_hash: previewHash },
        admin_decision: { status: "pending", reviewed_by: "", reviewed_at: "", note: "" },
      };

  return {
    requestId,
    studentName: displayName || entry.studentName || "",
    courseName,
    courseId,
    completionDate,
    wallet,
    certificatePreview: previewUrl,
    userPayload,
    adminPayload,
  };
};

// Layout component that includes Navbar and Footer
const Layout: React.FC<{ 
  children: React.ReactNode;
  onAdmin: () => void;
}> = ({ children, onAdmin }) => {
  const navigate = useNavigate();
  const { currentAccount, connectSlush, disconnectWallet, isConnecting, isDisconnecting } = useSlushWallet();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [currentUser, setCurrentUser] = useState<{ fullName: string; role: "student" | "admin"; email: string } | null>(null);

  const handleLoginClick = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: { fullName: string; role: "student" | "admin"; email: string }) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    console.log('Đăng nhập thành công:', user);
    
    // Lưu vào localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    // Điều hướng theo role
    if (user.role === 'admin') {
      onAdmin(); // Chuyển sang AdminView
    } else {
      navigate('/'); // Chuyển về trang Home
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] dark:bg-[#0B1120] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <Navbar
        currentAccount={currentAccount}
        onConnect={connectSlush}
        onDisconnect={disconnectWallet}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          localStorage.removeItem('user');
          navigate('/');
        }}
      />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

// Main app content with routing
const AppContent: React.FC = () => {
  const [adminMode, setAdminMode] = useState(false);
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null);
  const [adminQueue, setAdminQueue] = useState<AdminQueueEntry[]>([]);
  const [notificationQueue, setNotificationQueue] = useState<NotificationItem[]>([]);

  // Load data from localStorage
  useEffect(() => {
    try {
      const storedQueue = localStorage.getItem(STORAGE_KEYS.queue);
      const storedNotifications = localStorage.getItem(STORAGE_KEYS.notifications);
      if (storedQueue) {
        const parsed = JSON.parse(storedQueue);
        // Lọc bỏ Base64 images khi load
        const cleaned = parsed.map((e: any) => ({
          ...e,
          certificatePreview: e.certificatePreview?.startsWith('data:image/') ? null : e.certificatePreview
        }));
        setAdminQueue(cleaned.map(normalizeEntry));
      }
      if (storedNotifications) setNotificationQueue(JSON.parse(storedNotifications));
    } catch (error: any) {
      if (error.name === 'QuotaExceededError') {
        console.warn("LocalStorage đầy, xóa dữ liệu cũ");
        try {
          localStorage.removeItem(STORAGE_KEYS.queue);
          localStorage.removeItem(STORAGE_KEYS.notifications);
        } catch (e) {
          console.error("Không thể xóa localStorage:", e);
        }
      } else {
        console.warn("Không đọc được dữ liệu queue từ localStorage", error);
      }
    }
  }, []);

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      try {
        if (event.key === STORAGE_KEYS.queue && event.newValue) {
          setAdminQueue(JSON.parse(event.newValue).map(normalizeEntry));
        }
        if (event.key === STORAGE_KEYS.notifications && event.newValue) {
          setNotificationQueue(JSON.parse(event.newValue));
        }
      } catch (error) {
        console.warn("Không đồng bộ được dữ liệu queue từ storage", error);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleQueueSubmission = (entry: AdminQueueEntry) => {
    const normalized = normalizeEntry(entry);
    setAdminQueue((prev) => {
      const next = [normalized, ...prev];
      try {
        // Không lưu Base64 image vào localStorage - chỉ lưu metadata
        const entryWithoutBase64 = {
          ...normalized,
          certificatePreview: normalized.certificatePreview?.startsWith('data:image/') 
            ? null // Không lưu Base64 data URL
            : normalized.certificatePreview,
          userPayload: {
            ...normalized.userPayload,
            certificate_preview: {
              ...normalized.userPayload.certificate_preview,
              preview_url: normalized.userPayload.certificate_preview.preview_url?.startsWith('data:image/')
                ? null // Không lưu Base64
                : normalized.userPayload.certificate_preview.preview_url
            }
          },
          adminPayload: {
            ...normalized.adminPayload,
            certificate_preview: {
              ...normalized.adminPayload.certificate_preview,
              preview_url: normalized.adminPayload.certificate_preview.preview_url?.startsWith('data:image/')
                ? null // Không lưu Base64
                : normalized.adminPayload.certificate_preview.preview_url
            }
          }
        };
        localStorage.setItem(STORAGE_KEYS.queue, JSON.stringify([entryWithoutBase64, ...prev.map(e => ({
          ...e,
          certificatePreview: e.certificatePreview?.startsWith('data:image/') ? null : e.certificatePreview,
          userPayload: {
            ...e.userPayload,
            certificate_preview: {
              ...e.userPayload.certificate_preview,
              preview_url: e.userPayload.certificate_preview.preview_url?.startsWith('data:image/') ? null : e.userPayload.certificate_preview.preview_url
            }
          },
          adminPayload: {
            ...e.adminPayload,
            certificate_preview: {
              ...e.adminPayload.certificate_preview,
              preview_url: e.adminPayload.certificate_preview.preview_url?.startsWith('data:image/') ? null : e.adminPayload.certificate_preview.preview_url
            }
          }
        }))]));
      } catch (error: any) {
        if (error.name === 'QuotaExceededError') {
          console.warn("LocalStorage đầy, xóa các entry cũ để giải phóng dung lượng");
          // Xóa các entry cũ nhất, chỉ giữ 5 entry mới nhất
          const limited = next.slice(0, 5);
          try {
            localStorage.setItem(STORAGE_KEYS.queue, JSON.stringify(limited.map(e => ({
              ...e,
              certificatePreview: e.certificatePreview?.startsWith('data:image/') ? null : e.certificatePreview
            }))));
          } catch (e2) {
            console.error("Vẫn không thể lưu vào localStorage:", e2);
            // Chỉ cập nhật state, không lưu vào localStorage
          }
        } else {
          console.error("Lỗi khi lưu vào localStorage:", error);
        }
      }
      return next;
    });
  };

  const handleQueueNotification = (notification: NotificationItem) => {
    setNotificationQueue((prev) => {
      const next = [notification, ...prev];
      localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(next));
      return next;
    });
  };

  const handleMarkNotificationSeen = (id: string) => {
    setNotificationQueue((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, status: "seen" as const } : item));
      localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(next));
      return next;
    });
  };

  const handleEnterAdmin = (preview?: string | null) => {
    setCertificatePreview(preview ?? null);
    setAdminMode(true);
  };

  if (adminMode) {
    return (
      <AdminView
        certificateImage={certificatePreview}
        onExit={() => setAdminMode(false)}
        requests={adminQueue}
        notifications={notificationQueue}
        onMarkNotificationSeen={handleMarkNotificationSeen}
      />
    );
  }

  return (
    <Layout onAdmin={() => setAdminMode(true)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<Courses />} />
        <Route path="/learn/:courseId" element={<CourseLearning />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/certificate-info" element={<CertificateInfo />} />
        <Route 
          path="/certificate" 
          element={
            <Certificate 
              onEnterAdmin={handleEnterAdmin}
              onQueueSubmission={handleQueueSubmission}
              onQueueNotification={handleQueueNotification}
            />
          } 
        />
      </Routes>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <SuiProviders>
      <Router>
        <AppContent />
      </Router>
    </SuiProviders>
  );
};

export default App;
