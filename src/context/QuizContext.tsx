"use client";

import React, { createContext, useContext, useState } from "react";

// Define types
export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
};

type QuizContextType = {
  questions: QuizQuestion[];
  answers: Record<number, string>;
  setAnswer: (step: number, value: string) => void;
  resetQuiz: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

// Create dummy questions
const dummyQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Does your child have difficulty learning the alphabet?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 2,
    question: "Does your child struggle to identify rhyming words?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 3,
    question: "Does your child have trouble sounding out unfamiliar words?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 4,
    question: "Does your child confuse letters that look similar (like b/d, p/q)?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 5,
    question: "Does your child read slowly compared to peers?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  }
  // {
  //   id: 6,
  //   question: "Does your child avoid reading aloud?",
  //   options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  // },
  // {
  //   id: 7,
  //   question: "Does your child have difficulty remembering what they've read?",
  //   options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  // },
  // {
  //   id: 8,
  //   question: "Does your child frequently spell the same word differently?",
  //   options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  // },
  // {
  //   id: 9,
  //   question: "Does your child struggle with organizing thoughts in writing?",
  //   options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  // },
  // {
  //   id: 10,
  //   question: "Does your child have a family history of reading difficulties?",
  //   options: ["No", "Not sure", "Yes"]
  // }
];

// Create context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const setAnswer = (step: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [step]: value
    }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(1);
  };

  return (
    <QuizContext.Provider value={{ 
      questions: dummyQuestions, 
      answers, 
      setAnswer, 
      resetQuiz,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </QuizContext.Provider>
  );
}

// Custom hook for using the quiz context
export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}