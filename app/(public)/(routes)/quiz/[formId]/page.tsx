"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { sanitizeId } from "@/lib/utils";
import { QuizData } from "@/convex/ai";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Cover } from "@/components/cover";
import { ShieldCheck } from "lucide-react";

const QuizPage = () => {
  const params = useParams();
  const router = useRouter();
  const safeId = sanitizeId(params.formId) as Id<"forms"> | undefined;

  // State
  const [step, setStep] = useState<"details" | "loading" | "quiz" | "finished">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Convex Hooks
  const document = useQuery(api.forms.getById, safeId ? { documentId: safeId } : "skip");
  const generateQuiz = useAction(api.ai.generateQuiz);
  const saveQuizResponse = useMutation(api.forms.saveQuizResponse);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please enter your name and email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!document || !document.content || document.content.trim() === "") {
      toast.error("This note has no content to generate a quiz from.");
      return;
    }
    
    setStep("loading");
    const promise = generateQuiz({ content: document.content });

    toast.promise(promise, {
      loading: "Generating your quiz...",
      success: (data) => {
        setQuizData(data);
        setStep("quiz");
        return "Quiz ready! Good luck.";
      },
      error: (err) => {
        setStep("details");
        return `Error: ${err.message || "Failed to generate quiz."}`;
      },
    });
  };

  const handleAnswerClick = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    const q = quizData!.questions[currentQuestion];
    if (index === q.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const handleNext = async () => {
    if (currentQuestion < quizData!.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // End of quiz
      setStep("finished");
      const total = quizData!.questions.length;
      
      try {
        // Save the response
        await saveQuizResponse({
          formId: safeId!,
          name,
          email,
          score,
          total,
        });
        
        toast.success(`Quiz complete! You scored ${score} out of ${total}.`);
        
        // Redirect to preview mode after a short delay to show completion message
        setTimeout(() => {
          router.push(`/preview/${safeId}`);
        }, 2000);
      } catch (error) {
        toast.error("Failed to save your response. Please try again.");
        console.error("Error saving quiz response:", error);
        setStep("quiz"); // Go back to quiz if save fails
      }
    }
  };

  // Loading Skeleton
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-6 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  // Main Render
  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />

      <div className="md:max-w-2xl lg:md-max-w-3xl mx-auto p-4 mt-10">
        
        {/* === STEP 1: DETAILS FORM === */}
        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <h1 className="text-3xl font-bold">Take the Quiz</h1>
            <p className="text-muted-foreground">
              Please enter your details to start the quiz for &quot;{document.title}&quot;.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <Button type="submit" className="w-full">
              Start Quiz
            </Button>
          </form>
        )}

        {/* === STEP 2: LOADING === */}
        {step === "loading" && (
          <div className="flex flex-col items-center justify-center p-6 min-h-[300px]">
            <Spinner size="lg" />
            <p className="text-muted-foreground mt-4">Generating your quiz...</p>
          </div>
        )}

        {/* === STEP 3: QUIZ === */}
        {step === "quiz" && quizData?.questions[currentQuestion] && (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </div>
            <p className="text-xl font-medium">
              {quizData.questions[currentQuestion].question}
            </p>
            <div className="flex flex-col space-y-2">
              {quizData.questions[currentQuestion].options.map((option, index) => {
                const isCorrect = index === quizData.questions[currentQuestion].correctAnswer;
                const isSelected = selectedAnswer === index;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left h-auto py-3",
                      "hover:bg-sky-500/10 hover:border-sky-500",
                      showResult && isCorrect && "bg-green-500/20 border-green-500 hover:bg-green-500/20 hover:border-green-500",
                      showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500 hover:bg-red-500/20 hover:border-red-500"
                    )}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showResult}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
            {showResult && (
              <Button onClick={handleNext} className="w-full">
                {currentQuestion === quizData.questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </Button>
            )}
          </div>
        )}

        {/* === STEP 4: FINISHED === */}
        {step === "finished" && (
          <div className="flex flex-col items-center justify-center p-6 min-h-[300px] text-center">
            <ShieldCheck className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-lg">
              Thank you, {name}. Your score was {score} / {quizData?.questions.length}.
            </p>
            <p className="text-muted-foreground mt-2">Your results have been submitted to the note owner.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuizPage;

