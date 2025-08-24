// API utilities for English Learning Platform

// Sample word data for consistent experience
const SAMPLE_WORDS = [
  {
    word: "Serendipity",
    phonetic: "/ˌserənˈdipədē/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "The occurrence and development of events by chance in a happy or beneficial way",
        example: "Finding that perfect job was pure serendipity."
      }]
    }],
    origin: "From the Persian fairy tale 'The Three Princes of Serendip'",
    audioUrl: null
  },
  {
    word: "Ephemeral",
    phonetic: "/əˈfem(ə)rəl/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Lasting for a very short time; transitory",
        example: "The ephemeral beauty of cherry blossoms."
      }]
    }],
    origin: "From Greek 'ephemeros' meaning 'lasting only one day'",
    audioUrl: null
  },
  {
    word: "Ubiquitous",
    phonetic: "/yo͞oˈbikwədəs/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Present, appearing, or found everywhere",
        example: "Mobile phones have become ubiquitous in modern society."
      }]
    }],
    origin: "From Latin 'ubique' meaning 'everywhere'",
    audioUrl: null
  },
  {
    word: "Eloquent",
    phonetic: "/ˈeləkwənt/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Fluent or persuasive in speaking or writing",
        example: "Her eloquent speech moved the entire audience."
      }]
    }],
    origin: "From Latin 'eloquens' meaning 'speaking out'",
    audioUrl: null
  },
  {
    word: "Resilient",
    phonetic: "/rəˈzilyənt/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Able to withstand or recover quickly from difficult conditions",
        example: "Children are often more resilient than adults."
      }]
    }],
    origin: "From Latin 'resilire' meaning 'to leap back'",
    audioUrl: null
  },
  {
    word: "Perseverance",
    phonetic: "/ˌpərsəˈvirəns/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "Persistence in doing something despite difficulty or delay in achieving success",
        example: "His perseverance in learning English paid off."
      }]
    }],
    origin: "From Latin 'perseverantia' meaning 'steadfastness'",
    audioUrl: null
  },
  {
    word: "Authentic",
    phonetic: "/ôˈTHen(t)ik/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Genuine or real; not false or copied",
        example: "She has an authentic passion for teaching."
      }]
    }],
    origin: "From Greek 'authentikos' meaning 'original'",
    audioUrl: null
  },
  {
    word: "Innovative",
    phonetic: "/ˈinəˌvātiv/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Featuring new methods, advanced ideas, or original thinking",
        example: "The company is known for its innovative approach to problem-solving."
      }]
    }],
    origin: "From Latin 'innovare' meaning 'to renew'",
    audioUrl: null
  },
  {
    word: "Compassion",
    phonetic: "/kəmˈpaSHən/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "Sympathetic pity and concern for the sufferings or misfortunes of others",
        example: "She showed great compassion for the homeless."
      }]
    }],
    origin: "From Latin 'compati' meaning 'to suffer with'",
    audioUrl: null
  },
  {
    word: "Wisdom",
    phonetic: "/ˈwizdəm/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "The quality of having experience, knowledge, and good judgment",
        example: "With age comes wisdom."
      }]
    }],
    origin: "From Old English 'wisdom' meaning 'knowledge'",
    audioUrl: null
  }
]

// Get daily words based on current date for consistency
export const getDailyWords = (): typeof SAMPLE_WORDS => {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
  
  // Use day of year to select consistent words for the day
  const startIndex = dayOfYear % SAMPLE_WORDS.length
  const dailyWords = []
  
  for (let i = 0; i < 5; i++) {
    const index = (startIndex + i) % SAMPLE_WORDS.length
    dailyWords.push(SAMPLE_WORDS[index])
  }
  
  return dailyWords
}

// Text-to-Speech using Web Speech API
export const speakText = (text: string, lang: string = 'en-US', rate: number = 0.8): boolean => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = rate
    utterance.pitch = 1
    utterance.volume = 1
    
    // Get available voices and select a good one
    const voices = speechSynthesis.getVoices()
    const englishVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Female')
    )
    if (englishVoice) {
      utterance.voice = englishVoice
    }
    
    speechSynthesis.speak(utterance)
    return true
  }
  return false
}

// Local storage utilities for user progress
export const saveUserProgress = (data: any): void => {
  try {
    localStorage.setItem('englishLearningProgress', JSON.stringify(data))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

export const loadUserProgress = (): any => {
  try {
    const progress = localStorage.getItem('englishLearningProgress')
    return progress ? JSON.parse(progress) : null
  } catch (error) {
    console.error('Error loading progress:', error)
    return null
  }
}

// Initialize default progress if none exists
export const getDefaultProgress = () => ({
  totalWords: 0,
  totalLessons: 0,
  speakingAccuracy: 0,
  currentStreak: 0,
  achievements: [],
  weeklyProgress: [],
  favorites: []
}) 