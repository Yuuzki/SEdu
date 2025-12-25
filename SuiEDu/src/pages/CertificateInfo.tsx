import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  CheckCircle,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Trophy,
  Zap,
  ArrowRight,
} from "lucide-react";
import {
  HeroCapybara,
  AnimatedCapybaraWaving,
  AnimatedCapybaraStudying,
  AnimatedCapybaraExam,
  AnimatedCapybaraGraduate,
} from "../components/CapybaraMascot";

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

// Sparkles Component
const SparklesEffect: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
            scale: 0 
          }}
          animate={{
            y: [null, Math.random() * -100 - 20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// 3D Certificate Preview Component
const CertificatePreview: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = -(e.clientX - rect.left - rect.width / 2) / 20;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div className="relative perspective-[1000px] py-12">
      <motion.div
        className="relative mx-auto w-full max-w-3xl cursor-pointer"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Neon Glow Effect */}
        {isHovered && (
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50 rounded-3xl blur-2xl opacity-75 animate-pulse" />
        )}

        {/* Sparkles Effect */}
        <SparklesEffect active={isHovered} />

        {/* Certificate Card */}
        <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-2 border-cyan-200/50 dark:border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl aspect-[1.6/1]">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <SuiLogo className="w-full h-full text-cyan-600 dark:text-cyan-400 rotate-[-15deg]" />
          </div>

          {/* Border Frame */}
          <div className="absolute inset-6 border-2 border-cyan-100 dark:border-cyan-800 rounded-xl" />

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <SuiLogo className="text-white w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic">
                    Sui Academy
                  </h2>
                  <p className="text-[10px] font-mono tracking-widest font-bold text-cyan-600 dark:text-cyan-400">
                    BLOCKCHAIN VERIFIED NFT
                  </p>
                </div>
              </div>
              <Award className="text-amber-400 w-12 h-12" />
            </div>

            {/* Main Content */}
            <div className="text-center space-y-3">
              <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold">
                Certificate of Completion
              </p>
              <h1
                className="text-4xl md:text-6xl text-slate-900 dark:text-white"
                style={{
                  fontFamily: '"Playfair Display", "Noto Serif", serif',
                  fontWeight: 600,
                  fontStyle: "italic",
                }}
              >
                Your Name Here
              </h1>
              <div className="h-px w-48 bg-gradient-to-r from-transparent via-cyan-300 to-transparent mx-auto" />
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                Has successfully completed
              </p>
              <p className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800">
                Fullstack Web3 & Sui Move Development
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end text-xs text-slate-500 dark:text-slate-400">
              <div>
                <p className="font-bold">Issue Date</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-px bg-slate-300 dark:bg-slate-600 mb-1" />
                <p className="text-[10px]">Instructor Signature</p>
              </div>
              <div className="text-right">
                <p className="font-bold">Certificate ID</p>
                <p className="font-mono">NFT-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CertificateInfo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  const getMascotComponent = (type: string) => {
    switch (type) {
      case "waving":
        return <AnimatedCapybaraWaving className="w-40 h-40" />;
      case "studying":
        return <AnimatedCapybaraStudying className="w-40 h-40" />;
      case "exam":
        return <AnimatedCapybaraExam className="w-40 h-40" />;
      case "graduate":
        return <AnimatedCapybaraGraduate className="w-40 h-40" />;
      default:
        return <AnimatedCapybaraWaving className="w-40 h-40" />;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-cyan-50/30 via-blue-50/20 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" style={{ fontFamily: 'Quicksand, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-3xl"
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"
            animate={{
              y: [0, -50, 0],
              x: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Chứng chỉ NFT
              <br />
              Dấu ấn sự nghiệp Web3 của bạn
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Sở hữu một tài sản số vĩnh viễn, minh bạch và có thể xác thực trên mạng lưới{" "}
              <span className="font-bold text-cyan-600 dark:text-cyan-400">Sui Network</span>.
              Khẳng định năng lực của bạn với công nghệ blockchain tiên tiến nhất.
            </p>
          </motion.div>

          {/* Floating Capybara Mascot */}
          <div className="relative inline-block mb-12">
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-2xl" />
              <HeroCapybara className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 3D Certificate Preview Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Xem trước chứng chỉ của bạn
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Di chuột để khám phá hiệu ứng 3D độc đáo
            </p>
          </motion.div>

          <CertificatePreview />
        </div>
      </section>

      {/* Why NFT Certificates Section */}
      <section className="py-16 px-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Tại sao chọn chứng chỉ NFT?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-3xl mx-auto">
              Khám phá những lợi ích vượt trội mà công nghệ blockchain mang lại
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                    style={{ background: `linear-gradient(to bottom right, ${benefit.color})` }}
                  />
                  
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-300 h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              4 Bước sở hữu chứng chỉ
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Hành trình đơn giản để trở thành chuyên gia Web3
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform -translate-x-1/2 hidden md:block" />

            {/* Steps */}
            <div className="space-y-12">
              {roadmapSteps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col gap-8`}
                  >
                    {/* Content Card */}
                    <div className="flex-1 w-full md:w-auto">
                      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-cyan-200 dark:border-cyan-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
                              BƯỚC {step.step}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Circle */}
                    <div className="relative hidden md:flex w-16 h-16 items-center justify-center flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full animate-pulse" />
                      <div className="relative w-12 h-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center font-bold text-cyan-600 dark:text-cyan-400 text-xl border-4 border-cyan-500">
                        {step.step}
                      </div>
                    </div>

                    {/* Capybara Mascot */}
                    <div className="flex-1 w-full md:w-auto flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-xl" />
                        <div className="relative z-10">
                          {getMascotComponent(step.mascot)}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <h2 className="relative text-4xl md:text-6xl font-black text-slate-900 dark:text-white">
              Sẵn sàng bắt đầu chưa?
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Hãy tham gia cùng hàng nghìn học viên đã nhận được chứng chỉ NFT và mở ra cơ hội nghề nghiệp trong lĩnh vực Web3
          </p>

          <Link to="/courses">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-5 text-xl font-black text-white rounded-full overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
                boxShadow: "0 20px 40px rgba(6, 182, 212, 0.4), 0 0 0 0 rgba(6, 182, 212, 0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                Bắt đầu học ngay để nhận NFT
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Miễn phí đăng ký</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Chứng chỉ vĩnh viễn</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Hỗ trợ 24/7</span>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default CertificateInfo;
