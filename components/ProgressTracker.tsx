'use client'

import React, { useState, useEffect } from 'react'
import { Trophy, Target, Calendar, TrendingUp, Award, Star, Clock, BookOpen } from 'lucide-react'
import { loadUserProgress, saveUserProgress, getDefaultProgress } from '../utils/api'

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  maxProgress: number
}

interface WeeklyProgress {
  day: string
  wordsLearned: number
  speakingPractice: number
  lessonsCompleted: number
}

const ProgressTracker = () => {
  const [currentStreak, setCurrentStreak] = useState(0)
  const [totalWords, setTotalWords] = useState(0)
  const [totalLessons, setTotalLessons] = useState(0)
  const [speakingAccuracy, setSpeakingAccuracy] = useState(0)
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = loadUserProgress() || getDefaultProgress()
    
    setCurrentStreak(savedProgress.currentStreak || 0)
    setTotalWords(savedProgress.totalWords || 0)
    setTotalLessons(savedProgress.totalLessons || 0)
    setSpeakingAccuracy(savedProgress.speakingAccuracy || 0)
    setWeeklyProgress(savedProgress.weeklyProgress || generateWeeklyProgress())
    setAchievements(savedProgress.achievements || generateAchievements())
  }, [])

  const generateWeeklyProgress = (): WeeklyProgress[] => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map(day => ({
      day,
      wordsLearned: Math.floor(Math.random() * 8) + 2,
      speakingPractice: Math.floor(Math.random() * 5) + 1,
      lessonsCompleted: Math.floor(Math.random() * 3) + 1
    }))
  }

  const generateAchievements = (): Achievement[] => [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlocked: totalLessons > 0,
      progress: Math.min(totalLessons, 1),
      maxProgress: 1
    },
    {
      id: 2,
      title: "Word Collector",
      description: "Learn 50 words",
      icon: "📚",
      unlocked: totalWords >= 50,
      progress: totalWords,
      maxProgress: 50
    },
    {
      id: 3,
      title: "Speaking Master",
      description: "Achieve 80% speaking accuracy",
      icon: "🎤",
      unlocked: speakingAccuracy >= 80,
      progress: speakingAccuracy,
      maxProgress: 80
    },
    {
      id: 4,
      title: "Consistent Learner",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      unlocked: currentStreak >= 7,
      progress: currentStreak,
      maxProgress: 7
    },
    {
      id: 5,
      title: "Grammar Guru",
      description: "Complete 20 grammar lessons",
      icon: "📝",
      unlocked: totalLessons >= 20,
      progress: totalLessons,
      maxProgress: 20
    },
    {
      id: 6,
      title: "Vocabulary Expert",
      description: "Learn 100 words",
      icon: "🧠",
      unlocked: totalWords >= 100,
      progress: totalWords,
      maxProgress: 100
    }
  ]

  const getProgressColor = (progress: number, max: number) => {
    const percentage = (progress / max) * 100
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    if (percentage >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getLevel = (totalWords: number) => {
    if (totalWords < 50) return { level: 'Beginner', color: 'text-green-600' }
    if (totalWords < 150) return { level: 'Intermediate', color: 'text-yellow-600' }
    if (totalWords < 300) return { level: 'Advanced', color: 'text-red-600' }
    return { level: 'Expert', color: 'text-purple-600' }
  }

  const userLevel = getLevel(totalWords)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h2>
        <p className="text-gray-600">Track your learning journey and celebrate achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{currentStreak}</h3>
          <p className="text-gray-600">Day Streak</p>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{totalWords}</h3>
          <p className="text-gray-600">Words Learned</p>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{totalLessons}</h3>
          <p className="text-gray-600">Lessons Completed</p>
        </div>
        
        <div className="card text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-4">
            <Star className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{speakingAccuracy}%</h3>
          <p className="text-gray-600">Speaking Accuracy</p>
        </div>
      </div>

      {/* Level and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Current Level */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Current Level
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{userLevel.level}</div>
            <div className={`text-lg font-medium mb-4 ${userLevel.color}`}>
              {totalWords} words mastered
            </div>
            <div className="progress-bar">
              <div 
                className={`progress-fill ${getProgressColor(totalWords, 300)}`}
                style={{ width: `${Math.min((totalWords / 300) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {300 - totalWords} more words to reach Expert level
            </p>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-500" />
            This Week's Activity
          </h3>
          <div className="space-y-3">
            {weeklyProgress.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-12">{day.day}</span>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-1">
                    {[...Array(day.wordsLearned)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {day.wordsLearned} words, {day.lessonsCompleted} lessons
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-500" />
          Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
                {achievement.unlocked && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              
              {!achievement.unlocked && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-800 font-medium">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${getProgressColor(achievement.progress, achievement.maxProgress)}`}
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Best Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Most words learned in a day</span>
              <span className="font-semibold text-green-600">12 words</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Longest speaking session</span>
              <span className="font-semibold text-blue-600">45 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Highest accuracy</span>
              <span className="font-semibold text-purple-600">92%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Next Goals</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Words to next level</span>
              <span className="font-semibold text-orange-600">5 more</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Speaking accuracy target</span>
              <span className="font-semibold text-green-600">80%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Streak goal</span>
              <span className="font-semibold text-red-600">30 days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Keep Going! 🚀</h3>
        <p className="text-gray-700 mb-4">
          You're making excellent progress! Consistency is key to mastering English. 
          Try to practice for at least 15 minutes every day.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary">Continue Learning</button>
          <button className="btn-secondary">Review Progress</button>
        </div>
      </div>
    </div>
  )
}

export default ProgressTracker 