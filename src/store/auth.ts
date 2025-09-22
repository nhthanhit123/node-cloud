import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  address?: string
  createdAt: string
  lastLogin: string
}

interface Service {
  id: string
  type: 'hosting' | 'vps' | 'server' | 'website'
  name: string
  status: 'active' | 'expired' | 'suspended'
  createdAt: string
  expiresAt: string
  details: any
}

interface AuthState {
  user: User | null
  services: Service[]
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  addService: (service: Service) => void
  removeService: (serviceId: string) => void
  updateService: (serviceId: string, updates: Partial<Service>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      services: [],
      isAuthenticated: false,
      
      login: (user) => {
        console.log("AuthStore: Login called", { user });
        set({ 
          user, 
          isAuthenticated: true,
          services: [
            {
              id: '1',
              type: 'hosting',
              name: 'Professional Hosting Package',
              status: 'active',
              createdAt: '2024-01-15',
              expiresAt: '2025-01-15',
              details: {
                domain: 'example.com',
                diskSpace: '20GB',
                bandwidth: '200GB',
                databases: 10,
                emailAccounts: 10
              }
            },
            {
              id: '2',
              type: 'vps',
              name: 'VPS Pro Package',
              status: 'active',
              createdAt: '2024-02-01',
              expiresAt: '2025-02-01',
              details: {
                cpu: '2 Cores',
                ram: '4GB',
                storage: '80GB SSD',
                os: 'Ubuntu 22.04',
                ip: '192.168.1.100'
              }
            }
          ]
        })
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          services: []
        })
      },
      
      updateProfile: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }))
      },
      
      addService: (service) => {
        set((state) => ({
          services: [...state.services, service]
        }))
      },
      
      removeService: (serviceId) => {
        set((state) => ({
          services: state.services.filter(service => service.id !== serviceId)
        }))
      },
      
      updateService: (serviceId, updates) => {
        set((state) => ({
          services: state.services.map(service =>
            service.id === serviceId ? { ...service, ...updates } : service
          )
        }))
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)