"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function QuizStartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 md:p-12"
      >
        <div className="flex flex-col items-center text-center">
          {/* Emoji illustration */}
          <div className="mb-6 bg-indigo-100 p-6 rounded-full">
            <span className="text-6xl" role="img" aria-label="Quiz emoji">📝</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">
            Start the Dyslexia Screening Quiz
          </h1>
          
          <div className="mb-10 text-gray-700">
            <p className="mb-4 text-lg">
              This quiz helps identify potential signs of dyslexia in children. 
              It takes about 5-10 minutes to complete.
            </p>
            <p className="text-lg">
              Answer each question honestly based on your observations of your child&apos;s 
              reading and learning behaviors.
            </p>
          </div>
          
          <ul className="mb-10 text-left w-full max-w-md">
            <li className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>5 simple questions</span>
            </li>
            <li className="flex items-center mb-3">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Takes 5-10 minutes</span>
            </li>
            <li className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Get immediate results</span>
            </li>
          </ul>
          
          <Link 
            href="/quiz/question/1" 
            className="px-10 py-4 w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 text-center flex items-center justify-center"
          >
            <span>Begin Quiz</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          
          <p className="mt-6 text-sm text-gray-500">
            Note: This screening tool provides an initial assessment and is not a clinical diagnosis.
          </p>
        </div>
      </motion.div>
    </div>
  );
}