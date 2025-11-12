"use client"

import { useState, useEffect, useCallback } from "react"
import type { CarouselSlide } from "@/types/news.types"

interface UseCarouselProps {
  slides: CarouselSlide[]
  autoPlayInterval?: number
  initialSlide?: number
}

export function useCarousel({ slides, autoPlayInterval = 8000, initialSlide = 0 }: UseCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length, autoPlayInterval])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false)
  }, [])

  const resumeAutoPlay = useCallback(() => {
    setIsAutoPlaying(true)
  }, [])

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    isAutoPlaying,
    pauseAutoPlay,
    resumeAutoPlay,
  }
}
