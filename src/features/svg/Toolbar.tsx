import { useSvgStore } from './store'

export default function Toolbar() {
  const addRect = useSvgStore((s) => s.addRect)
  const removeSelected = useSvgStore((s) => s.removeSelected)
  const selectedId = useSvgStore((s) => s.selectedId)
  const toggleGrid = useSvgStore((s) => s.toggleGrid)
  const showGrid = useSvgStore((s) => s.showGrid)
  const zoom = useSvgStore((s) => s.zoom)
  const setZoom = useSvgStore((s) => s.setZoom)

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
        onClick={() => setZoom(zoom * 1.1)}
      >
        Zoom +
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={() => setZoom(zoom * 0.9)}
      >
        Zoom -
      </button>
      <span className="flex items-center text-sm text-gray-600">
        {Math.round(zoom * 100)}%
      </span>
    </div>
  )
}
