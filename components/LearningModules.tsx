'use client'

import React, { useState } from 'react'
import { BookOpen, Play, CheckCircle, Lock, Star, Clock, Users, ArrowRight } from 'lucide-react'

interface Lesson {
  id: number
  title: string
  words: string[]
  sentences: string[]
  exercises: Exercise[]
  completed: boolean
}

interface Exercise {
  id: number
  type: 'fill-blank' | 'multiple-choice' | 'translation'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
}

interface Module {
  id: number
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  lessons: Lesson[]
  completed: boolean
  locked: boolean
  rating: number
  students: number
}

const LearningModules = () => {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [showLesson, setShowLesson] = useState(false)

  const modules: Module[] = [
    {
      id: 1,
      title: "Basic Greetings & Introductions",
      description: "Learn essential greetings, introductions, and basic conversation starters.",
      level: "beginner",
      duration: "30 min",
      completed: false,
      locked: false,
      rating: 4.8,
      students: 1250,
      lessons: [
        {
          id: 1,
          title: "Greetings",
          words: ["Hello", "Hi", "Good morning", "Good afternoon", "Good evening", "Goodbye", "Bye", "See you"],
          sentences: [
            "Hello, how are you?",
            "Good morning! Nice to meet you.",
            "Hi there! What's your name?",
            "Goodbye, have a great day!",
            "See you later!"
          ],
          exercises: [
            {
              id: 1,
              type: 'fill-blank',
              question: "Complete the greeting: '_____, how are you?'",
              correctAnswer: "Hello",
              explanation: "Hello is the most common greeting in English."
            },
            {
              id: 2,
              type: 'multiple-choice',
              question: "What do you say in the morning?",
              options: ["Good night", "Good morning", "Good afternoon", "Goodbye"],
              correctAnswer: "Good morning",
              explanation: "Good morning is used from sunrise until noon."
            }
          ],
          completed: false
        },
        {
          id: 2,
          title: "Introductions",
          words: ["Name", "Meet", "Nice", "Pleased", "From", "Country", "Work", "Study"],
          sentences: [
            "My name is John.",
            "Nice to meet you!",
            "I'm from Canada.",
            "What do you do?",
            "I work as a teacher."
          ],
          exercises: [
            {
              id: 3,
              type: 'translation',
              question: "Translate: 'My name is Maria'",
              correctAnswer: "Mi nombre es Maria",
              explanation: "This is how you introduce yourself in Spanish."
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: "Everyday Conversations",
      description: "Master common daily conversations including shopping, dining, and travel.",
      level: "beginner",
      duration: "45 min",
      completed: false,
      locked: false,
      rating: 4.7,
      students: 980,
      lessons: [
        {
          id: 3,
          title: "Shopping",
          words: ["Buy", "Price", "Cost", "Cheap", "Expensive", "Discount", "Sale", "Cash", "Card"],
          sentences: [
            "How much does this cost?",
            "That's too expensive for me.",
            "Do you accept credit cards?",
            "Is there a discount?",
            "I'll take it!"
          ],
          exercises: [
            {
              id: 4,
              type: 'fill-blank',
              question: "Complete: 'How much does this ____?'",
              correctAnswer: "cost",
              explanation: "Cost is the verb used to ask about price."
            }
          ],
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: "Grammar Fundamentals",
      description: "Build a strong foundation with essential English grammar rules and structures.",
      level: "intermediate",
      duration: "60 min",
      completed: false,
      locked: false,
      rating: 4.9,
      students: 2100,
      lessons: [
        {
          id: 4,
          title: "Present Simple",
          words: ["Work", "Live", "Study", "Like", "Love", "Hate", "Want", "Need", "Have"],
          sentences: [
            "I work in an office.",
            "She lives in New York.",
            "They study English every day.",
            "We like coffee.",
            "He has a car."
          ],
          exercises: [
            {
              id: 5,
              type: 'multiple-choice',
              question: "Which sentence is correct?",
              options: [
                "I am work in an office",
                "I work in an office",
                "I working in an office",
                "I works in an office"
              ],
              correctAnswer: "I work in an office",
              explanation: "Present simple uses the base form of the verb."
            }
          ],
          completed: false
        }
      ]
    }
  ]

  const filteredModules = selectedLevel === 'all' 
    ? modules 
    : modules.filter(module => module.level === selectedLevel)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner': return '🌱'
      case 'intermediate': return '🌿'
      case 'advanced': return '🌳'
      default: return '📚'
    }
  }

  const startLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    setShowLesson(true)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Learning Modules</h2>
        <p className="text-gray-600 dark:text-gray-400">Structured lessons from basic to advanced English</p>
      </div>

      {/* Level Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedLevel === level
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredModules.map((module) => (
          <div key={module.id} className="card hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getLevelIcon(module.level)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(module.level)}`}>
                  {module.level.toUpperCase()}
                </span>
              </div>
              {module.locked ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : module.completed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Play className="w-5 h-5 text-primary-600" />
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{module.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{module.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{module.lessons.length} lessons</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{module.rating}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedModule(module)}
              disabled={module.locked}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                module.locked
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : module.completed
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                  : 'btn-primary'
              }`}
            >
              {module.locked ? 'Locked' : module.completed ? 'Review' : 'Start Learning'}
            </button>
          </div>
        ))}
      </div>

      {/* Module Detail Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedModule.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{getLevelIcon(selectedModule.level)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(selectedModule.level)}`}>
                      {selectedModule.level.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedModule.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{selectedModule.duration}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{selectedModule.lessons.length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Lessons</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Lessons:</h4>
                <div className="space-y-3">
                  {selectedModule.lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {lesson.words.length} words • {lesson.exercises.length} exercises
                        </p>
                      </div>
                      <button
                        onClick={() => startLesson(lesson)}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <span>Start</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {showLesson && currentLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{currentLesson.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">Learn new words and practice with exercises</p>
                </div>
                <button
                  onClick={() => setShowLesson(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              {/* Words Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">New Words</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {currentLesson.words.map((word, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                      <span className="font-medium text-gray-900 dark:text-white">{word}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sentences Section */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Example Sentences</h4>
                <div className="space-y-3">
                  {currentLesson.sentences.map((sentence, index) => (
                    <div key={index} className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-gray-900 dark:text-white italic">"{sentence}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercises Section */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Practice Exercises</h4>
                <div className="space-y-4">
                  {currentLesson.exercises.map((exercise) => (
                    <div key={exercise.id} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">{exercise.question}</h5>
                      {exercise.options && (
                        <div className="space-y-2">
                          {exercise.options.map((option, index) => (
                            <button
                              key={index}
                              className="w-full p-3 text-left border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowLesson(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Close
                </button>
                <button className="btn-primary flex-1">
                  Complete Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LearningModules 