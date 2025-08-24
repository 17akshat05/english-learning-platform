'use client'

import React, { useState, useEffect } from 'react'
import { Volume2, Heart, Share2, BookOpen } from 'lucide-react'
import { getDailyWords, speakText } from '../utils/api'

interface Word {
  word: string
  phonetic: string
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
    }>
  }>
  origin?: string
  audioUrl?: string | null
}

const DailyWords = () => {
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Load daily words
    const dailyWords = getDailyWords()
    setWords(dailyWords)
    setLoading(false)
  }, [])

  const playAudio = (word: string) => {
    speakText(word)
  }

  const toggleFavorite = (word: string) => {
    setFavorites(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    )
  }

  const shareWord = (word: Word) => {
    if (navigator.share) {
      navigator.share({
        title: `Learn: ${word.word}`,
        text: `${word.word} - ${word.meanings[0].definitions[0].definition}`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${word.word} - ${word.meanings[0].definitions[0].definition}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const currentWord = words[currentWordIndex]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Daily Words</h2>
        <p className="text-gray-600">Learn 5 new words every day to expand your vocabulary</p>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {words.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentWordIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentWordIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="word-card mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{currentWord.word}</h3>
            <p className="text-lg text-gray-600 font-mono">{currentWord.phonetic}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => playAudio(currentWord.word)}
              className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => toggleFavorite(currentWord.word)}
              className={`p-2 rounded-lg transition-colors ${
                favorites.includes(currentWord.word)
                  ? 'bg-red-100 hover:bg-red-200'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title="Add to favorites"
            >
              <Heart className={`w-5 h-5 ${
                favorites.includes(currentWord.word) ? 'text-red-600 fill-current' : 'text-gray-600'
              }`} />
            </button>
            <button
              onClick={() => shareWord(currentWord)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="Share word"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {currentWord.meanings.map((meaning, index) => (
            <div key={index} className="border-l-4 border-primary-500 pl-4">
              <p className="text-sm font-medium text-primary-600 uppercase tracking-wide mb-2">
                {meaning.partOfSpeech}
              </p>
              {meaning.definitions.map((def, defIndex) => (
                <div key={defIndex} className="mb-3">
                  <p className="text-gray-800 mb-2">{def.definition}</p>
                  {def.example && (
                    <p className="text-gray-600 italic">"{def.example}"</p>
                  )}
                </div>
              ))}
            </div>
          ))}
          
          {currentWord.origin && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Origin:</span> {currentWord.origin}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentWordIndex(prev => prev > 0 ? prev - 1 : words.length - 1)}
          className="btn-secondary"
          disabled={currentWordIndex === 0}
        >
          Previous Word
        </button>
        
        <span className="text-gray-600">
          {currentWordIndex + 1} of {words.length}
        </span>
        
        <button
          onClick={() => setCurrentWordIndex(prev => prev < words.length - 1 ? prev + 1 : 0)}
          className="btn-primary"
          disabled={currentWordIndex === words.length - 1}
        >
          Next Word
        </button>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Learning Tip
        </h4>
        <p className="text-gray-700">
          Try using today's words in your conversations or writing. Practice makes perfect! 
          You can also create flashcards or use these words in sentences to better remember them.
        </p>
      </div>
    </div>
  )
}

export default DailyWords 