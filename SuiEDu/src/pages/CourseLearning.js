import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlayCircle, CheckCircle2, Lock, ChevronLeft, ChevronRight, BookOpen, Clock, Award, AlertCircle, RotateCcw, Sparkles, Trophy, } from "lucide-react";
// Sample course data
const sampleCourse = {
    id: 1,
    title: "Lập trình Move cơ bản",
    instructor: "Nguyễn Văn A",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    lessons: [
        {
            id: 1,
            title: "Giới thiệu về Move Language",
            duration: "15:30",
            type: "video",
            videoUrl: "https://aggregator.walrus-testnet.walrus.space/v1/blobs/uVkbVuqGm9L-IrepUbwYvLmWRe1h6GJqGuD7NS1FQOY",
            completed: false,
            locked: false,
        },
        {
            id: 2,
            title: "Cài đặt môi trường phát triển",
            duration: "20:45",
            type: "video",
            videoUrl: "https://aggregator.walrus-testnet.walrus.space/v1/blobs/uVkbVuqGm9L-IrepUbwYvLmWRe1h6GJqGuD7NS1FQOY",
            completed: false,
            locked: false,
        },
        {
            id: 3,
            title: "Cấu trúc Module trong Move",
            duration: "25:00",
            type: "video",
            videoUrl: "https://aggregator.walrus-testnet.walrus.space/v1/blobs/uVkbVuqGm9L-IrepUbwYvLmWRe1h6GJqGuD7NS1FQOY",
            completed: false,
            locked: false,
        },
        {
            id: 4,
            title: "Kiểu dữ liệu và biến",
            duration: "18:20",
            type: "video",
            videoUrl: "https://aggregator.walrus-testnet.walrus.space/v1/blobs/uVkbVuqGm9L-IrepUbwYvLmWRe1h6GJqGuD7NS1FQOY",
            completed: false,
            locked: false,
        },
        {
            id: 5,
            title: "Functions và Visibility",
            duration: "22:15",
            type: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            completed: false,
            locked: false,
        },
        {
            id: 6,
            title: "Video Giới Thiệu Dự Án",
            duration: "03:20",
            type: "video",
            videoUrl: "https://aggregator.walrus-testnet.walrus.space/v1/blobs/uVkbVuqGm9L-IrepUbwYvLmWRe1h6GJqGuD7NS1FQOY",
            completed: false,
            locked: false,
        },
        {
            id: 7,
            title: "Kiểm tra cuối khóa",
            duration: "30:00",
            type: "quiz",
            completed: false,
            locked: true,
        },
    ],
    quiz: [
        {
            id: 1,
            question: "Move là ngôn ngữ lập trình được phát triển bởi?",
            options: ["Google", "Facebook (Meta)", "Microsoft", "Apple"],
            correctAnswer: 1,
        },
        {
            id: 2,
            question: "Sui Network sử dụng cơ chế đồng thuận nào?",
            options: ["Proof of Work", "Proof of Stake", "Narwhal & Bullshark", "Delegated PoS"],
            correctAnswer: 2,
        },
        {
            id: 3,
            question: "Trong Move, 'abilities' KHÔNG bao gồm?",
            options: ["copy", "drop", "store", "transfer"],
            correctAnswer: 3,
        },
        {
            id: 4,
            question: "Object Model trong Sui có đặc điểm gì?",
            options: [
                "Tất cả objects đều shared",
                "Objects có thể owned hoặc shared",
                "Chỉ hỗ trợ NFTs",
                "Không hỗ trợ composability",
            ],
            correctAnswer: 1,
        },
        {
            id: 5,
            question: "Gas trong Sui được tính bằng đơn vị nào?",
            options: ["ETH", "SUI", "MIST", "GAS"],
            correctAnswer: 2,
        },
    ],
};
const CourseLearning = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    // States
    const [course, setCourse] = useState(sampleCourse);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [studentName, setStudentName] = useState("Học viên Sui Academy");
    // Quiz states
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizPassed, setQuizPassed] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const currentLesson = course.lessons[currentLessonIndex];
    const videoLessons = course.lessons.filter((l) => l.type === "video");
    const allVideosCompleted = videoLessons.every((l) => l.completed);
    const totalLessons = course.lessons.length;
    const completedLessons = course.lessons.filter((l) => l.completed).length;
    const progressPercent = Math.round((completedLessons / totalLessons) * 100);
    // Update quiz lock status when videos are completed
    useEffect(() => {
        setCourse((prev) => ({
            ...prev,
            lessons: prev.lessons.map((lesson) => lesson.type === "quiz" ? { ...lesson, locked: !allVideosCompleted } : lesson),
        }));
    }, [allVideosCompleted]);
    // Handle completing a video lesson
    const handleCompleteLesson = () => {
        setCourse((prev) => ({
            ...prev,
            lessons: prev.lessons.map((lesson, idx) => idx === currentLessonIndex ? { ...lesson, completed: true } : lesson),
        }));
        // Move to next lesson if available
        if (currentLessonIndex < course.lessons.length - 1) {
            const nextLesson = course.lessons[currentLessonIndex + 1];
            if (!nextLesson.locked) {
                setCurrentLessonIndex(currentLessonIndex + 1);
            }
        }
    };
    // Handle selecting a lesson
    const handleSelectLesson = (index) => {
        const lesson = course.lessons[index];
        if (!lesson.locked) {
            setCurrentLessonIndex(index);
            setQuizSubmitted(false);
            setShowResult(false);
            setQuizAnswers({});
        }
    };
    // Handle quiz answer selection
    const handleAnswerSelect = (questionId, answerIndex) => {
        if (!quizSubmitted) {
            setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
        }
    };
    // Handle quiz submission
    const handleSubmitQuiz = () => {
        const correctCount = course.quiz.reduce((count, question) => {
            return quizAnswers[question.id] === question.correctAnswer ? count + 1 : count;
        }, 0);
        const passed = correctCount === course.quiz.length; // 100% correct required
        setQuizPassed(passed);
        setQuizSubmitted(true);
        setShowResult(true);
        if (passed) {
            setCourse((prev) => ({
                ...prev,
                lessons: prev.lessons.map((lesson) => lesson.type === "quiz" ? { ...lesson, completed: true } : lesson),
            }));
        }
    };
    // Handle retry quiz
    const handleRetryQuiz = () => {
        setQuizAnswers({});
        setQuizSubmitted(false);
        setShowResult(false);
        setQuizPassed(false);
    };
    // Handle claim certificate
    const handleClaimCertificate = () => {
        navigate("/certificate", {
            state: {
                studentName,
                courseName: course.title,
                courseId: course.id,
                completionDate: new Date().toISOString(),
            },
        });
    };
    // Render lesson icon based on status
    const renderLessonIcon = (lesson, index) => {
        if (lesson.completed) {
            return _jsx(CheckCircle2, { className: "w-5 h-5 text-emerald-500" });
        }
        if (lesson.locked) {
            return _jsx(Lock, { className: "w-5 h-5 text-slate-400" });
        }
        if (lesson.type === "quiz") {
            return _jsx(Award, { className: "w-5 h-5 text-amber-500" });
        }
        return _jsx(PlayCircle, { className: "w-5 h-5 text-cyan-500" });
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20", children: [_jsx("div", { className: "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-6", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("button", { onClick: () => navigate("/courses"), className: "p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors", children: _jsx(ChevronLeft, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold", children: course.title }), _jsxs("p", { className: "text-sm text-slate-300", children: ["Gi\u1EA3ng vi\u00EAn: ", course.instructor] })] })] }), _jsxs("div", { className: "hidden md:flex items-center space-x-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(BookOpen, { className: "w-5 h-5 text-cyan-400" }), _jsxs("span", { className: "text-sm", children: [completedLessons, "/", totalLessons, " b\u00E0i h\u1ECDc"] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-32 h-2 bg-slate-700 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500", style: { width: `${progressPercent}%` } }) }), _jsxs("span", { className: "text-sm font-semibold", children: [progressPercent, "%"] })] })] })] }) }) }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-8", children: _jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [_jsx("div", { className: "lg:w-80 flex-shrink-0", children: _jsxs("div", { className: "sticky top-24", children: [_jsxs("div", { className: "bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden", children: [_jsx("div", { className: "p-4 border-b border-slate-100 bg-gradient-to-r from-cyan-500/10 to-blue-500/10", children: _jsxs("h3", { className: "font-bold text-slate-900 flex items-center space-x-2", children: [_jsx(BookOpen, { className: "w-5 h-5 text-cyan-600" }), _jsx("span", { children: "N\u1ED9i dung kh\u00F3a h\u1ECDc" })] }) }), _jsx("div", { className: "max-h-[60vh] overflow-y-auto", children: course.lessons.map((lesson, index) => (_jsxs("button", { onClick: () => handleSelectLesson(index), disabled: lesson.locked, className: `w-full p-4 flex items-start space-x-3 text-left transition-all border-b border-slate-100 last:border-b-0 ${currentLessonIndex === index
                                                        ? "bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-l-cyan-500"
                                                        : lesson.locked
                                                            ? "opacity-50 cursor-not-allowed bg-slate-50"
                                                            : "hover:bg-slate-50"}`, children: [_jsx("div", { className: "flex-shrink-0 mt-0.5", children: renderLessonIcon(lesson, index) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("p", { className: `text-sm font-medium truncate ${lesson.completed
                                                                        ? "text-emerald-700"
                                                                        : lesson.locked
                                                                            ? "text-slate-400"
                                                                            : "text-slate-900"}`, children: [index + 1, ". ", lesson.title] }), _jsxs("div", { className: "flex items-center space-x-2 mt-1", children: [_jsx(Clock, { className: "w-3 h-3 text-slate-400" }), _jsx("span", { className: "text-xs text-slate-500", children: lesson.duration }), lesson.type === "quiz" && (_jsx("span", { className: "text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium", children: "Ki\u1EC3m tra" }))] })] })] }, lesson.id))) })] }), _jsxs("div", { className: "mt-4 p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl text-white", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-sm font-medium opacity-90", children: "Ti\u1EBFn \u0111\u1ED9 h\u1ECDc t\u1EADp" }), _jsxs("span", { className: "text-2xl font-black", children: [progressPercent, "%"] })] }), _jsx("div", { className: "w-full h-2 bg-white/30 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-white transition-all duration-500", style: { width: `${progressPercent}%` } }) }), allVideosCompleted && !quizPassed && (_jsxs("p", { className: "text-xs mt-3 opacity-90 flex items-center space-x-1", children: [_jsx(Sparkles, { className: "w-3 h-3" }), _jsx("span", { children: "Ho\u00E0n th\u00E0nh b\u00E0i ki\u1EC3m tra \u0111\u1EC3 nh\u1EADn ch\u1EE9ng ch\u1EC9!" })] }))] })] }) }), _jsx("div", { className: "flex-1 min-w-0", children: currentLesson.type === "video" ? (
                            /* Video Player Section */
                            _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl aspect-video", children: currentLesson.videoUrl && (/\.mp4$|\.webm$|walrus|aggregator/).test(currentLesson.videoUrl) ? (_jsx("video", { src: currentLesson.videoUrl, title: currentLesson.title, className: "w-full h-full object-cover", controls: true })) : (_jsx("iframe", { src: currentLesson.videoUrl, title: currentLesson.title, className: "absolute inset-0 w-full h-full", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true })) }), _jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-6 shadow-lg", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 mb-2", children: currentLesson.title }), _jsxs("div", { className: "flex items-center space-x-4 text-sm text-slate-500 mb-6", children: [_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsx("span", { children: currentLesson.duration })] }), _jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(BookOpen, { className: "w-4 h-4" }), _jsxs("span", { children: ["B\u00E0i ", currentLessonIndex + 1, "/", totalLessons] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("button", { onClick: () => currentLessonIndex > 0 && handleSelectLesson(currentLessonIndex - 1), disabled: currentLessonIndex === 0, className: "flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: [_jsx(ChevronLeft, { className: "w-5 h-5" }), _jsx("span", { children: "B\u00E0i tr\u01B0\u1EDBc" })] }), !currentLesson.completed ? (_jsxs("button", { onClick: handleCompleteLesson, className: "flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-200 hover:shadow-xl hover:shadow-cyan-300 transition-all active:scale-[0.98]", children: [_jsx(CheckCircle2, { className: "w-5 h-5" }), _jsx("span", { children: "Ho\u00E0n th\u00E0nh b\u00E0i h\u1ECDc" })] })) : (_jsxs("div", { className: "flex items-center space-x-2 px-6 py-3 bg-emerald-100 text-emerald-700 font-bold rounded-xl", children: [_jsx(CheckCircle2, { className: "w-5 h-5" }), _jsx("span", { children: "\u0110\u00E3 ho\u00E0n th\u00E0nh" })] })), _jsxs("button", { onClick: () => {
                                                            const nextLesson = course.lessons[currentLessonIndex + 1];
                                                            if (nextLesson && !nextLesson.locked) {
                                                                handleSelectLesson(currentLessonIndex + 1);
                                                            }
                                                        }, disabled: currentLessonIndex === totalLessons - 1 ||
                                                            course.lessons[currentLessonIndex + 1]?.locked, className: "flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: [_jsx("span", { children: "B\u00E0i ti\u1EBFp" }), _jsx(ChevronRight, { className: "w-5 h-5" })] })] })] })] })) : (
                            /* Quiz Section */
                            _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx(Award, { className: "w-8 h-8" }), _jsx("h2", { className: "text-2xl font-bold", children: "Ki\u1EC3m tra cu\u1ED1i kh\u00F3a" })] }), _jsx("p", { className: "text-amber-100", children: "Tr\u1EA3 l\u1EDDi \u0111\u00FAng t\u1EA5t c\u1EA3 c\u00E1c c\u00E2u h\u1ECFi \u0111\u1EC3 nh\u1EADn ch\u1EE9ng ch\u1EC9 NFT tr\u00EAn Sui Network" })] }), showResult && (_jsx("div", { className: `p-6 rounded-2xl border-2 ${quizPassed
                                            ? "bg-emerald-50 border-emerald-200"
                                            : "bg-red-50 border-red-200"}`, children: _jsxs("div", { className: "flex items-start space-x-4", children: [quizPassed ? (_jsx("div", { className: "flex-shrink-0 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center", children: _jsx(Trophy, { className: "w-8 h-8 text-white" }) })) : (_jsx("div", { className: "flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center", children: _jsx(AlertCircle, { className: "w-8 h-8 text-white" }) })), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: `text-xl font-bold ${quizPassed ? "text-emerald-800" : "text-red-800"}`, children: quizPassed ? "Chúc mừng! 🎉" : "Chưa đạt yêu cầu" }), _jsx("p", { className: quizPassed ? "text-emerald-700" : "text-red-700", children: quizPassed
                                                                ? `Bạn đã trả lời đúng tất cả ${course.quiz.length} câu hỏi. Hãy nhận chứng chỉ NFT của bạn!`
                                                                : `Bạn cần trả lời đúng tất cả câu hỏi để đạt yêu cầu. Hãy thử lại!` }), _jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: quizPassed ? (_jsxs("button", { onClick: handleClaimCertificate, className: "flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]", children: [_jsx(Award, { className: "w-5 h-5" }), _jsx("span", { children: "Nh\u1EADn Ch\u1EE9ng Ch\u1EC9 NFT" })] })) : (_jsxs("button", { onClick: handleRetryQuiz, className: "flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]", children: [_jsx(RotateCcw, { className: "w-5 h-5" }), _jsx("span", { children: "L\u00E0m l\u1EA1i b\u00E0i ki\u1EC3m tra" })] })) })] })] }) })), !showResult && (_jsxs("div", { className: "space-y-6", children: [course.quiz.map((question, qIndex) => (_jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl p-6 shadow-lg", children: [_jsxs("h3", { className: "text-lg font-bold text-slate-900 mb-4", children: [_jsx("span", { className: "inline-flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold mr-3", children: qIndex + 1 }), question.question] }), _jsx("div", { className: "space-y-3", children: question.options.map((option, oIndex) => (_jsx("button", { onClick: () => handleAnswerSelect(question.id, oIndex), className: `w-full p-4 text-left rounded-xl border-2 transition-all ${quizAnswers[question.id] === oIndex
                                                                ? "border-cyan-500 bg-cyan-50 text-cyan-900"
                                                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`, children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-6 h-6 rounded-full border-2 flex items-center justify-center ${quizAnswers[question.id] === oIndex
                                                                            ? "border-cyan-500 bg-cyan-500"
                                                                            : "border-slate-300"}`, children: quizAnswers[question.id] === oIndex && (_jsx(CheckCircle2, { className: "w-4 h-4 text-white" })) }), _jsx("span", { className: "font-medium", children: option })] }) }, oIndex))) })] }, question.id))), _jsx("div", { className: "flex justify-center", children: _jsxs("button", { onClick: handleSubmitQuiz, disabled: Object.keys(quizAnswers).length !== course.quiz.length, className: "flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none", children: [_jsx(CheckCircle2, { className: "w-5 h-5" }), _jsx("span", { children: "N\u1ED9p b\u00E0i ki\u1EC3m tra" })] }) }), Object.keys(quizAnswers).length !== course.quiz.length && (_jsxs("p", { className: "text-center text-sm text-slate-500", children: ["Vui l\u00F2ng tr\u1EA3 l\u1EDDi t\u1EA5t c\u1EA3 ", course.quiz.length, " c\u00E2u h\u1ECFi tr\u01B0\u1EDBc khi n\u1ED9p b\u00E0i"] }))] })), showResult && !quizPassed && (_jsxs("div", { className: "space-y-4", children: [_jsxs("h4", { className: "font-bold text-slate-900 flex items-center space-x-2", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-amber-500" }), _jsx("span", { children: "\u0110\u00E1p \u00E1n c\u1EE7a b\u1EA1n:" })] }), course.quiz.map((question, qIndex) => {
                                                const isCorrect = quizAnswers[question.id] === question.correctAnswer;
                                                return (_jsxs("div", { className: `p-4 rounded-xl border ${isCorrect
                                                        ? "bg-emerald-50 border-emerald-200"
                                                        : "bg-red-50 border-red-200"}`, children: [_jsxs("p", { className: "font-medium text-slate-900 mb-2", children: [qIndex + 1, ". ", question.question] }), _jsxs("p", { className: isCorrect ? "text-emerald-700" : "text-red-700", children: ["B\u1EA1n ch\u1ECDn: ", question.options[quizAnswers[question.id]], !isCorrect && (_jsxs("span", { className: "block text-emerald-700 mt-1", children: ["\u0110\u00E1p \u00E1n \u0111\u00FAng: ", question.options[question.correctAnswer]] }))] })] }, question.id));
                                            })] }))] })) })] }) })] }));
};
export default CourseLearning;
