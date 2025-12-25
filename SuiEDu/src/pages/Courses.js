import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Clock, Star, ChevronRight, Filter, Users, Sparkles } from "lucide-react";
// 3D Tilt Card Component
const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0, 0, 0.15]);
    const handleMouseMove = (e) => {
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / rect.width - 0.5);
        y.set(mouseY / rect.height - 0.5);
    };
    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };
    return (_jsx(motion.div, { ref: ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, style: {
            rotateY,
            rotateX,
            transformStyle: "preserve-3d",
        }, className: `${className} perspective-1000`, children: _jsxs("div", { style: { transform: "translateZ(30px)", transformStyle: "preserve-3d" }, className: "relative", children: [children, _jsx(motion.div, { className: "absolute inset-0 rounded-3xl pointer-events-none", style: {
                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                        backgroundPosition: glareX,
                        opacity: glareOpacity,
                    } })] }) }));
};
// Course data
const allCourses = [
    {
        id: 1,
        title: "Lập trình Move cơ bản",
        description: "Học ngôn ngữ lập trình Move từ đầu, xây dựng smart contract đầu tiên trên Sui.",
        lessons: 12,
        duration: "6 giờ",
        level: "Cơ bản",
        category: "move",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
        rating: 4.9,
        students: 2340,
        progress: 0,
        instructor: "Nguyễn Văn A",
    },
    {
        id: 2,
        title: "DeFi trên Sui Network",
        description: "Khám phá thế giới DeFi, từ AMM đến Lending Protocol trên hệ sinh thái Sui.",
        lessons: 15,
        duration: "8 giờ",
        level: "Trung cấp",
        category: "defi",
        image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop",
        rating: 4.8,
        students: 1890,
        progress: 45,
        instructor: "Trần Thị B",
    },
    {
        id: 3,
        title: "NFT & Digital Assets",
        description: "Tạo và quản lý NFT trên Sui, xây dựng marketplace và collection.",
        lessons: 10,
        duration: "5 giờ",
        level: "Cơ bản",
        category: "nft",
        image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop",
        rating: 4.7,
        students: 3120,
        progress: 100,
        instructor: "Lê Văn C",
    },
    {
        id: 4,
        title: "Move nâng cao",
        description: "Kỹ thuật lập trình Move nâng cao: generics, abilities, và object-centric design.",
        lessons: 18,
        duration: "10 giờ",
        level: "Nâng cao",
        category: "move",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
        rating: 4.9,
        students: 980,
        progress: 20,
        instructor: "Phạm Văn D",
    },
    {
        id: 5,
        title: "Sui Object Model",
        description: "Hiểu sâu về Object Model của Sui, cách tổ chức và quản lý state on-chain.",
        lessons: 8,
        duration: "4 giờ",
        level: "Trung cấp",
        category: "move",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
        rating: 4.6,
        students: 1560,
        progress: 0,
        instructor: "Hoàng Thị E",
    },
    {
        id: 6,
        title: "Yield Farming Strategies",
        description: "Các chiến lược farming hiệu quả trên các protocol DeFi của Sui.",
        lessons: 12,
        duration: "6 giờ",
        level: "Nâng cao",
        category: "defi",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
        rating: 4.5,
        students: 720,
        progress: 0,
        instructor: "Nguyễn Văn F",
    },
    {
        id: 7,
        title: "NFT Gaming trên Sui",
        description: "Xây dựng game blockchain với NFT items, characters và tokenomics.",
        lessons: 20,
        duration: "12 giờ",
        level: "Trung cấp",
        category: "nft",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
        rating: 4.8,
        students: 2100,
        progress: 65,
        instructor: "Trần Văn G",
    },
    {
        id: 8,
        title: "Sui dApp từ A-Z",
        description: "Xây dựng dApp hoàn chỉnh từ frontend đến smart contract trên Sui.",
        lessons: 25,
        duration: "15 giờ",
        level: "Trung cấp",
        category: "move",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
        rating: 4.9,
        students: 3450,
        progress: 0,
        instructor: "Lê Thị H",
    },
];
const categories = [
    { id: "all", label: "Tất cả", count: allCourses.length },
    { id: "move", label: "Lập trình Move", count: allCourses.filter(c => c.category === "move").length },
    { id: "defi", label: "DeFi", count: allCourses.filter(c => c.category === "defi").length },
    { id: "nft", label: "NFT", count: allCourses.filter(c => c.category === "nft").length },
];
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};
const Courses = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const filteredCourses = allCourses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    const renderStars = (rating) => {
        return (_jsxs("div", { className: "flex items-center space-x-1", children: [[1, 2, 3, 4, 5].map((star) => (_jsx(Star, { className: `w-4 h-4 ${star <= Math.floor(rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300 dark:text-slate-600"}` }, star))), _jsx("span", { className: "text-sm font-bold text-slate-700 dark:text-slate-300 ml-1", children: rating })] }));
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-32 pb-24 overflow-hidden", children: [_jsxs("div", { className: "fixed inset-0 pointer-events-none overflow-hidden", children: [_jsx(motion.div, { className: "absolute top-20 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-primary-400/20 to-neon-purple/10 rounded-full blur-3xl", animate: {
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }, transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } }), _jsx(motion.div, { className: "absolute bottom-20 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-neon-cyan/20 to-primary-400/10 rounded-full blur-3xl", animate: {
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }, transition: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 } })] }), _jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6", children: [_jsxs(motion.div, { className: "text-center mb-14", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsxs(motion.div, { className: "inline-flex items-center space-x-2 px-5 py-2.5 glass-light dark:glass-dark rounded-full mb-6 shadow-lg", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2 }, children: [_jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 4, repeat: Infinity, ease: "linear" }, children: _jsx(Sparkles, { className: "w-5 h-5 text-primary-500" }) }), _jsx("span", { className: "text-sm font-bold text-primary-700 dark:text-primary-300", children: "H\u01A1n 50 kh\u00F3a h\u1ECDc ch\u1EA5t l\u01B0\u1EE3ng cao" })] }), _jsxs("h1", { className: "text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-5", children: ["Kh\u00E1m ph\u00E1 ", _jsx("span", { className: "text-gradient", children: "kh\u00F3a h\u1ECDc" })] }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto", children: "C\u00E1c kh\u00F3a h\u1ECDc blockchain v\u00E0 h\u1EC7 sinh th\u00E1i Sui \u0111\u01B0\u1EE3c thi\u1EBFt k\u1EBF b\u1EDFi chuy\u00EAn gia." })] }), _jsx(motion.div, { className: "mb-12", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, children: _jsxs("div", { className: "flex flex-col md:flex-row gap-4 items-center justify-between", children: [_jsxs("div", { className: "relative w-full md:w-96", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }), _jsx("input", { type: "text", placeholder: "T\u00ECm ki\u1EBFm kh\u00F3a h\u1ECDc...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-12 pr-4 py-4 glass-light dark:glass-dark rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-lg" })] }), _jsxs("div", { className: "flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto", children: [_jsx(Filter, { className: "w-5 h-5 text-slate-400 hidden md:block" }), categories.map((category) => (_jsxs(motion.button, { onClick: () => setSelectedCategory(category.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: `px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === category.id
                                                ? "bg-gradient-to-r from-primary-500 to-neon-purple text-white shadow-3d"
                                                : "glass-light dark:glass-dark text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"}`, children: [category.label, _jsxs("span", { className: `ml-1.5 ${selectedCategory === category.id ? "text-white/70" : "text-slate-400 dark:text-slate-500"}`, children: ["(", category.count, ")"] })] }, category.id)))] })] }) }), _jsx(motion.div, { className: "mb-8", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 }, children: _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: ["Hi\u1EC3n th\u1ECB ", _jsx("span", { className: "font-bold text-slate-700 dark:text-slate-200", children: filteredCourses.length }), " kh\u00F3a h\u1ECDc"] }) }), _jsx(motion.div, { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", variants: containerVariants, initial: "hidden", animate: "visible", children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredCourses.map((course) => (_jsx(motion.div, { variants: itemVariants, layout: true, exit: { opacity: 0, scale: 0.9 }, children: _jsx(TiltCard, { className: "h-full", children: _jsxs("div", { className: "group glass-card dark:glass-card rounded-3xl overflow-hidden h-full flex flex-col cursor-pointer", children: [_jsxs("div", { className: "relative h-44 overflow-hidden", children: [_jsx(motion.img, { src: course.image, alt: course.title, className: "w-full h-full object-cover", whileHover: { scale: 1.1 }, transition: { duration: 0.5 } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }), _jsx("span", { className: "absolute top-3 left-3 px-3 py-1.5 glass text-white text-xs font-bold rounded-full", children: course.level }), course.progress > 0 && (_jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1.5 bg-white/30", children: _jsx(motion.div, { className: `h-full ${course.progress === 100 ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gradient-to-r from-primary-400 to-neon-purple'}`, initial: { width: 0 }, animate: { width: `${course.progress}%` }, transition: { duration: 1, delay: 0.5 } }) }))] }), _jsxs("div", { className: "p-5 flex flex-col flex-1", children: [_jsx("h3", { className: "text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors line-clamp-1", children: course.title }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2", children: course.description }), _jsx("div", { className: "mb-3", children: renderStars(course.rating) }), _jsxs("div", { className: "flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4", children: [_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(BookOpen, { className: "w-3.5 h-3.5" }), _jsxs("span", { children: [course.lessons, " b\u00E0i"] })] }), _jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "w-3.5 h-3.5" }), _jsx("span", { children: course.duration })] }), _jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Users, { className: "w-3.5 h-3.5" }), _jsx("span", { children: course.students.toLocaleString() })] })] }), course.progress > 0 && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center justify-between text-xs mb-1.5", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400", children: "Ti\u1EBFn \u0111\u1ED9" }), _jsxs("span", { className: `font-bold ${course.progress === 100 ? 'text-emerald-500' : 'text-primary-500'}`, children: [course.progress, "%"] })] }), _jsx("div", { className: "h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden", children: _jsx(motion.div, { className: `h-full rounded-full ${course.progress === 100
                                                                        ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                                                                        : 'bg-gradient-to-r from-primary-500 to-neon-purple'}`, initial: { width: 0 }, whileInView: { width: `${course.progress}%` }, viewport: { once: true }, transition: { duration: 1, delay: 0.3 } }) })] })), _jsx("div", { className: "mt-auto", children: _jsx(Link, { to: `/learn/${course.id}`, children: _jsxs(motion.button, { className: `w-full flex items-center justify-center space-x-2 py-3 font-bold rounded-xl transition-all relative overflow-hidden ${course.progress === 100
                                                                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-800"
                                                                    : course.progress > 0
                                                                        ? "bg-gradient-to-r from-primary-500 to-neon-purple text-white shadow-3d"
                                                                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900"}`, whileHover: { y: -2 }, whileTap: { y: 2 }, style: course.progress > 0 && course.progress < 100 ? {
                                                                    boxShadow: "0 4px 0 #0082CC",
                                                                } : course.progress === 0 ? {
                                                                    boxShadow: "0 4px 0 #1e293b",
                                                                } : {}, children: [_jsx("span", { children: course.progress === 100
                                                                            ? "Hoàn thành"
                                                                            : course.progress > 0
                                                                                ? "Tiếp tục học"
                                                                                : "Vào học" }), _jsx(ChevronRight, { className: "w-4 h-4" })] }) }) })] })] }) }) }, course.id))) }) }, selectedCategory + searchQuery), _jsx(AnimatePresence, { children: filteredCourses.length === 0 && (_jsxs(motion.div, { className: "text-center py-24", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: [_jsx(motion.div, { className: "w-24 h-24 glass-light dark:glass-dark rounded-3xl flex items-center justify-center mx-auto mb-6", animate: {
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.05, 1],
                                    }, transition: { duration: 2, repeat: Infinity }, children: _jsx(Search, { className: "w-12 h-12 text-slate-400" }) }), _jsx("h3", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-3", children: "Kh\u00F4ng t\u00ECm th\u1EA5y kh\u00F3a h\u1ECDc" }), _jsx("p", { className: "text-slate-500 dark:text-slate-400", children: "Th\u1EED t\u00ECm ki\u1EBFm v\u1EDBi t\u1EEB kh\u00F3a kh\u00E1c ho\u1EB7c thay \u0111\u1ED5i b\u1ED9 l\u1ECDc." })] })) })] })] }));
};
export default Courses;
