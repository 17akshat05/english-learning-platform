'use client'

import React, { useState, useEffect } from 'react'
import { Trophy, Target, TrendingUp, Calendar, Star, Award, BookOpen, Mic } from 'lucide-react'
import { loadUserProgress, saveUserProgress, getDefaultProgress } from '../utils/api'

interface WeeklyProgress {
  day: string
  words: number
  lessons: number
  accuracy: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  maxProgress: number
}

const ProgressTracker = () => {
  const [currentStreak, setCurrentStreak] = useState(0)
  const [totalWords, setTotalWords] = useState(0)
  const [totalLessons, setTotalLessons] = useState(0)
  const [speakingAccuracy, setSpeakingAccuracy] = useState(0)
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
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
      words: Math.floor(Math.random() * 10) + 1,
      lessons: Math.floor(Math.random() * 3) + 1,
      accuracy: Math.floor(Math.random() * 30) + 70
    }))
  }

  const generateAchievements = (): Achievement[] => [
    {
      id: 'first-word',
      title: 'First Steps',
      description: 'Learn your first word',
      icon: '🌟',
      unlocked: totalWords > 0,
      progress: Math.min(totalWords, 1),
      maxProgress: 1
    },
    {
      id: 'word-master',
      title: 'Word Master',
      description: 'Learn 50 words',
      icon: '📚',
      unlocked: totalWords >= 50,
      progress: Math.min(totalWords, 50),
      maxProgress: 50
    },
    {
      id: 'lesson-complete',
      title: 'Lesson Learner',
      description: 'Complete 10 lessons',
      icon: '🎓',
      unlocked: totalLessons >= 10,
      progress: Math.min(totalLessons, 10),
      maxProgress: 10
    },
    {
      id: 'streak-7',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: currentStreak >= 7,
      progress: Math.min(currentStreak, 7),
      maxProgress: 7
    },
    {
      id: 'accuracy-90',
      title: 'Precision Master',
      description: 'Achieve 90% speaking accuracy',
      icon: '🎯',
      unlocked: speakingAccuracy >= 90,
      progress: Math.min(speakingAccuracy, 90),
      maxProgress: 90
    }
  ]

  const getLevel = () => {
    const totalPoints = totalWords + totalLessons * 5 + currentStreak * 2
    if (totalPoints < 50) return { level: 1, title: 'Beginner', progress: totalPoints, max: 50 }
    if (totalPoints < 150) return { level: 2, title: 'Intermediate', progress: totalPoints - 50, max: 100 }
    if (totalPoints < 300) return { level: 3, title: 'Advanced', progress: totalPoints - 150, max: 150 }
    return { level: 4, title: 'Expert', progress: totalPoints - 300, max: 200 }
  }

  const levelInfo = getLevel()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Progress</h2>
        <p className="text-gray-600 dark:text-gray-300">Track your learning journey and celebrate achievements</p>
      </div>

      {/* Level Progress */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Level {levelInfo.level}</h3>
            <p className="text-gray-600 dark:text-gray-400">{levelInfo.title}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {levelInfo.progress}/{levelInfo.max}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">XP to next level</div>
          </div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(levelInfo.progress / levelInfo.max) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{currentStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalWords}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Words Learned</div>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalLessons}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</div>
        </div>

        <div className="card text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Mic className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{speakingAccuracy}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Speaking Accuracy</div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="card mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Weekly Activity
        </h3>
        <div className="grid grid-cols-7 gap-4">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{day.day}</div>
              <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center justify-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{day.words}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">words</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border transition-all duration-300 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-600' 
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {achievement.progress}/{achievement.maxProgress}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressTracker 