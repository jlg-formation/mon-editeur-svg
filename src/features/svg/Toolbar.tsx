import { useSvgStore } from './store'
import {
  applyZoom,
  computeFitView,
  getShapeBounds,
  getShapesBounds,
} from './utils'
import {
  Circle,
  Egg,
  Focus,
  LayoutGrid,
  Maximize,
  Slash,
  Square,
  Target,
  Trash,
  Triangle,
  Type,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

export default function Toolbar() {
  const addRect = useSvgStore((s) => s.addRect)
  const addCircle = useSvgStore((s) => s.addCircle)
  const addEllipse = useSvgStore((s) => s.addEllipse)
  const addLine = useSvgStore((s) => s.addLine)
  const addPolygon = useSvgStore((s) => s.addPolygon)
  const addText = useSvgStore((s) => s.addText)
  const removeSelected = useSvgStore((s) => s.removeSelected)
  const selectedIds = useSvgStore((s) => s.selectedIds)
  const toggleGrid = useSvgStore((s) => s.toggleGrid)
  const showGrid = useSvgStore((s) => s.showGrid)
  const zoom = useSvgStore((s) => s.zoom)
  const setZoom = useSvgStore((s) => s.setZoom)
  const pan = useSvgStore((s) => s.pan)
  const setPan = useSvgStore((s) => s.setPan)
  const shapes = useSvgStore((s) => s.shapes)

  const selectedShape = shapes.find((s) => s.id === selectedIds[0]) || null

  return (
    <div className="flex gap-2">
      <button
        className="rounded bg-yellow-400 px-2 py-1 hover:bg-yellow-500"
        onClick={addRect}
        title="Ajouter un rectangle"
      >
        <Square className="h-5 w-5" />
      </button>
      <button
        className="rounded bg-yellow-400 px-2 py-1 hover:bg-yellow-500"
        onClick={addCircle}
        title="Ajouter un cercle"
      >
        <Circle className="h-5 w-5" />
      </button>
      <button
        className="rounded bg-yellow-400 px-2 py-1 hover:bg-yellow-500"
        onClick={addEllipse}
        title="Ajouter une ellipse"
      >
        <Egg className="h-5 w-5" />
      </button>
      <button
        className="rounded bg-yellow-400 px-2 py-1 hover:bg-yellow-500"
        onClick={addLine}
        title="Ajouter une ligne"
      >
        <Slash className="h-5 w-5" />
      </button>
      <button
        className="rounded bg-yellow-400 px-2 py-1 hover:bg-yellow-500"
        onClick={addPolygon}
        title="Ajouter un polygone"
      >
        <Triangle className="h-5 w-5" />
      </button>
      <button
        className="rounded bg-yellow-400 px-2 py-1 hover:bg-yellow-500"
        onClick={addText}
        title="Ajouter un texte"
      >
        <Type className="h-5 w-5" />
      </button>
      <button
        className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 disabled:opacity-50"
        onClick={removeSelected}
        disabled={selectedIds.length === 0}
        title="Supprimer la sélection"
      >
        <Trash className="h-5 w-5" />
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={toggleGrid}
        title={showGrid ? 'Masquer la grille' : 'Afficher la grille'}
      >
        <LayoutGrid className="h-5 w-5" />
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
        title="Zoomer"
      >
        <ZoomIn className="h-5 w-5" />
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
        title="Dézoomer"
      >
        <ZoomOut className="h-5 w-5" />
      </button>
      <button
        className="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
        onClick={() => {
          setZoom(1)
          setPan({ x: 0, y: 0 })
        }}
        title="Zoom 100%"
      >
        <Target className="h-5 w-5" />
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
        title="Tout voir"
      >
        <Maximize className="h-5 w-5" />
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
        title="Voir sélection"
      >
        <Focus className="h-5 w-5" />
      </button>
      <span className="flex items-center text-sm text-gray-600">
        {Math.round(zoom * 100)}%
      </span>
    </div>
  )
}
