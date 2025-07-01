import { useEffect } from 'react'
import Toolbar from './features/svg/Toolbar'
import SvgCanvas from './features/svg/SvgCanvas'
import OutlinePanel from './features/svg/OutlinePanel'
import ShapePropertiesPanel from './features/svg/ShapePropertiesPanel'
import { useSvgStore } from './features/svg/store'
import {
  computeFitView,
  getShapeBounds,
  getShapesBounds,
} from './features/svg/utils'

export default function App() {
  const shapes = useSvgStore((s) => s.shapes)
  const selectedIds = useSvgStore((s) => s.selectedIds)
  const setZoom = useSvgStore((s) => s.setZoom)
  const setPan = useSvgStore((s) => s.setPan)

  const selectedShape = shapes.find((s) => s.id === selectedIds[0]) || null

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '0') {
        e.preventDefault()
        setZoom(1)
        setPan({ x: 0, y: 0 })
      } else if (e.shiftKey && e.key === '1') {
        e.preventDefault()
        if (shapes.length > 0) {
          const { zoom, pan } = computeFitView(
            getShapesBounds(shapes),
            400,
            300,
          )
          setZoom(zoom)
          setPan(pan)
        }
      } else if (e.shiftKey && e.key === '2') {
        if (selectedShape) {
          e.preventDefault()
          const { zoom, pan } = computeFitView(
            getShapeBounds(selectedShape),
            400,
            300,
          )
          setZoom(zoom)
          setPan(pan)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shapes, selectedShape, setZoom, setPan])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="flex items-center justify-between bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Éditeur SVG React</h1>
        <Toolbar />
      </header>
      <main className="flex flex-1 items-stretch justify-center">
        <OutlinePanel />
        <div className="flex items-center rounded bg-white p-4 shadow">
          <SvgCanvas />
        </div>
        <ShapePropertiesPanel />
      </main>
      <footer className="p-4 text-center text-sm text-gray-500">
        © 2025 - Éditeur SVG React
      </footer>
    </div>
  )
}
