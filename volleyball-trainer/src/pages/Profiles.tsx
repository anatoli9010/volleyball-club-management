import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProfiles } from '../context/ProfilesContext'

export default function ProfilesPage() {
  const { state, activeProfile, createProfile, selectProfile, deleteProfile, renameProfile } = useProfiles()
  const [name, setName] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Профили</h1>
          <Link to="/" className="text-sm text-gray-600 hover:text-primary">← Начало</Link>
        </div>

        <div className="mb-4 flex gap-2">
          <input className="flex-1 rounded-xl border border-gray-300 px-3 py-2" placeholder="Име на дете" value={name} onChange={e => setName(e.target.value)} />
          <button className="btn btn-primary" onClick={() => { if (name.trim()) { createProfile(name.trim()); setName('') } }}>Добави</button>
        </div>

        <ul className="space-y-2">
          {Object.values(state.profiles).map(p => (
            <li key={p.id} className={`card flex items-center justify-between ${activeProfile?.id === p.id ? 'ring-2 ring-primary' : ''}`}>
              <div className="flex items-center gap-3">
                <input
                  className="rounded-xl border border-gray-300 px-2 py-1"
                  value={p.name}
                  onChange={(e) => renameProfile(p.id, e.target.value)}
                />
                <span className="text-sm text-gray-600">Точки: {p.points}</span>
              </div>
              <div className="flex gap-2">
                <button className="btn" onClick={() => { selectProfile(p.id); navigate('/child') }}>Избери</button>
                <button className="btn bg-red-600 text-white" onClick={() => deleteProfile(p.id)}>Изтрий</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

