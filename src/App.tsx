import Toolbar from './features/svg/Toolbar'
import SvgCanvas from './features/svg/SvgCanvas'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Éditeur SVG React</h1>
        <Toolbar />
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="rounded bg-white p-4 shadow">
          <SvgCanvas />
        </div>
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">
        © 2025 - Éditeur SVG React
      </footer>
    </div>
  )
}
