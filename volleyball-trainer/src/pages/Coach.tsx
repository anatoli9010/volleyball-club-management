import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadExercises, type Exercise } from '../utils/csv'

export default function Coach() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    loadExercises().then(setExercises)
  }, [])

  const categories = useMemo(() => Array.from(new Set(exercises.map(e => e.category).filter(Boolean))), [exercises])
  const levels = useMemo(() => Array.from(new Set(exercises.map(e => e.level).filter(Boolean))), [exercises])
  const times = useMemo(() => Array.from(new Set(exercises.map(e => e.time).filter(Boolean))), [exercises])

  const filtered = useMemo(() => {
    return exercises.filter(e => {
      const matchesQuery = query ? (e.name + ' ' + e.description).toLowerCase().includes(query.toLowerCase()) : true
      const matchesCat = category ? e.category === category : true
      const matchesLevel = level ? e.level === level : true
      const matchesTime = time ? e.time === time : true
      return matchesQuery && matchesCat && matchesLevel && matchesTime
    })
  }, [exercises, query, category, level, time])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Упражнения</h1>
          <Link to="/" className="text-sm text-gray-600 hover:text-primary">← Начало</Link>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
          <input
            className="rounded-xl border border-gray-300 px-3 py-2"
            placeholder="Търсене..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select className="rounded-xl border border-gray-300 px-3 py-2" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Категория</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select className="rounded-xl border border-gray-300 px-3 py-2" value={level} onChange={e => setLevel(e.target.value)}>
            <option value="">Ниво</option>
            {levels.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select className="rounded-xl border border-gray-300 px-3 py-2" value={time} onChange={e => setTime(e.target.value)}>
            <option value="">Време</option>
            {times.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <article key={e.name + e.category} className="card">
              <h3 className="text-lg font-semibold">{e.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{e.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                {e.category && <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">{e.category}</span>}
                {e.level && <span className="rounded-full bg-green-50 px-2 py-1 text-green-700">{e.level}</span>}
                {e.time && <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">{e.time}</span>}
              </div>
              {e.video && (
                <a href={e.video} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-primary hover:underline">Видео</a>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

