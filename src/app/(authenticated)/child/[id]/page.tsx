// filepath: d:\Readle\src\app\(authenticated)\child\[id]\page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

// Dummy data for skills - keeping this as it's not in the API
const SKILLS = [
  { name: "Phonics", progress: 85, icon: "🔤" },
  { name: "Spelling", progress: 72, icon: "✍️" },
  { name: "Reading", progress: 63, icon: "📚" },
  { name: "Comprehension", progress: 58, icon: "🧠" }
];

// Define the Child type to match MongoDB schema
interface Child {
  _id: string;
  name: string;
  age: number;
  avatar: string;
  level: number;
  progress: number;
  joinDate: string;
  completedActivities: number;
  lastActivity: {
    name: string;
    date: string;
    score: number;
  };
  interests: string[];
  notes: string;
}

export default function ChildProfilePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [child, setChild] = useState<Child | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchChildData() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/children/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Child not found");
          }
          throw new Error("Failed to fetch child data");
        }
        
        const data = await response.json();
        console.log("Fetched child data:", data);
        setChild(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching child:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchChildData();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error || !child) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Child Not Found</h1>
          <p className="mb-6">{error || "Sorry, this child profile doesn't exist."}</p>
          <Link 
            href="/children" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Back to Children
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f4ff] to-[#eef9ff] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Profile Header */}
        <div className="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="bg-white rounded-full overflow-hidden mr-0 md:mr-6 mb-4 md:mb-0 w-24 h-24 flex items-center justify-center">
                <Image
                  src={child.avatar} 
                  alt={child.name}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="text-white text-center md:text-left">
                <h1 className="text-3xl font-bold">{child.name}</h1>
                <p className="text-indigo-100">Age {child.age} • Level {child.level}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Completed Activities</p>
                <p className="text-2xl font-bold text-indigo-700">{child.completedActivities}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Overall Progress</p>
                <p className="text-2xl font-bold text-indigo-700">{child.progress}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Joined</p>
                <p className="text-2xl font-bold text-indigo-700">{child.joinDate}</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link
                href={`/progress/${child._id}`}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center"
              >
                <span>View Full Progress Report</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Skills & Last Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Skills */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Reading Skills</h2>
            <div className="space-y-6">
              {SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="flex items-center text-gray-700">
                      <span className="mr-2">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-sm font-medium text-indigo-700">{skill.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        skill.name === "Phonics" ? "bg-blue-500" :
                        skill.name === "Spelling" ? "bg-purple-500" :
                        skill.name === "Reading" ? "bg-green-500" :
                        "bg-yellow-500"
                      }`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Last Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Last Activity</h2>
            <div className="bg-indigo-50 p-4 rounded-xl mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-indigo-800">{child.lastActivity.name}</h3>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  child.lastActivity.score >= 90 ? "bg-green-100 text-green-700" :
                  child.lastActivity.score >= 70 ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  Score: {child.lastActivity.score}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Completed on {child.lastActivity.date}</p>
            </div>
            <Link
              href="#"
              className="block text-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              View All Activities
            </Link>
          </div>
        </div>
        
        {/* Interests & Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Interests */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {child.interests.map((interest) => (
                <span 
                  key={interest} 
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          {/* Notes */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notes</h2>
            <p className="text-gray-700">{child.notes}</p>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            href="/children"
            className="flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Children
          </Link>
          <Link
            href={`/progress/${child._id}`}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            Progress Report
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}