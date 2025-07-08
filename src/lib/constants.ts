export interface Activity {
  id: string;
  title: string;
  type: 'phonics' | 'spelling' | 'comprehension' | 'reading';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  questions?: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export const ACTIVITIES: Activity[] = [
  {
    id: "phonics-1",
    title: "Beginning Sounds",
    type: "phonics",
    difficulty: "easy",
    description: "Practice identifying the beginning sounds of words.",
    questions: [
      {
        question: "What sound does 'ball' start with?",
        options: ["B", "P", "D", "T"],
        correctAnswer: "B"
      },
      {
        question: "What sound does 'cat' start with?",
        options: ["K", "C", "S", "T"],
        correctAnswer: "C"
      }
    ]
  },
  {
    id: "spelling-1",
    title: "CVC Words",
    type: "spelling",
    difficulty: "easy",
    description: "Practice spelling simple consonant-vowel-consonant words.",
    questions: [
      {
        question: "Spell the word: CAT",
        options: ["CAT", "KAT", "CET", "KET"],
        correctAnswer: "CAT"
      },
      {
        question: "Spell the word: DOG",
        options: ["DOG", "DAG", "DUG", "DOK"],
        correctAnswer: "DOG"
      }
    ]
  },
  {
    id: "reading-1",
    title: "Simple Sentences",
    type: "reading",
    difficulty: "medium",
    description: "Practice reading short and simple sentences.",
    questions: [
      {
        question: "Read: The cat sat on the mat.",
        options: ["The cat is on a mat", "The cat sat on the mat", "A cat is sitting", "The dog sat on the mat"],
        correctAnswer: "The cat sat on the mat"
      }
    ]
  },
  {
    id: "comprehension-1",
    title: "Story Time",
    type: "comprehension",
    difficulty: "hard",
    description: "Read a short story and answer questions about it.",
    questions: [
      {
        question: "The dog ran to the park. The dog played with a ball. What did the dog play with?",
        options: ["A bone", "A ball", "A toy", "A stick"],
        correctAnswer: "A ball"
      }
    ]
  }
];

export const getActivityById = (id: string): Activity | undefined => {
  return ACTIVITIES.find(activity => activity.id === id);
};

// Dummy child data
export const CHILD = {
  name: "Amara",
  level: 2,
  progress: 65, // percentage
  totalStars: 14
};