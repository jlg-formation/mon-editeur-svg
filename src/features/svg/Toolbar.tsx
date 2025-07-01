import { useSvgStore } from './store'
import { applyZoom, computeFitView, getShapeBounds, getShapesBounds } from './utils'

export default function Toolbar() {
  const addRect = useSvgStore((s) => s.addRect)
  const removeSelected = useSvgStore((s) => s.removeSelected)
  const selectedId = useSvgStore((s) => s.selectedId)
  const toggleGrid = useSvgStore((s) => s.toggleGrid)
  const showGrid = useSvgStore((s) => s.showGrid)
  const zoom = useSvgStore((s) => s.zoom)
  const setZoom = useSvgStore((s) => s.setZoom)
  const pan = useSvgStore((s) => s.pan)
  const setPan = useSvgStore((s) => s.setPan)
  const shapes = useSvgStore((s) => s.shapes)

  const selectedShape = shapes.find((s) => s.id === selectedId) || null

  return (
    <div className="flex gap-2">
      <button
        className="rounded bg-yellow-400 px-2 py-1 hover:bg-yellow-500"
        onClick={addRect}
      >
        Ajouter un rectangle
      </button>
      <button
        className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 disabled:opacity-50"
        onClick={removeSelected}
        disabled={!selectedId}
      >
        Supprimer la sélection
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={toggleGrid}
      >
        {showGrid ? 'Masquer' : 'Afficher'} la grille
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={() => {
          const { zoom: z, pan: p } = applyZoom(zoom, pan, 1.1, {
            x: 200,
            y: 150,
          })
          setZoom(z)
          setPan(p)
        }}
      >
        Zoom +
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={() => {
          const { zoom: z, pan: p } = applyZoom(zoom, pan, 0.9, {
            x: 200,
            y: 150,
          })
          setZoom(z)
          setPan(p)
        }}
      >
        Zoom -
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={() => {
          setZoom(1)
          setPan({ x: 0, y: 0 })
        }}
      >
        Zoom 100%
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={() => {
          if (shapes.length === 0) return
          const { zoom: z, pan: p } = computeFitView(
            getShapesBounds(shapes),
            400,
            300,
          )
          setZoom(z)
          setPan(p)
        }}
      >
        Tout voir
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={() => {
          if (!selectedShape) return
          const { zoom: z, pan: p } = computeFitView(
            getShapeBounds(selectedShape),
            400,
            300,
          )
          setZoom(z)
          setPan(p)
        }}
        disabled={!selectedShape}
      >
        Voir sélection
      </button>
      <span className="flex items-center text-sm text-gray-600">
        {Math.round(zoom * 100)}%
      </span>
    </div>
  )
}
