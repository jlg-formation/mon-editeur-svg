import { useSvgStore } from './store'
import type { SvgRect } from './types'

export default function ShapePropertiesPanel() {
  const shapes = useSvgStore((s) => s.shapes)
  const selectedIds = useSvgStore((s) => s.selectedIds)
  const updateShape = useSvgStore((s) => s.updateShape)

  const selected = shapes.find((s) => s.id === selectedIds[0])

  if (!selected) {
    return (
      <aside
        aria-label="Propriétés de la forme"
        className="h-full w-64 border-l border-gray-200 bg-white p-4"
      >
        <div className="text-gray-400">
          Sélectionnez une forme pour éditer ses propriétés
        </div>
      </aside>
    )
  }

  if (selected.type === 'rect') {
    const rect = selected as SvgRect
    return (
      <aside
        aria-label="Propriétés du rectangle"
        className="h-full w-64 border-l border-gray-200 bg-white p-4"
      >
        <h2 className="mb-2 text-lg font-semibold">Rectangle</h2>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col text-sm">
            X
            <input
              type="number"
              value={rect.x}
              onChange={(e) =>
                updateShape(rect.id, { x: Number(e.target.value) })
              }
              className="mt-1 rounded border p-1"
              aria-label="Position X"
            />
          </label>
          <label className="flex flex-col text-sm">
            Y
            <input
              type="number"
              value={rect.y}
              onChange={(e) =>
                updateShape(rect.id, { y: Number(e.target.value) })
              }
              className="mt-1 rounded border p-1"
              aria-label="Position Y"
            />
          </label>
          <label className="flex flex-col text-sm">
            Largeur
            <input
              type="number"
              value={rect.width}
              onChange={(e) =>
                updateShape(rect.id, { width: Number(e.target.value) })
              }
              className="mt-1 rounded border p-1"
              aria-label="Largeur"
              min={1}
            />
          </label>
          <label className="flex flex-col text-sm">
            Hauteur
            <input
              type="number"
              value={rect.height}
              onChange={(e) =>
                updateShape(rect.id, { height: Number(e.target.value) })
              }
              className="mt-1 rounded border p-1"
              aria-label="Hauteur"
              min={1}
            />
          </label>
          <label className="flex flex-col text-sm">
            Couleur de remplissage
            <input
              type="color"
              value={rect.fill}
              onChange={(e) => updateShape(rect.id, { fill: e.target.value })}
              className="mt-1 h-8 w-8 border-none p-0"
              aria-label="Couleur de remplissage"
            />
          </label>
        </div>
      </aside>
    )
  }

  // Pour d'autres types de formes:
  return null
}
