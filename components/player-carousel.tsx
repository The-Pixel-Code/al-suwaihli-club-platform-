"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export interface Player {
  id: string | number
  name: string
  position: string
  number: number
  image?: string
}

export interface PlayerCarouselProps {
  players: Player[]
  title?: string
}

export function PlayerCarousel({ players = [], title = "Players" }: PlayerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(players.length, 1))
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(players.length - 1, 0) : prev - 1))
  }

  if (players.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous player"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1"
        >
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-300 mb-2">{players[currentIndex].number}</div>
            <h3 className="text-2xl font-bold">{players[currentIndex].name}</h3>
            <p className="text-gray-600">{players[currentIndex].position}</p>
          </div>
        </motion.div>

        <button onClick={next} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Next player">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
