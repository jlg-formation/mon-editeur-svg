import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Éditeur SVG React</h1>
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => setCount((c) => c + 1)}
        >
          Compteur : {count}
        </button>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="rounded bg-white p-4 shadow">
          <svg
            width={400}
            height={300}
            className="border border-gray-300 bg-gray-100"
          >
            <rect
              x={80}
              y={60}
              width={240}
              height={120}
              fill="#93c5fd"
              stroke="#2563eb"
              strokeWidth={2}
            />
            <text
              x={200}
              y={130}
              textAnchor="middle"
              fontSize={24}
              fill="#1e40af"
            >
              Hello SVG
            </text>
          </svg>
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">
        © 2025 - Éditeur SVG React
      </footer>
    </div>
  )
}
