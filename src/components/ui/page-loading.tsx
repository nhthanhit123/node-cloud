'use client'

import { useEffect, useState } from 'react'
import { DatacenterLoading } from './datacenter-loading'

interface PageLoadingProps {
  duration?: number
  onComplete?: () => void
}

export function PageLoading({ duration = 1500, onComplete }: PageLoadingProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <DatacenterLoading size="lg" showText={true} />
      </div>
    </div>
  )
}

interface SectionLoadingProps {
  children: React.ReactNode
  isLoading?: boolean
  skeleton?: React.ReactNode
}

export function SectionLoading({ 
  children, 
  isLoading = false, 
  skeleton 
}: SectionLoadingProps) {
  if (isLoading) {
    return (
      <div className="animate-fade-in">
        {skeleton || <DatacenterLoading size="md" />}
      </div>
    )
  }

  return <>{children}</>
}