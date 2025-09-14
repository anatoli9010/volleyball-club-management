import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ChildProfile = {
  id: string
  name: string
  points: number
  completed: Record<string, boolean>
}

export type ProfilesState = {
  profiles: Record<string, ChildProfile>
  activeProfileId: string | null
  version: 1
}

type ProfilesContextValue = {
  state: ProfilesState
  activeProfile: ChildProfile | null
  createProfile: (name: string) => void
  selectProfile: (id: string) => void
  deleteProfile: (id: string) => void
  renameProfile: (id: string, name: string) => void
  addPoints: (points: number) => void
  toggleMissionComplete: (missionId: string) => void
}

const STORAGE_KEY = 'volleykids_profiles_v1'
const LEGACY_KEY = 'volleykids_profile'

const ProfilesContext = createContext<ProfilesContextValue | undefined>(undefined)

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function readInitialState(): ProfilesState {
  // Try v1
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as ProfilesState
      if (parsed && parsed.version === 1) return parsed
    } catch {}
  }
  // Migrate from legacy single-profile
  const legacyRaw = localStorage.getItem(LEGACY_KEY)
  if (legacyRaw) {
    try {
      const legacy = JSON.parse(legacyRaw) as { name: string; points: number; completed: Record<string, boolean> }
      const id = generateId()
      const profiles: Record<string, ChildProfile> = {
        [id]: { id, name: legacy.name || 'Гост', points: legacy.points || 0, completed: legacy.completed || {} },
      }
      const state: ProfilesState = { profiles, activeProfileId: id, version: 1 }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      return state
    } catch {}
  }
  // Default empty
  return { profiles: {}, activeProfileId: null, version: 1 }
}

export function ProfilesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProfilesState>(() => readInitialState())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const activeProfile = useMemo(() => (state.activeProfileId ? state.profiles[state.activeProfileId] || null : null), [state])

  const createProfile = useCallback((name: string) => {
    const id = generateId()
    setState(prev => ({
      ...prev,
      profiles: { ...prev.profiles, [id]: { id, name: name || 'Дете', points: 0, completed: {} } },
      activeProfileId: id,
    }))
  }, [])

  const selectProfile = useCallback((id: string) => {
    setState(prev => ({ ...prev, activeProfileId: id }))
  }, [])

  const deleteProfile = useCallback((id: string) => {
    setState(prev => {
      const next = { ...prev.profiles }
      delete next[id]
      const nextActive = prev.activeProfileId === id ? Object.keys(next)[0] || null : prev.activeProfileId
      return { ...prev, profiles: next, activeProfileId: nextActive }
    })
  }, [])

  const renameProfile = useCallback((id: string, name: string) => {
    setState(prev => ({
      ...prev,
      profiles: { ...prev.profiles, [id]: { ...prev.profiles[id], name } },
    }))
  }, [])

  const addPoints = useCallback((points: number) => {
    setState(prev => {
      const id = prev.activeProfileId
      if (!id) return prev
      const p = prev.profiles[id]
      return { ...prev, profiles: { ...prev.profiles, [id]: { ...p, points: Math.max(0, (p.points || 0) + points) } } }
    })
  }, [])

  const toggleMissionComplete = useCallback((missionId: string) => {
    setState(prev => {
      const id = prev.activeProfileId
      if (!id) return prev
      const p = prev.profiles[id]
      const done = !!p.completed[missionId]
      const nextCompleted = { ...p.completed, [missionId]: !done }
      const nextPoints = Math.max(0, (p.points || 0) + (done ? -10 : 10))
      return { ...prev, profiles: { ...prev.profiles, [id]: { ...p, completed: nextCompleted, points: nextPoints } } }
    })
  }, [])

  const value: ProfilesContextValue = useMemo(() => ({
    state,
    activeProfile,
    createProfile,
    selectProfile,
    deleteProfile,
    renameProfile,
    addPoints,
    toggleMissionComplete,
  }), [state, activeProfile, createProfile, selectProfile, deleteProfile, renameProfile, addPoints, toggleMissionComplete])

  return <ProfilesContext.Provider value={value}>{children}</ProfilesContext.Provider>
}

export function useProfiles() {
  const ctx = useContext(ProfilesContext)
  if (!ctx) throw new Error('useProfiles must be used within ProfilesProvider')
  return ctx
}

