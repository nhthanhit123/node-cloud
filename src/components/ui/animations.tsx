'use client'

import { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"

interface SlideInProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
  triggerOnce?: boolean
}

export default function SlideIn({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 600,
  className,
  triggerOnce = true
}: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true)
          setHasTriggered(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    const element = document.getElementById(`slide-in-${Math.random().toString(36).substr(2, 9)}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [triggerOnce, hasTriggered])

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return 'translateX(-100px)'
      case 'right':
        return 'translateX(100px)'
      case 'down':
        return 'translateY(100px)'
      case 'up':
      default:
        return 'translateY(-100px)'
    }
  }

  const id = `slide-in-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div
      id={id}
      className={cn("transition-all ease-out", className)}
      style={{
        transform: isVisible ? 'translateX(0) translateY(0)' : getTransform(),
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  triggerOnce?: boolean
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 600,
  className,
  triggerOnce = true
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true)
          setHasTriggered(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    const element = document.getElementById(`fade-in-${Math.random().toString(36).substr(2, 9)}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [triggerOnce, hasTriggered])

  const id = `fade-in-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div
      id={id}
      className={cn("transition-all ease-out", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}

interface ScaleInProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  triggerOnce?: boolean
  scale?: number
}

export function ScaleIn({ 
  children, 
  delay = 0, 
  duration = 600,
  className,
  triggerOnce = true,
  scale = 0.8
}: ScaleInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true)
          setHasTriggered(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    const element = document.getElementById(`scale-in-${Math.random().toString(36).substr(2, 9)}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [triggerOnce, hasTriggered])

  const id = `scale-in-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div
      id={id}
      className={cn("transition-all ease-out", className)}
      style={{
        transform: isVisible ? 'scale(1)' : `scale(${scale})`,
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}

interface StaggerChildrenProps {
  children: React.ReactNode
  stagger?: number
  className?: string
}

export function StaggerChildren({ children, stagger = 100, className }: StaggerChildrenProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <FadeIn key={index} delay={index * stagger}>
              {child}
            </FadeIn>
          ))
        : children
      }
    </div>
  )
}