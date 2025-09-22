'use client'

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  lines?: number
  animate?: boolean
}

export function Skeleton({ className, lines = 1, animate = true }: SkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-gray-200 rounded",
            animate && "animate-pulse",
            className
          )}
          style={{
            width: i === lines - 1 ? "80%" : "100%",
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  )
}

interface CardSkeletonProps {
  className?: string
}

export function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-4", className)}>
      {/* Header */}
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <Skeleton lines={3} />
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded flex-1 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="h-6 bg-gray-200 rounded flex-1 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="h-10 bg-gray-200 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}

interface FormSkeletonProps {
  className?: string
  fields?: number
}

export function FormSkeleton({ className, fields = 4 }: FormSkeletonProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }}></div>
        </div>
      ))}
      
      {/* Button */}
      <div className="h-12 bg-gray-200 rounded animate-pulse" style={{ animationDelay: `${fields * 0.1 + 0.1}s` }}></div>
    </div>
  )
}

interface ServiceInfoSkeletonProps {
  className?: string
}

export function ServiceInfoSkeleton({ className }: ServiceInfoSkeletonProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Title */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      </div>
      
      {/* Features */}
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }}></div>
          </div>
        ))}
      </div>
      
      {/* Price */}
      <div className="space-y-2 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
        </div>
      </div>
    </div>
  )
}