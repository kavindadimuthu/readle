"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ProgressChart from '@/components/charts/ProgressChart';
import ActivityHistoryChart from '@/components/charts/ActivityHistoryChart';
import jsPDF from 'jspdf';

// Define the Child type
interface Child {
  _id: string;
  name: string;
  age: number;
  avatar: string;
  level: number;
  progress: number;
}

// Define the ProgressReport interface based on API response
interface ProgressData {
  _id: string;
  date: string;
  phonics: number;
  spelling: number;
  reading: number;
  comprehension: number;
}

interface ActivityHistory {
  _id: string;
  period: string;
  Phonics: number;
  Spelling: number;
  Reading: number;
  Comprehension: number;
}

interface WeeklyStats {
  totalActivities: number;
  totalTimeSpent: string;
  correctAnswers: number;
  skillImprovement: string;
}

interface ProgressReport {
  _id: string;
  childId: string;
  reportPeriod: string;
  progressData: ProgressData[];
  activityHistory: ActivityHistory[];
  weeklyStats: WeeklyStats;
}

export default function ProgressPage() {
  const params = useParams();
  const childId = params.childId as string;
  const reportRef = useRef<HTMLDivElement>(null);
  
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("6weeks");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for child data and progress report
  const [child, setChild] = useState<Child | null>(null);
  const [progressReport, setProgressReport] = useState<ProgressReport | null>(null);

  // Fetch child data and progress report
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        
        // Fetch child data
        const childResponse = await fetch(`/api/children/${childId}`);
        if (!childResponse.ok) {
          throw new Error(childResponse.status === 404 
            ? "Child not found" 
            : "Failed to fetch child data");
        }
        const childData = await childResponse.json();
        setChild(childData);
        
        // Fetch progress report data
        const reportResponse = await fetch(`/api/progress/${childId}`);
        if (!reportResponse.ok) {
          throw new Error(reportResponse.status === 404 
            ? "Progress report not found" 
            : "Failed to fetch progress report");
        }
        const reportData = await reportResponse.json();
        console.log("Fetched progress report:", reportData);
        setProgressReport(reportData);
        setTimeRange(reportData.reportPeriod);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [childId]);

  // Simplified export function using standard RGB colors
  const exportReport = async () => {
    if (!reportRef.current || !child) return;
    
    try {
      setIsExporting(true);
      
      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Set up PDF metadata
      const today = new Date().toLocaleDateString();
      pdf.setProperties({
        title: `${child.name}'s Progress Report - ${today}`,
        subject: 'Reading Progress Report',
        author: 'Readle Learning App',
        creator: 'Readle Learning App'
      });
      
      // Create page header
      pdf.setFontSize(22);
      pdf.setTextColor(59, 50, 133); // indigo-800
      pdf.text(`${child.name}'s Progress Report`, 20, 20);
      
      pdf.setFontSize(12);
      pdf.setTextColor(79, 70, 229); // indigo-600
      pdf.text(`Level ${child.level} • Overall Progress: ${child.progress}% • Generated on: ${today}`, 20, 30);
      
      // Skip trying to convert the entire page to an image
      // Instead, just include the key data as text
      
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Progress Summary", 20, 50);
      
      // Add basic text info
      pdf.setFontSize(12);
      pdf.text(`Child: ${child.name} (Age: ${child.age || 'N/A'})`, 20, 70);
      pdf.text(`Level: ${child.level}`, 20, 80);
      pdf.text(`Overall Progress: ${child.progress}%`, 20, 90);
      
      if (progressReport) {
        const latestProgress = progressReport.progressData[progressReport.progressData.length - 1];
        
        // Add skill breakdown as text
        pdf.text("Skill Breakdown:", 20, 110);
        pdf.text(`- Phonics: ${latestProgress.phonics}%`, 30, 120);
        pdf.text(`- Spelling: ${latestProgress.spelling}%`, 30, 130);
        pdf.text(`- Reading: ${latestProgress.reading}%`, 30, 140);
        pdf.text(`- Comprehension: ${latestProgress.comprehension}%`, 30, 150);
        
        // Add weekly stats
        pdf.text("Weekly Statistics:", 20, 170);
        pdf.text(`- Total Activities: ${progressReport.weeklyStats.totalActivities}`, 30, 180);
        pdf.text(`- Time Spent: ${progressReport.weeklyStats.totalTimeSpent}`, 30, 190);
        pdf.text(`- Correct Answers: ${progressReport.weeklyStats.correctAnswers}%`, 30, 200);
        pdf.text(`- Skill Improvement: ${progressReport.weeklyStats.skillImprovement}`, 30, 210);
      }
      
      // Add page numbers and footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.getWidth() - 40, pdf.internal.pageSize.getHeight() - 10);
        pdf.text('Readle Learning © 2025', 20, pdf.internal.pageSize.getHeight() - 10);
      }
      
      // Save the PDF with a filename
      pdf.save(`${child.name}_Progress_Report_${today.replace(/\//g, '-')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('There was an error generating the report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f4ff] flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4f46e5]"></div>
      </div>
    );
  }
  
  if (error || !child || !progressReport) {
    return (
      <div className="min-h-screen bg-[#f8f4ff] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-[#ef4444] mb-4">Data Not Found</h1>
          <p className="mb-6">{error || "Sorry, this progress report doesn't exist."}</p>
          <Link 
            href="/children" 
            className="px-6 py-3 bg-[#4f46e5] text-white rounded-xl hover:bg-[#4338ca] transition-colors"
          >
            Back to Children
          </Link>
        </div>
      </div>
    );
  }

  // Get the latest progress data for skill breakdown
  const latestProgress = progressReport.progressData[progressReport.progressData.length - 1];

  // Filter data based on selected skill
  const chartData =
    selectedSkill === 'all'
      ? progressReport.progressData
      : progressReport.progressData.map(item => ({
          date: item.date,
          value: item[selectedSkill as keyof typeof item] as number
        }));

  // Activity history colors using standard hex
  const activityColors = {
    Phonics: "#4f46e5", // indigo
    Spelling: "#9333ea", // purple
    Reading: "#16a34a", // green
    Comprehension: "#eab308" // yellow
  };
  
  // Progress chart colors using standard hex
  const progressColors = ["#4f46e5", "#9333ea", "#16a34a", "#eab308"];

  return (
    <div className="min-h-screen bg-[#f8f4ff] py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <div className="bg-white rounded-full overflow-hidden mr-4 w-12 h-12 flex items-center justify-center">
              <Image
                src={child.avatar} 
                alt={child.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#3730a3] mb-1">
                {child.name}&apos;s Progress
              </h1>
              <p className="text-[#4f46e5]">Level {child.level} • Overall Progress: {child.progress}%</p>
            </div>
          </div>
          
          <Link 
            href={`/child/${childId}`}
            className="px-4 py-2 bg-white border border-[#c7d2fe] text-[#4f46e5] rounded-lg hover:bg-[#eef2ff] transition-colors"
          >
            View Profile
          </Link>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
          <div className="flex gap-2">
            <div className="bg-white rounded-xl shadow-sm px-4 py-2">
              <label htmlFor="skill" className="text-sm text-[#6b7280] mr-2">Skill:</label>
              <select 
                id="skill"
                className="border-none bg-transparent font-medium text-[#4f46e5] focus:outline-none"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="all">All Skills</option>
                <option value="phonics">Phonics 🔤</option>
                <option value="spelling">Spelling ✍️</option>
                <option value="reading">Reading 📚</option>
                <option value="comprehension">Comprehension 🧠</option>
              </select>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm px-4 py-2">
              <label htmlFor="range" className="text-sm text-[#6b7280] mr-2">Range:</label>
              <select 
                id="range"
                className="border-none bg-transparent font-medium text-[#4f46e5] focus:outline-none"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="4weeks">4 Weeks</option>
                <option value="6weeks">6 Weeks</option>
                <option value="3months">3 Months</option>
              </select>
            </div>
          </div>
          
          <button 
            className="px-4 py-2 bg-white border border-[#c7d2fe] text-[#4f46e5] rounded-lg hover:bg-[#eef2ff] transition-colors flex items-center"
            onClick={exportReport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                </svg>
                Export Report
              </>
            )}
          </button>
        </div>
        
        {/* Content to be captured for the PDF */}
        <div ref={reportRef}>
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Progress Chart */}
            <div className="lg:col-span-2">
              <ProgressChart
                data={chartData}
                dataKeys={selectedSkill === 'all' ? ['phonics', 'spelling', 'reading', 'comprehension'] : [selectedSkill]}
                colors={progressColors}
                title="Skill Progress Over Time"
                yAxisLabel="Progress (%)"
                xAxisLabel="Time Period"
              />
            </div>
            
            {/* Activity History Chart */}
            <div>
              <ActivityHistoryChart
                data={progressReport.activityHistory}
                title="Activities Completed"
                colors={activityColors}
              />
            </div>
            
            {/* Weekly Stats */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-[#1f2937] mb-4">Weekly Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#eef2ff] p-4 rounded-xl">
                  <div className="flex items-center mb-1">
                    <div className="bg-[#e0e7ff] p-2 rounded-full mr-2">
                      <span className="text-xl">📊</span>
                    </div>
                    <span className="text-sm text-[#4b5563]">Total Activities</span>
                  </div>
                  <p className="text-2xl font-bold text-[#4f46e5]">{progressReport.weeklyStats.totalActivities}</p>
                </div>
                <div className="bg-[#f5f3ff] p-4 rounded-xl">
                  <div className="flex items-center mb-1">
                    <div className="bg-[#ede9fe] p-2 rounded-full mr-2">
                      <span className="text-xl">⏱️</span>
                    </div>
                    <span className="text-sm text-[#4b5563]">Time Spent</span>
                  </div>
                  <p className="text-2xl font-bold text-[#9333ea]">{progressReport.weeklyStats.totalTimeSpent}</p>
                </div>
                <div className="bg-[#ecfdf5] p-4 rounded-xl">
                  <div className="flex items-center mb-1">
                    <div className="bg-[#d1fae5] p-2 rounded-full mr-2">
                      <span className="text-xl">✅</span>
                    </div>
                    <span className="text-sm text-[#4b5563]">Correct Answers</span>
                  </div>
                  <p className="text-2xl font-bold text-[#16a34a]">{progressReport.weeklyStats.correctAnswers}%</p>
                </div>
                <div className="bg-[#fefce8] p-4 rounded-xl">
                  <div className="flex items-center mb-1">
                    <div className="bg-[#fef9c3] p-2 rounded-full mr-2">
                      <span className="text-xl">📈</span>
                    </div>
                    <span className="text-sm text-[#4b5563]">Improvement</span>
                  </div>
                  <p className="text-2xl font-bold text-[#eab308]">{progressReport.weeklyStats.skillImprovement}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skill Breakdown */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-lg font-bold text-[#1f2937] mb-6">Skill Breakdown</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center text-[#4b5563]">
                    <span className="mr-2 text-xl">🔤</span>
                    Phonics
                  </span>
                  <span className="text-sm font-medium text-[#4f46e5]">{latestProgress.phonics}%</span>
                </div>
                <div className="h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#4f46e5]"
                    style={{ width: `${latestProgress.phonics}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center text-[#4b5563]">
                    <span className="mr-2 text-xl">✍️</span>
                    Spelling
                  </span>
                  <span className="text-sm font-medium text-[#4f46e5]">{latestProgress.spelling}%</span>
                </div>
                <div className="h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#9333ea]"
                    style={{ width: `${latestProgress.spelling}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center text-[#4b5563]">
                    <span className="mr-2 text-xl">📚</span>
                    Reading
                  </span>
                  <span className="text-sm font-medium text-[#4f46e5]">{latestProgress.reading}%</span>
                </div>
                <div className="h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#16a34a]"
                    style={{ width: `${latestProgress.reading}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="flex items-center text-[#4b5563]">
                    <span className="mr-2 text-xl">🧠</span>
                    Comprehension
                  </span>
                  <span className="text-sm font-medium text-[#4f46e5]">{latestProgress.comprehension}%</span>
                </div>
                <div className="h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#eab308]"
                    style={{ width: `${latestProgress.comprehension}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-lg font-bold text-[#1f2937] mb-4">Recommendations</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-[#e0e7ff] p-2 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4f46e5]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#1f2937]">Focus on Comprehension</p>
                  <p className="text-[#4b5563]">This is {child.name}&apos;s lowest skill area. Try the &ldquo;Story Time&rdquo; activities to improve comprehension.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#e0e7ff] p-2 rounded-full mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4f46e5]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#1f2937]">Keep up the Phonics Work</p>
                  <p className="text-[#4b5563]">Phonics is {child.name}&apos;s strongest area. Continue building on this strength.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            href="/children"
            className="flex items-center px-4 py-2 text-[#4f46e5] hover:text-[#3730a3] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Children
          </Link>
          <div>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white border border-[#c7d2fe] text-[#4f46e5] rounded-xl mr-4 hover:bg-[#eef2ff] transition-colors"
            >
              Dashboard
            </Link>
            <button 
              className="px-6 py-3 bg-[#4f46e5] text-white rounded-xl hover:bg-[#4338ca] transition-colors"
              onClick={() => window.print()}
            >
              Print Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}