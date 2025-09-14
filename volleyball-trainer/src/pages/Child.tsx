import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadExercises, type Exercise } from '../utils/csv'

type ChildProfile = {
  name: string
  points: number
  completed: Record<string, boolean>
}

const STORAGE_KEY = 'volleykids_profile'

function useProfile(): [ChildProfile, (p: ChildProfile) => void] {
  const [profile, setProfileState] = useState<ChildProfile>(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { name: 'Гост', points: 0, completed: {} }
  })
  const setProfile = (next: ChildProfile) => {
    setProfileState(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }
  return [profile, setProfile]
}

export default function Child() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [profile, setProfile] = useProfile()
  const [query, setQuery] = useState('')

  useEffect(() => {
    loadExercises().then(setExercises)
  }, [])

  const filtered = useMemo(() => {
    return exercises.filter(e => (e.name + ' ' + e.description).toLowerCase().includes(query.toLowerCase()))
  }, [exercises, query])

  const toggleComplete = (id: string) => {
    const isDone = profile.completed[id]
    const nextCompleted = { ...profile.completed, [id]: !isDone }
    const delta = isDone ? -10 : 10
    setProfile({ ...profile, completed: nextCompleted, points: Math.max(0, profile.points + delta) })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-5xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-amber-600">Мисии</h1>
            <p className="text-sm text-gray-600">Точки: <span className="font-bold text-amber-700">{profile.points}</span></p>
          </div>
          <Link to="/" className="text-sm text-gray-600 hover:text-primary">← Начало</Link>
        </div>

        <input
          className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2"
          placeholder="Търсене на мисии..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => {
            const id = e.name + '|' + (e.category || '')
            const done = !!profile.completed[id]
            return (
              <article key={id} className={`card ${done ? 'opacity-75' : ''}`}>
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{e.name}</h3>
                  <button className={`btn ${done ? 'bg-green-600 text-white' : 'btn-primary'}`} onClick={() => toggleComplete(id)}>
                    {done ? 'Готово ✓' : '+10 точки'}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">{e.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                  {e.category && <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">{e.category}</span>}
                  {e.level && <span className="rounded-full bg-green-50 px-2 py-1 text-green-700">{e.level}</span>}
                  {e.time && <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">{e.time}</span>}
                </div>
                {e.video && (
                  <a href={e.video} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-primary hover:underline">Видео</a>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

