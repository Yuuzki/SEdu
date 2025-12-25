import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  Wallet,
  Home,
  BookOpen,
  Award,
  User,
  LogOut,
  Coins,
  Bell,
  Loader2,
} from "lucide-react";

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

interface NavbarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  currentAccount: any;
  onConnect: () => void;
  onDisconnect: () => void;
  currentUser?: { fullName: string; role: string; email: string } | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onLoginClick,
  onRegisterClick,
  currentAccount,
  onConnect,
  onDisconnect,
  currentUser,
  onLogout,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [isLoadingToken, setIsLoadingToken] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(1);
  const location = useLocation();

  // Mock function to get token balance
  const getTokenBalance = async (address: string): Promise<number> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return 20; // Mock balance
  };

  // Fetch token balance when account changes
  useEffect(() => {
    if (currentAccount?.address) {
      setIsLoadingToken(true);
      getTokenBalance(currentAccount.address)
        .then((balance) => setTokenBalance(balance))
        .finally(() => setIsLoadingToken(false));
    } else {
      setTokenBalance(0);
    }
  }, [currentAccount?.address]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Trang chủ", icon: Home },
    { path: "/courses", label: "Khóa học", icon: BookOpen },
    { path: "/certificate-info", label: "Chứng chỉ", icon: Award },
    { path: "/profile", label: "Hồ sơ", icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white dark:bg-slate-900 shadow-md"
            : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200 group-hover:shadow-cyan-300 transition-shadow">
                <SuiLogo className="text-white w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 dark:text-white leading-none tracking-tight uppercase">
                  Sui Academy
                </span>
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold tracking-widest uppercase">
                  Ecosystem Education
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link key={link.path} to={link.path}>
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        active
                          ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Token Balance - Only show when connected */}
              {currentAccount && (
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  {isLoadingToken ? (
                    <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
                  ) : (
                    <span className="font-bold text-yellow-600 dark:text-yellow-400">
                      {tokenBalance}
                    </span>
                  )}
                </div>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notification Bell - Only show when connected */}
              {currentAccount && (
                <button className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
              )}

              {!currentAccount ? (
                <>
                  {currentUser ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Xin chào, {currentUser.fullName}</span>
                      {!currentAccount && (
                        <button
                          onClick={() => onConnect()}
                          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-lg transition-colors"
                        >
                          <Wallet className="w-4 h-4" />
                          <span>Kết nối ví</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          onLogout?.();
                        }}
                        className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={onLoginClick}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={onRegisterClick}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-colors"
                      >
                        Đăng ký
                      </button>
                      <button
                        onClick={onConnect}
                        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-lg transition-colors"
                      >
                        <Wallet className="w-4 h-4" />
                        <span>Kết nối ví</span>
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowAccountMenu(!showAccountMenu)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition-colors"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>{formatAddress(currentAccount.address)}</span>
                  </button>

                  {showAccountMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                          Địa chỉ ví
                        </p>
                        <p className="text-sm font-mono text-slate-900 dark:text-white break-all">
                          {currentAccount.address}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowAccountMenu(false)}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Hồ sơ
                        </span>
                      </Link>
                      <button
                        onClick={() => {
                          onDisconnect();
                          setShowAccountMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                          Ngắt kết nối
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                        active
                          ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </div>
                  </Link>
                );
              })}

              <button
                onClick={toggleTheme}
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDark ? "Chế độ sáng" : "Chế độ tối"}</span>
              </button>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                {!currentAccount ? (
                  <>
                    <button
                      onClick={() => {
                        onLoginClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Đăng nhập
                    </button>
                    <button
                      onClick={() => {
                        onRegisterClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg"
                    >
                      Đăng ký
                    </button>
                    <button
                      onClick={() => {
                        onConnect();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg"
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Kết nối ví</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Địa chỉ ví
                      </p>
                      <p className="text-sm font-mono text-slate-900 dark:text-white break-all">
                        {currentAccount.address}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onDisconnect();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      Ngắt kết nối
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  );
};

export default Navbar;
