'use client'

import React, { useState, useEffect } from 'react'
import { Volume2, Mic, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { speakText } from '../utils/api'

interface Exercise {
  word: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

const SpeakingPractice = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [userInput, setUserInput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const exercises: Exercise[] = [
    { word: 'hello', difficulty: 'easy', category: 'Greetings' },
    { word: 'beautiful', difficulty: 'medium', category: 'Adjectives' },
    { word: 'pronunciation', difficulty: 'hard', category: 'Academic' },
    { word: 'computer', difficulty: 'easy', category: 'Technology' },
    { word: 'enthusiastic', difficulty: 'hard', category: 'Personality' },
    { word: 'wonderful', difficulty: 'medium', category: 'Adjectives' },
    { word: 'difficult', difficulty: 'medium', category: 'Adjectives' },
    { word: 'important', difficulty: 'medium', category: 'Adjectives' },
    { word: 'experience', difficulty: 'hard', category: 'Academic' },
    { word: 'knowledge', difficulty: 'hard', category: 'Academic' }
  ]

  useEffect(() => {
    generateNewExercise()
  }, [])

  const generateNewExercise = () => {
    const randomExercise = exercises[Math.floor(Math.random() * exercises.length)]
    setCurrentExercise(randomExercise)
    setUserInput('')
    setFeedback('')
    setIsCorrect(null)
    setShowResult(false)
  }

  const playAudio = (word: string) => {
    speakText(word)
  }

  const checkPronunciation = () => {
    if (!currentExercise || !userInput.trim()) return
    
    const targetWord = currentExercise.word.toLowerCase()
    const spokenText = userInput.toLowerCase()
    const isWordCorrect = spokenText.includes(targetWord)
    
    setTotalAttempts(prev => prev + 1)
    
    if (isWordCorrect) {
      setIsCorrect(true)
      setScore(prev => prev + 1)
      setStreak(prev => prev + 1)
      setFeedback('Excellent! Your pronunciation is correct! 🎉')
    } else {
      setIsCorrect(false)
      setStreak(0)
      setFeedback(`Try again. You wrote: "${userInput}". Expected: "${targetWord}"`)
    }
    
    setShowResult(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Speaking Practice</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Improve your pronunciation with interactive exercises</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{score}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{totalAttempts}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">{accuracy}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{streak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Streak</div>
        </div>
      </div>

      {/* Current Exercise */}
      {currentExercise && (
        <div className="card mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentExercise.difficulty)}`}>
                {currentExercise.difficulty.toUpperCase()}
              </div>
              <div className="text-gray-600 dark:text-gray-400">•</div>
              <div className="text-gray-600 dark:text-gray-400">{currentExercise.category}</div>
            </div>

            <div className="speaking-area mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Practice this word:
              </h3>
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                {currentExercise.word}
              </div>
              <button
                onClick={() => playAudio(currentExercise.word)}
                className="p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-full transition-colors"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type the word here..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && checkPronunciation()}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => playAudio(currentExercise.word)}
                  className="p-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                  title="Listen again"
                >
                  <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </button>
                <button
                  onClick={checkPronunciation}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Check Answer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className={`card mb-6 ${isCorrect ? 'border-green-500 dark:border-green-400' : 'border-red-500 dark:border-red-400'}`}>
          <div className="flex items-center space-x-3">
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            )}
            <p className={`text-lg ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {feedback}
            </p>
          </div>
        </div>
      )}

      {/* Next Exercise Button */}
      {showResult && (
        <div className="text-center">
          <button
            onClick={generateNewExercise}
            className="btn-secondary"
          >
            Next Exercise
          </button>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
          <Mic className="w-5 h-5 mr-2" />
          Speaking Tips
        </h4>
        <ul className="text-gray-700 dark:text-gray-300 space-y-2">
          <li>• Listen to the pronunciation first, then try to repeat</li>
          <li>• Pay attention to syllable stress and intonation</li>
          <li>• Practice slowly at first, then increase speed</li>
          <li>• Record yourself and compare with the original</li>
        </ul>
      </div>
    </div>
  )
}

export default SpeakingPractice 