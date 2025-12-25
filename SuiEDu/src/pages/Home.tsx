import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Sparkles,
  GraduationCap,
  Code,
  Shield,
  Play,
  ChevronRight,
  Star,
  Rocket,
  Trophy,
} from "lucide-react";

// Sui Capybara Mascot Component - Cute and friendly learning companion
const SuiCapybaraMascot: React.FC<{ className?: string }> = ({ className = "w-72 h-72" }) => {
  const [isBlinking, setIsBlinking] = React.useState(false);

  // Blink effect
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Shadow */}
      <ellipse cx="100" cy="185" rx="55" ry="12" fill="#0B1120" opacity="0.15" />

      {/* Body - Capybara brown color */}
      <ellipse cx="100" cy="140" rx="60" ry="45" fill="url(#capyBodyGradient)" />

      {/* Belly */}
      <ellipse cx="100" cy="150" rx="40" ry="28" fill="#F5DEB3" />

      {/* Left Arm */}
      <ellipse cx="48" cy="135" rx="15" ry="22" fill="url(#capyBodyGradient)" transform="rotate(-10 48 135)" />

      {/* Right Arm waving */}
      <motion.g
        animate={{ rotate: [0, 20, 0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "152px 125px" }}
      >
        <ellipse cx="152" cy="125" rx="15" ry="22" fill="url(#capyBodyGradient)" transform="rotate(15 152 125)" />
      </motion.g>

      {/* Head - Capybara's signature rectangular shape */}
      <rect x="55" y="30" rx="30" ry="30" width="90" height="75" fill="url(#capyHeadGradient)" />

      {/* Small Ears */}
      <ellipse cx="60" cy="35" rx="12" ry="10" fill="url(#capyHeadGradient)" />
      <ellipse cx="60" cy="35" rx="7" ry="5" fill="#D4A574" />
      <ellipse cx="140" cy="35" rx="12" ry="10" fill="url(#capyHeadGradient)" />
      <ellipse cx="140" cy="35" rx="7" ry="5" fill="#D4A574" />

      {/* Snout - Capybara's big nose area */}
      <ellipse cx="100" cy="82" rx="28" ry="20" fill="#D4A574" />

      {/* Eyes - with blink animation */}
      {isBlinking ? (
        <>
          <path d="M75 55 Q80 58 85 55" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M115 55 Q120 58 125 55" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="80" cy="55" r="8" fill="#1E293B" />
          <circle cx="82" cy="53" r="3" fill="white" />
          <circle cx="120" cy="55" r="8" fill="#1E293B" />
          <circle cx="122" cy="53" r="3" fill="white" />
        </>
      )}

      {/* Blush */}
      <ellipse cx="65" cy="68" rx="10" ry="5" fill="#FFB7C5" opacity="0.5" />
      <ellipse cx="135" cy="68" rx="10" ry="5" fill="#FFB7C5" opacity="0.5" />

      {/* Big Capybara Nose */}
      <ellipse cx="100" cy="78" rx="12" ry="8" fill="#1E293B" />
      <ellipse cx="97" cy="76" rx="4" ry="2" fill="white" opacity="0.4" />

      {/* Nostrils */}
      <circle cx="95" cy="80" r="2" fill="#0B1120" />
      <circle cx="105" cy="80" r="2" fill="#0B1120" />

      {/* Happy Smile */}
      <path d="M85 92 Q100 102 115 92" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Whiskers */}
      <g opacity="0.4">
        <line x1="70" y1="78" x2="50" y2="75" stroke="#1E293B" strokeWidth="1" />
        <line x1="70" y1="82" x2="50" y2="85" stroke="#1E293B" strokeWidth="1" />
        <line x1="130" y1="78" x2="150" y2="75" stroke="#1E293B" strokeWidth="1" />
        <line x1="130" y1="82" x2="150" y2="85" stroke="#1E293B" strokeWidth="1" />
      </g>

      {/* Sui Drop on head - glowing */}
      <motion.g
        animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path d="M100 15 C100 15 88 27 88 35 C88 41 93 46 100 46 C107 46 112 41 112 35 C112 27 100 15 100 15Z" fill="#4CC9F0" />
        <path d="M96 28 C96 28 92 31 92 34 C92 36 94 38 96 38" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      </motion.g>

      {/* Feet */}
      <ellipse cx="70" cy="178" rx="18" ry="8" fill="url(#capyBodyGradient)" />
      <ellipse cx="130" cy="178" rx="18" ry="8" fill="url(#capyBodyGradient)" />

      {/* Sparkles around */}
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
      >
        <path d="M25 55 L28 50 L31 55 L28 60 Z" fill="#FFD700" />
      </motion.g>
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        <path d="M175 45 L178 40 L181 45 L178 50 Z" fill="#FFD700" />
      </motion.g>
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <path d="M165 110 L168 105 L171 110 L168 115 Z" fill="#4CC9F0" />
      </motion.g>

      {/* Heart floating */}
      <motion.g
        animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <path d="M170 70 C170 65 175 60 180 65 C185 60 190 65 190 70 C190 78 180 85 180 85 C180 85 170 78 170 70Z" fill="#FF6B9D" />
      </motion.g>

      <defs>
        <linearGradient id="capyBodyGradient" x1="40" y1="95" x2="160" y2="185" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B8860B" />
          <stop offset="0.5" stopColor="#CD853F" />
          <stop offset="1" stopColor="#8B7355" />
        </linearGradient>
        <linearGradient id="capyHeadGradient" x1="55" y1="30" x2="145" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CD853F" />
          <stop offset="1" stopColor="#A0522D" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

// Animated text that appears word by word
const AnimatedTitle: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Featured courses data
const featuredCourses = [
  {
    id: 1,
    title: "Lập trình Move cơ bản",
    description: "Học ngôn ngữ lập trình Move từ đầu, xây dựng smart contract đầu tiên.",
    lessons: 12,
    duration: "6 giờ",
    level: "Cơ bản",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    badge: "🆕 Mới",
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: 2,
    title: "DeFi trên Sui Network",
    description: "Khám phá thế giới DeFi, từ AMM đến Lending Protocol.",
    lessons: 15,
    duration: "8 giờ",
    level: "Trung cấp",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop",
    badge: "🔥 Hot",
    color: "from-orange-400 to-rose-500",
  },
  {
    id: 3,
    title: "NFT & Digital Assets",
    description: "Tạo và quản lý NFT, xây dựng marketplace và collection.",
    lessons: 10,
    duration: "5 giờ",
    level: "Cơ bản",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=250&fit=crop",
    badge: "⭐ Phổ biến",
    color: "from-purple-400 to-pink-500",
  },
];

// Stats data
const stats = [
  { value: "10K+", label: "Học viên", icon: Users, color: "from-blue-400 to-cyan-400" },
  { value: "50+", label: "Khóa học", icon: BookOpen, color: "from-purple-400 to-pink-400" },
  { value: "100%", label: "On-chain", icon: Shield, color: "from-emerald-400 to-teal-400" },
];

// Benefits data
const benefits = [
  {
    icon: GraduationCap,
    title: "Học từ chuyên gia",
    description: "Khóa học được thiết kế bởi những chuyên gia hàng đầu trong hệ sinh thái Sui.",
    emoji: "👨‍🏫",
  },
  {
    icon: Code,
    title: "Thực hành thực tế",
    description: "Bài tập và dự án thực tế giúp bạn áp dụng kiến thức ngay lập tức.",
    emoji: "💻",
  },
  {
    icon: Award,
    title: "Chứng chỉ NFT",
    description: "Nhận chứng chỉ NFT được xác thực trên blockchain Sui khi hoàn thành.",
    emoji: "🏆",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-3xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left: Text Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Nền tảng #1 về Sui Blockchain
                </span>
                <Rocket className="w-4 h-4 text-blue-500" />
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6"
              >
                <AnimatedTitle text="Làm chủ hệ sinh thái" />
                <span className="block mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                  Sui Network
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-8"
              >
                Học lập trình Move, xây dựng dApp, và nhận chứng chỉ NFT xác thực on-chain. 
                Bắt đầu hành trình Web3 của bạn ngay hôm nay! 🚀
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              >
                <Link to="/courses">
                  <motion.button
                    className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">Bắt đầu học miễn phí</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <motion.a
                  href="#"
                  className="flex items-center space-x-2 px-6 py-4 text-slate-700 dark:text-slate-300 font-bold rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5 text-blue-500" />
                  <span>Xem giới thiệu</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: Capybara Mascot */}
            <motion.div
              className="flex-shrink-0 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Mascot with built-in floating animation */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="cursor-pointer"
              >
                <SuiCapybaraMascot className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96" />
              </motion.div>
              
              {/* Floating badges around mascot */}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl shadow-lg"
                animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-lg">⭐ 4.9</span>
              </motion.div>
              <motion.div
                className="absolute bottom-20 -left-8 px-3 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl shadow-lg"
                animate={{ y: [5, -5, 5], rotate: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-lg">🎮 Gamified</span>
              </motion.div>
              <motion.div
                className="absolute top-1/2 -right-10 px-3 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl shadow-lg"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-lg">🏆 NFT Cert</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-800/50 shadow-lg border border-slate-100 dark:border-slate-700/50"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 10 }}
                >
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Khóa học <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">nổi bật</span> ✨
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Các khóa học được yêu thích nhất, giúp bạn nhanh chóng thành thạo blockchain!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                className="group bg-white dark:bg-slate-800/50 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700/50 hover:shadow-2xl transition-all"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-sm font-bold">
                    {course.badge}
                  </span>
                  <span className={`absolute bottom-4 left-4 px-3 py-1.5 bg-gradient-to-r ${course.color} text-white text-xs font-bold rounded-full`}>
                    {course.level}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} bài</span>
                    </span>
                    <span>{course.duration}</span>
                  </div>

                  <Link to={`/learn/${course.id}`}>
                    <motion.button
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl group/btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Vào học ngay</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center mt-10">
            <Link to="/courses">
              <motion.span
                className="inline-flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 font-bold text-lg"
                whileHover={{ x: 5 }}
              >
                <span>Xem tất cả khóa học</span>
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500/30 blur-3xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-purple-500/30 blur-3xl"
            animate={{ scale: [1.3, 1, 1.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Tại sao chọn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sui Academy</span>? 🤔
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Chúng tôi mang đến trải nghiệm học tập tốt nhất cho hành trình Web3 của bạn!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all group"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{benefit.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative p-10 sm:p-16 rounded-[2rem] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
            {/* Animated shapes */}
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/20 blur-xl"
              animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-xl"
              animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative text-center">
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Trophy className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-bold">Tham gia 10.000+ học viên</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Sẵn sàng bắt đầu? 🚀
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Đăng ký miễn phí và bắt đầu hành trình chinh phục blockchain ngay hôm nay!
              </p>

              <Link to="/courses">
                <motion.button
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Bắt đầu học ngay</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;