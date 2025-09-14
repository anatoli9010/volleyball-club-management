import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadExercises, type Exercise } from '../utils/csv'
import { useProfiles } from '../context/ProfilesContext'

export default function Child() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const { activeProfile, toggleMissionComplete } = useProfiles()
  const [query, setQuery] = useState('')

  useEffect(() => {
    loadExercises().then(setExercises)
  }, [])

  const filtered = useMemo(() => {
    return exercises.filter(e => (e.name + ' ' + e.description).toLowerCase().includes(query.toLowerCase()))
  }, [exercises, query])

  if (!activeProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="mx-auto max-w-2xl p-6 text-center">
          <h1 className="text-2xl font-extrabold text-amber-600">Нямаш избран профил</h1>
          <p className="mt-2 text-gray-600">Моля, създай или избери профил, за да започнеш мисиите.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/profiles" className="btn btn-primary">Към профили</Link>
            <Link to="/" className="btn">Начало</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-5xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-amber-600">Мисии</h1>
            <p className="text-sm text-gray-600">Точки: <span className="font-bold text-amber-700">{activeProfile.points}</span></p>
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
            const done = !!activeProfile.completed[id]
            return (
              <article key={id} className={`card ${done ? 'opacity-75' : ''}`}>
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{e.name}</h3>
                  <button className={`btn ${done ? 'bg-green-600 text-white' : 'btn-primary'}`} onClick={() => toggleMissionComplete(id)}>
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

