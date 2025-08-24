'use client'

import React, { useState } from 'react'
import Header from '../components/Header'
import DailyWords from '../components/DailyWords'
import SpeakingPractice from '../components/SpeakingPractice'
import LearningModules from '../components/LearningModules'
import ProgressTracker from '../components/ProgressTracker'
import Footer from '../components/Footer'

export default function Home() {
  const [currentSection, setCurrentSection] = useState('daily-words')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            Master English with Confidence
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Learn English effectively with daily vocabulary, speaking practice, and interactive lessons. 
            From basic to advanced levels, improve your English skills step by step.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setCurrentSection('daily-words')}
              className="btn-primary text-lg px-8 py-3"
            >
              Start Learning
            </button>
            <button 
              onClick={() => setCurrentSection('speaking-practice')}
              className="btn-secondary text-lg px-8 py-3"
            >
              Practice Speaking
            </button>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <button
            onClick={() => setCurrentSection('daily-words')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSection === 'daily-words'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Daily Words
          </button>
          <button
            onClick={() => setCurrentSection('speaking-practice')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSection === 'speaking-practice'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Speaking Practice
          </button>
          <button
            onClick={() => setCurrentSection('learning-modules')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSection === 'learning-modules'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Learning Modules
          </button>
          <button
            onClick={() => setCurrentSection('progress')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentSection === 'progress'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            My Progress
          </button>
        </div>

        {/* Content Sections */}
        <div className="min-h-[600px]">
          {currentSection === 'daily-words' && <DailyWords />}
          {currentSection === 'speaking-practice' && <SpeakingPractice />}
          {currentSection === 'learning-modules' && <LearningModules />}
          {currentSection === 'progress' && <ProgressTracker />}
        </div>
      </main>

      <Footer />
    </div>
  )
} 