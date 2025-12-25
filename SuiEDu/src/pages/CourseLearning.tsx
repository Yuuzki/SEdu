import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  Award,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";

// Types
interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "video" | "quiz";
  videoUrl?: string;
  completed: boolean;
  locked: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
}

// Sample course data
const sampleCourse: Course = {
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

const CourseLearning: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  
  // States
  const [course, setCourse] = useState<Course>(sampleCourse);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [studentName, setStudentName] = useState("Học viên Sui Academy");
  
  // Quiz states
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
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
      lessons: prev.lessons.map((lesson) =>
        lesson.type === "quiz" ? { ...lesson, locked: !allVideosCompleted } : lesson
      ),
    }));
  }, [allVideosCompleted]);

  // Handle completing a video lesson
  const handleCompleteLesson = () => {
    setCourse((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson, idx) =>
        idx === currentLessonIndex ? { ...lesson, completed: true } : lesson
      ),
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
  const handleSelectLesson = (index: number) => {
    const lesson = course.lessons[index];
    if (!lesson.locked) {
      setCurrentLessonIndex(index);
      setQuizSubmitted(false);
      setShowResult(false);
      setQuizAnswers({});
    }
  };

  // Handle quiz answer selection
  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
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
        lessons: prev.lessons.map((lesson) =>
          lesson.type === "quiz" ? { ...lesson, completed: true } : lesson
        ),
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
  const renderLessonIcon = (lesson: Lesson, index: number) => {
    if (lesson.completed) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
    if (lesson.locked) {
      return <Lock className="w-5 h-5 text-slate-400" />;
    }
    if (lesson.type === "quiz") {
      return <Award className="w-5 h-5 text-amber-500" />;
    }
    return <PlayCircle className="w-5 h-5 text-cyan-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      {/* Course Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/courses")}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-sm text-slate-300">Giảng viên: {course.instructor}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span className="text-sm">
                  {completedLessons}/{totalLessons} bài học
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{progressPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Lesson List */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              {/* Glassmorphism sidebar */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                  <h3 className="font-bold text-slate-900 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-cyan-600" />
                    <span>Nội dung khóa học</span>
                  </h3>
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                  {course.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleSelectLesson(index)}
                      disabled={lesson.locked}
                      className={`w-full p-4 flex items-start space-x-3 text-left transition-all border-b border-slate-100 last:border-b-0 ${
                        currentLessonIndex === index
                          ? "bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-l-cyan-500"
                          : lesson.locked
                          ? "opacity-50 cursor-not-allowed bg-slate-50"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {renderLessonIcon(lesson, index)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            lesson.completed
                              ? "text-emerald-700"
                              : lesson.locked
                              ? "text-slate-400"
                              : "text-slate-900"
                          }`}
                        >
                          {index + 1}. {lesson.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{lesson.duration}</span>
                          {lesson.type === "quiz" && (
                            <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                              Kiểm tra
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress card */}
              <div className="mt-4 p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium opacity-90">Tiến độ học tập</span>
                  <span className="text-2xl font-black">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {allVideosCompleted && !quizPassed && (
                  <p className="text-xs mt-3 opacity-90 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Hoàn thành bài kiểm tra để nhận chứng chỉ!</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {currentLesson.type === "video" ? (
              /* Video Player Section */
              <div className="space-y-6">
                {/* Video Container */}
                <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  {currentLesson.videoUrl && (/\.mp4$|\.webm$|walrus|aggregator/).test(currentLesson.videoUrl) ? (
                    <video
                      src={currentLesson.videoUrl}
                      title={currentLesson.title}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <iframe
                      src={currentLesson.videoUrl}
                      title={currentLesson.title}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>

                {/* Video Info & Actions */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{currentLesson.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 mb-6">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{currentLesson.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        Bài {currentLessonIndex + 1}/{totalLessons}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => currentLessonIndex > 0 && handleSelectLesson(currentLessonIndex - 1)}
                      disabled={currentLessonIndex === 0}
                      className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Bài trước</span>
                    </button>

                    {!currentLesson.completed ? (
                      <button
                        onClick={handleCompleteLesson}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-200 hover:shadow-xl hover:shadow-cyan-300 transition-all active:scale-[0.98]"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Hoàn thành bài học</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2 px-6 py-3 bg-emerald-100 text-emerald-700 font-bold rounded-xl">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Đã hoàn thành</span>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        const nextLesson = course.lessons[currentLessonIndex + 1];
                        if (nextLesson && !nextLesson.locked) {
                          handleSelectLesson(currentLessonIndex + 1);
                        }
                      }}
                      disabled={
                        currentLessonIndex === totalLessons - 1 ||
                        course.lessons[currentLessonIndex + 1]?.locked
                      }
                      className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span>Bài tiếp</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Quiz Section */
              <div className="space-y-6">
                {/* Quiz Header */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <Award className="w-8 h-8" />
                    <h2 className="text-2xl font-bold">Kiểm tra cuối khóa</h2>
                  </div>
                  <p className="text-amber-100">
                    Trả lời đúng tất cả các câu hỏi để nhận chứng chỉ NFT trên Sui Network
                  </p>
                </div>

                {/* Quiz Result */}
                {showResult && (
                  <div
                    className={`p-6 rounded-2xl border-2 ${
                      quizPassed
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      {quizPassed ? (
                        <div className="flex-shrink-0 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Trophy className="w-8 h-8 text-white" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-bold ${
                            quizPassed ? "text-emerald-800" : "text-red-800"
                          }`}
                        >
                          {quizPassed ? "Chúc mừng! 🎉" : "Chưa đạt yêu cầu"}
                        </h3>
                        <p className={quizPassed ? "text-emerald-700" : "text-red-700"}>
                          {quizPassed
                            ? `Bạn đã trả lời đúng tất cả ${course.quiz.length} câu hỏi. Hãy nhận chứng chỉ NFT của bạn!`
                            : `Bạn cần trả lời đúng tất cả câu hỏi để đạt yêu cầu. Hãy thử lại!`}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          {quizPassed ? (
                            <button
                              onClick={handleClaimCertificate}
                              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                            >
                              <Award className="w-5 h-5" />
                              <span>Nhận Chứng Chỉ NFT</span>
                            </button>
                          ) : (
                            <button
                              onClick={handleRetryQuiz}
                              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                            >
                              <RotateCcw className="w-5 h-5" />
                              <span>Làm lại bài kiểm tra</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quiz Questions */}
                {!showResult && (
                  <div className="space-y-6">
                    {course.quiz.map((question, qIndex) => (
                      <div
                        key={question.id}
                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg"
                      >
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full text-sm font-bold mr-3">
                            {qIndex + 1}
                          </span>
                          {question.question}
                        </h3>
                        <div className="space-y-3">
                          {question.options.map((option, oIndex) => (
                            <button
                              key={oIndex}
                              onClick={() => handleAnswerSelect(question.id, oIndex)}
                              className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                                quizAnswers[question.id] === oIndex
                                  ? "border-cyan-500 bg-cyan-50 text-cyan-900"
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    quizAnswers[question.id] === oIndex
                                      ? "border-cyan-500 bg-cyan-500"
                                      : "border-slate-300"
                                  }`}
                                >
                                  {quizAnswers[question.id] === oIndex && (
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  )}
                                </div>
                                <span className="font-medium">{option}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Submit Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(quizAnswers).length !== course.quiz.length}
                        className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Nộp bài kiểm tra</span>
                      </button>
                    </div>
                    {Object.keys(quizAnswers).length !== course.quiz.length && (
                      <p className="text-center text-sm text-slate-500">
                        Vui lòng trả lời tất cả {course.quiz.length} câu hỏi trước khi nộp bài
                      </p>
                    )}
                  </div>
                )}

                {/* Show answers after submission (if failed) */}
                {showResult && !quizPassed && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-900 flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      <span>Đáp án của bạn:</span>
                    </h4>
                    {course.quiz.map((question, qIndex) => {
                      const isCorrect = quizAnswers[question.id] === question.correctAnswer;
                      return (
                        <div
                          key={question.id}
                          className={`p-4 rounded-xl border ${
                            isCorrect
                              ? "bg-emerald-50 border-emerald-200"
                              : "bg-red-50 border-red-200"
                          }`}
                        >
                          <p className="font-medium text-slate-900 mb-2">
                            {qIndex + 1}. {question.question}
                          </p>
                          <p className={isCorrect ? "text-emerald-700" : "text-red-700"}>
                            Bạn chọn: {question.options[quizAnswers[question.id]]}
                            {!isCorrect && (
                              <span className="block text-emerald-700 mt-1">
                                Đáp án đúng: {question.options[question.correctAnswer]}
                              </span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
