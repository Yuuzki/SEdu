import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Wallet, Home, BookOpen, Award, User, LogOut, Coins, Bell, Loader2, } from "lucide-react";
const SuiLogo = ({ className = "w-6 h-6" }) => (_jsxs("svg", { viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: className, children: [_jsx("path", { d: "M50 0C50 0 20 35 20 60C20 76.5685 33.4315 90 50 90C66.5685 90 80 76.5685 80 60C80 35 50 0 50 0Z", fill: "currentColor" }), _jsx("path", { d: "M50 15C50 15 30 40 30 60C30 71.0457 38.9543 80 50 80C61.0457 80 70 71.0457 70 60C70 40 50 15 50 15Z", fill: "white", fillOpacity: "0.3" })] }));
const Navbar = ({ onLoginClick, onRegisterClick, currentAccount, onConnect, onDisconnect, currentUser, onLogout, }) => {
    const [isDark, setIsDark] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [isLoadingToken, setIsLoadingToken] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(1);
    const location = useLocation();
    // Mock function to get token balance
    const getTokenBalance = async (address) => {
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
        }
        else {
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
        }
        else {
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
    const isActive = (path) => location.pathname === path;
    const formatAddress = (address) => {
        if (!address)
            return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { className: `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white dark:bg-slate-900 shadow-md"
                    : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm"}`, children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-3 group", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200 group-hover:shadow-cyan-300 transition-shadow", children: _jsx(SuiLogo, { className: "text-white w-7 h-7" }) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-lg font-black text-slate-900 dark:text-white leading-none tracking-tight uppercase", children: "Sui Academy" }), _jsx("span", { className: "text-[10px] text-cyan-600 dark:text-cyan-400 font-bold tracking-widest uppercase", children: "Ecosystem Education" })] })] }), _jsx("div", { className: "hidden md:flex items-center space-x-1", children: navLinks.map((link) => {
                                        const Icon = link.icon;
                                        const active = isActive(link.path);
                                        return (_jsx(Link, { to: link.path, children: _jsxs("div", { className: `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${active
                                                    ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                                                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { children: link.label })] }) }, link.path));
                                    }) }), _jsxs("div", { className: "hidden md:flex items-center space-x-3", children: [currentAccount && (_jsxs("div", { className: "flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800", children: [_jsx(Coins, { className: "w-5 h-5 text-yellow-500" }), isLoadingToken ? (_jsx(Loader2, { className: "w-4 h-4 text-yellow-500 animate-spin" })) : (_jsx("span", { className: "font-bold text-yellow-600 dark:text-yellow-400", children: tokenBalance }))] })), _jsx("button", { onClick: toggleTheme, className: "p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", "aria-label": "Toggle theme", children: isDark ? _jsx(Sun, { className: "w-5 h-5" }) : _jsx(Moon, { className: "w-5 h-5" }) }), currentAccount && (_jsxs("button", { className: "relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: [_jsx(Bell, { className: "w-5 h-5" }), unreadNotifications > 0 && (_jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" }))] })), !currentAccount ? (_jsx(_Fragment, { children: currentUser ? (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-200", children: ["Xin ch\u00E0o, ", currentUser.fullName] }), !currentAccount && (_jsxs("button", { onClick: () => onConnect(), className: "flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-lg transition-colors", children: [_jsx(Wallet, { className: "w-4 h-4" }), _jsx("span", { children: "K\u1EBFt n\u1ED1i v\u00ED" })] })), _jsx("button", { onClick: () => {
                                                            onLogout?.();
                                                        }, className: "px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors", children: "\u0110\u0103ng xu\u1EA5t" })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: onLoginClick, className: "px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "\u0110\u0103ng nh\u1EADp" }), _jsx("button", { onClick: onRegisterClick, className: "px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-colors", children: "\u0110\u0103ng k\u00FD" }), _jsxs("button", { onClick: onConnect, className: "flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-lg transition-colors", children: [_jsx(Wallet, { className: "w-4 h-4" }), _jsx("span", { children: "K\u1EBFt n\u1ED1i v\u00ED" })] })] })) })) : (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowAccountMenu(!showAccountMenu), className: "flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg transition-colors", children: [_jsx(Wallet, { className: "w-4 h-4" }), _jsx("span", { children: formatAddress(currentAccount.address) })] }), showAccountMenu && (_jsxs("div", { className: "absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden", children: [_jsxs("div", { className: "p-4 border-b border-slate-200 dark:border-slate-700", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "\u0110\u1ECBa ch\u1EC9 v\u00ED" }), _jsx("p", { className: "text-sm font-mono text-slate-900 dark:text-white break-all", children: currentAccount.address })] }), _jsxs(Link, { to: "/profile", onClick: () => setShowAccountMenu(false), className: "flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(User, { className: "w-4 h-4 text-slate-600 dark:text-slate-400" }), _jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: "H\u1ED3 s\u01A1" })] }), _jsxs("button", { onClick: () => {
                                                                onDisconnect();
                                                                setShowAccountMenu(false);
                                                            }, className: "w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left", children: [_jsx(LogOut, { className: "w-4 h-4 text-red-600 dark:text-red-400" }), _jsx("span", { className: "text-sm font-medium text-red-600 dark:text-red-400", children: "Ng\u1EAFt k\u1EBFt n\u1ED1i" })] })] }))] }))] }), _jsx("button", { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: isMobileMenuOpen ? _jsx(X, { className: "w-6 h-6" }) : _jsx(Menu, { className: "w-6 h-6" }) })] }) }), isMobileMenuOpen && (_jsx("div", { className: "md:hidden border-t border-slate-200 dark:border-slate-700", children: _jsxs("div", { className: "px-4 py-3 space-y-2", children: [navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const active = isActive(link.path);
                                    return (_jsx(Link, { to: link.path, onClick: () => setIsMobileMenuOpen(false), children: _jsxs("div", { className: `flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${active
                                                ? "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400"
                                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`, children: [_jsx(Icon, { className: "w-5 h-5" }), _jsx("span", { children: link.label })] }) }, link.path));
                                }), _jsxs("button", { onClick: toggleTheme, className: "w-full flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: [isDark ? _jsx(Sun, { className: "w-5 h-5" }) : _jsx(Moon, { className: "w-5 h-5" }), _jsx("span", { children: isDark ? "Chế độ sáng" : "Chế độ tối" })] }), _jsx("div", { className: "pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2", children: !currentAccount ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => {
                                                    onLoginClick?.();
                                                    setIsMobileMenuOpen(false);
                                                }, className: "w-full px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "\u0110\u0103ng nh\u1EADp" }), _jsx("button", { onClick: () => {
                                                    onRegisterClick?.();
                                                    setIsMobileMenuOpen(false);
                                                }, className: "w-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg", children: "\u0110\u0103ng k\u00FD" }), _jsxs("button", { onClick: () => {
                                                    onConnect();
                                                    setIsMobileMenuOpen(false);
                                                }, className: "w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg", children: [_jsx(Wallet, { className: "w-4 h-4" }), _jsx("span", { children: "K\u1EBFt n\u1ED1i v\u00ED" })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1", children: "\u0110\u1ECBa ch\u1EC9 v\u00ED" }), _jsx("p", { className: "text-sm font-mono text-slate-900 dark:text-white break-all", children: currentAccount.address })] }), _jsx("button", { onClick: () => {
                                                    onDisconnect();
                                                    setIsMobileMenuOpen(false);
                                                }, className: "w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors", children: "Ng\u1EAFt k\u1EBFt n\u1ED1i" })] })) })] }) }))] }), _jsx("div", { className: "h-16" })] }));
};
export default Navbar;
