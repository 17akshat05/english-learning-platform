'use client'

import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { speakText } from '../utils/api'

interface SpeakingExercise {
  id: number
  word: string
  phonetic: string
  sentence: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
}

const SpeakingPractice = () => {
  const [currentExercise, setCurrentExercise] = useState<SpeakingExercise | null>(null)
  const [score, setScore] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [userInput, setUserInput] = useState('')

  const exercises: SpeakingExercise[] = [
    {
      id: 1,
      word: "Hello",
      phonetic: "/həˈloʊ/",
      sentence: "Hello, how are you today?",
      difficulty: "easy",
      category: "Greetings"
    },
    {
      id: 2,
      word: "Beautiful",
      phonetic: "/ˈbjuːtɪfʊl/",
      sentence: "What a beautiful day!",
      difficulty: "medium",
      category: "Adjectives"
    },
    {
      id: 3,
      word: "Serendipity",
      phonetic: "/ˌserənˈdipədē/",
      sentence: "Finding this book was pure serendipity.",
      difficulty: "hard",
      category: "Advanced Vocabulary"
    },
    {
      id: 4,
      word: "Confidence",
      phonetic: "/ˈkɒnfɪdəns/",
      sentence: "She spoke with great confidence.",
      difficulty: "medium",
      category: "Personality"
    },
    {
      id: 5,
      word: "Resilient",
      phonetic: "/rəˈzɪljənt/",
      sentence: "Children are naturally resilient.",
      difficulty: "hard",
      category: "Advanced Vocabulary"
    }
  ]

  useEffect(() => {
    // Set initial exercise
    setCurrentExercise(exercises[0])
  }, [])

  const checkPronunciation = () => {
    if (!currentExercise || !userInput.trim()) return
    
    const targetWord = currentExercise.word.toLowerCase()
    const spokenText = userInput.toLowerCase()
    const isWordCorrect = spokenText.includes(targetWord)
    
    setTotalAttempts(prev => prev + 1)
    
    if (isWordCorrect) {
      setScore(prev => prev + 1)
      setIsCorrect(true)
      setFeedback('Excellent pronunciation! Well done!')
    } else {
      setIsCorrect(false)
      setFeedback(`Try again. You wrote: "${userInput}". Expected: "${targetWord}"`)
    }
  }

  const nextExercise = () => {
    const currentIndex = exercises.findIndex(ex => ex.id === currentExercise?.id)
    const nextIndex = (currentIndex + 1) % exercises.length
    setCurrentExercise(exercises[nextIndex])
    setUserInput('')
    setFeedback('')
    setIsCorrect(null)
  }

  const playAudio = (text: string) => {
    speakText(text)
  }

  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Speaking Practice</h2>
        <p className="text-gray-600">Improve your pronunciation with interactive exercises</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-primary-600">{score}</h3>
          <p className="text-gray-600">Correct</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-gray-600">{totalAttempts}</h3>
          <p className="text-gray-600">Attempts</p>
        </div>
        <div className="card text-center">
          <h3 className="text-2xl font-bold text-secondary-600">{accuracy}%</h3>
          <p className="text-gray-600">Accuracy</p>
        </div>
      </div>

      {/* Current Exercise */}
      {currentExercise && (
        <div className="speaking-area mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentExercise.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentExercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentExercise.difficulty.toUpperCase()}
                </span>
                <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {currentExercise.category}
                </span>
              </div>
              <button
                onClick={() => playAudio(currentExercise.sentence)}
                className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                title="Listen to example"
              >
                <Volume2 className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{currentExercise.word}</h3>
            <p className="text-lg text-gray-600 font-mono mb-4">{currentExercise.phonetic}</p>
            <p className="text-gray-700 italic">"{currentExercise.sentence}"</p>
          </div>

          {/* Practice Input */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full max-w-md">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type the word here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && checkPronunciation()}
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => playAudio(currentExercise.word)}
                className="p-3 rounded-lg bg-green-100 hover:bg-green-200 transition-colors"
                title="Listen to pronunciation"
              >
                <Volume2 className="w-5 h-5 text-green-600" />
              </button>
              <button
                onClick={checkPronunciation}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Check Answer
              </button>
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
              isCorrect === true ? 'bg-green-50 border border-green-200' :
              isCorrect === false ? 'bg-red-50 border border-red-200' :
              'bg-blue-50 border border-blue-200'
            }`}>
              {isCorrect === true ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : isCorrect === false ? (
                <XCircle className="w-5 h-5 text-red-600" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              )}
              <p className={`font-medium ${
                isCorrect === true ? 'text-green-800' :
                isCorrect === false ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {feedback}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={nextExercise}
          className="btn-primary flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Next Exercise</span>
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Speaking Tips</h4>
        <ul className="space-y-2 text-gray-700">
          <li>• Listen to the pronunciation first by clicking the audio button</li>
          <li>• Pay attention to the phonetic pronunciation</li>
          <li>• Practice the word in context with the example sentence</li>
          <li>• Type the word exactly as you hear it</li>
          <li>• Don't worry about perfect accuracy - focus on improvement</li>
        </ul>
      </div>
    </div>
  )
}

export default SpeakingPractice 