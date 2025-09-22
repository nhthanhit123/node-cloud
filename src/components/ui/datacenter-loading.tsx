'use client'

import { cn } from "@/lib/utils"
import { Server, Activity, Wifi, HardDrive } from "lucide-react"

interface DatacenterLoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function DatacenterLoading({ 
  className, 
  size = "md", 
  showText = true 
}: DatacenterLoadingProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      {/* Server Rack Animation */}
      <div className={cn("relative", sizeClasses[size])}>
        {/* Server Frame */}
        <div className="absolute inset-0 bg-green-900 rounded-lg shadow-lg"></div>
        
        {/* Server Slots */}
        <div className="absolute inset-1 flex flex-col gap-1 p-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-1 bg-green-800 rounded relative overflow-hidden">
              {/* LED Lights */}
              <div className="absolute top-1 right-1 flex gap-1">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  i % 2 === 0 ? "bg-green-400" : "bg-green-300"
                )} style={{ animationDelay: `${i * 0.2}s` }}></div>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full animate-pulse",
                  i % 2 === 0 ? "bg-green-300" : "bg-green-400"
                )} style={{ animationDelay: `${i * 0.2 + 0.1}s` }}></div>
              </div>
              
              {/* Activity Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-600">
                <div 
                  className="h-full bg-green-400 animate-pulse"
                  style={{ 
                    width: `${30 + (i * 20)}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Network Activity */}
        <div className="absolute -top-2 -right-2">
          <Wifi className={cn(
            "text-green-500 animate-pulse",
            size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8"
          )} />
        </div>
      </div>
      
      {showText && (
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 text-green-600 animate-spin" />
            <span className="text-sm font-medium text-green-700">Đang xử lý...</span>
          </div>
          <div className="text-xs text-green-600">
            Hệ thống đang khởi động dịch vụ
          </div>
        </div>
      )}
    </div>
  )
}

interface DatacenterGridLoadingProps {
  className?: string
  rows?: number
  cols?: number
}

export function DatacenterGridLoading({ 
  className, 
  rows = 2, 
  cols = 3 
}: DatacenterGridLoadingProps) {
  return (
    <div className={cn("grid gap-4", className)} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <Server className="w-5 h-5 text-green-600" />
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-3 bg-green-200 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
            <div className="h-2 bg-green-200 rounded w-3/4 animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.05}s` }}></div>
          </div>
          
          <div className="mt-3 h-1 bg-green-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 animate-pulse"
              style={{ 
                width: `${20 + (i % 5) * 15}%`,
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

interface ProcessingAnimationProps {
  className?: string
  text?: string
}

export function ProcessingAnimation({ 
  className, 
  text = "Đang xử lý yêu cầu..."
}: ProcessingAnimationProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)}>
      {/* Animated Server */}
      <div className="relative">
        <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
          <HardDrive className="w-8 h-8 text-white" />
        </div>
        
        {/* Rotating Ring */}
        <div className="absolute inset-0 border-2 border-green-400 border-t-transparent rounded-lg animate-spin"></div>
        
        {/* Pulse Rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-green-300 rounded-lg animate-ping"
            style={{
              animationDelay: `${i * 0.5}s`,
              opacity: 1 - (i * 0.3)
            }}
          ></div>
        ))}
      </div>
      
      {/* Text */}
      <div className="text-center">
        <div className="text-green-700 font-medium">{text}</div>
        <div className="text-sm text-green-600 mt-1">Vui lòng đợi trong giây lát</div>
      </div>
      
      {/* Progress Dots */}
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}