import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-3xl p-6 text-center">
        <h1 className="mt-12 text-4xl font-extrabold text-primary">VolleyKids</h1>
        <p className="mt-2 text-gray-600">Изберете роля, за да започнете</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Link to="/coach" className="card hover:shadow-md">
            <div className="flex h-40 flex-col items-center justify-center">
              <span className="text-2xl font-bold text-primary">Треньор</span>
              <span className="mt-2 text-sm text-gray-500">Управлявайте упражненията</span>
            </div>
          </Link>
          <Link to="/child" className="card hover:shadow-md">
            <div className="flex h-40 flex-col items-center justify-center">
              <span className="text-2xl font-bold text-accent">Дете</span>
              <span className="mt-2 text-sm text-gray-500">Игрови мисии</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

