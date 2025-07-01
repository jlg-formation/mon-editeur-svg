import { useSvgStore } from './store'
import type {
  SvgRect,
  SvgCircle,
  SvgEllipse,
  SvgLine,
  SvgPolygon,
  SvgText,
} from './types'

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

  switch (selected.type) {
    case 'rect': {
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
    case 'circle': {
      const c = selected as SvgCircle
      return (
        <aside
          aria-label="Propriétés du cercle"
          className="h-full w-64 border-l border-gray-200 bg-white p-4"
        >
          <h2 className="mb-2 text-lg font-semibold">Cercle</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col text-sm">
              X
              <input
                type="number"
                value={c.x}
                onChange={(e) =>
                  updateShape(c.id, { x: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Position X"
              />
            </label>
            <label className="flex flex-col text-sm">
              Y
              <input
                type="number"
                value={c.y}
                onChange={(e) =>
                  updateShape(c.id, { y: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Position Y"
              />
            </label>
            <label className="flex flex-col text-sm">
              Rayon
              <input
                type="number"
                value={c.radius}
                onChange={(e) =>
                  updateShape(c.id, { radius: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Rayon"
                min={1}
              />
            </label>
            <label className="flex flex-col text-sm">
              Couleur de remplissage
              <input
                type="color"
                value={c.fill}
                onChange={(e) => updateShape(c.id, { fill: e.target.value })}
                className="mt-1 h-8 w-8 border-none p-0"
                aria-label="Couleur de remplissage"
              />
            </label>
          </div>
        </aside>
      )
    }
    case 'ellipse': {
      const el = selected as SvgEllipse
      return (
        <aside
          aria-label="Propriétés de l'ellipse"
          className="h-full w-64 border-l border-gray-200 bg-white p-4"
        >
          <h2 className="mb-2 text-lg font-semibold">Ellipse</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col text-sm">
              X
              <input
                type="number"
                value={el.x}
                onChange={(e) =>
                  updateShape(el.id, { x: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Position X"
              />
            </label>
            <label className="flex flex-col text-sm">
              Y
              <input
                type="number"
                value={el.y}
                onChange={(e) =>
                  updateShape(el.id, { y: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Position Y"
              />
            </label>
            <label className="flex flex-col text-sm">
              Rayon X
              <input
                type="number"
                value={el.rx}
                onChange={(e) =>
                  updateShape(el.id, { rx: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Rayon X"
                min={1}
              />
            </label>
            <label className="flex flex-col text-sm">
              Rayon Y
              <input
                type="number"
                value={el.ry}
                onChange={(e) =>
                  updateShape(el.id, { ry: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Rayon Y"
                min={1}
              />
            </label>
            <label className="flex flex-col text-sm">
              Couleur de remplissage
              <input
                type="color"
                value={el.fill}
                onChange={(e) => updateShape(el.id, { fill: e.target.value })}
                className="mt-1 h-8 w-8 border-none p-0"
                aria-label="Couleur de remplissage"
              />
            </label>
          </div>
        </aside>
      )
    }
    case 'line': {
      const ln = selected as SvgLine
      return (
        <aside
          aria-label="Propriétés de la ligne"
          className="h-full w-64 border-l border-gray-200 bg-white p-4"
        >
          <h2 className="mb-2 text-lg font-semibold">Ligne</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col text-sm">
              X1
              <input
                type="number"
                value={ln.x}
                onChange={(e) =>
                  updateShape(ln.id, { x: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="X1"
              />
            </label>
            <label className="flex flex-col text-sm">
              Y1
              <input
                type="number"
                value={ln.y}
                onChange={(e) =>
                  updateShape(ln.id, { y: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Y1"
              />
            </label>
            <label className="flex flex-col text-sm">
              X2
              <input
                type="number"
                value={ln.x2}
                onChange={(e) =>
                  updateShape(ln.id, { x2: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="X2"
              />
            </label>
            <label className="flex flex-col text-sm">
              Y2
              <input
                type="number"
                value={ln.y2}
                onChange={(e) =>
                  updateShape(ln.id, { y2: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Y2"
              />
            </label>
            <label className="flex flex-col text-sm">
              Couleur
              <input
                type="color"
                value={ln.fill}
                onChange={(e) => updateShape(ln.id, { fill: e.target.value })}
                className="mt-1 h-8 w-8 border-none p-0"
                aria-label="Couleur"
              />
            </label>
          </div>
        </aside>
      )
    }
    case 'polygon': {
      const poly = selected as SvgPolygon
      return (
        <aside
          aria-label="Propriétés du polygone"
          className="h-full w-64 border-l border-gray-200 bg-white p-4"
        >
          <h2 className="mb-2 text-lg font-semibold">Polygone</h2>
          <div className="flex flex-col gap-3">
            {poly.points.map((p, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <label className="flex flex-col">
                  X{i + 1}
                  <input
                    type="number"
                    value={p.x}
                    onChange={(e) => {
                      const pts = [...poly.points]
                      pts[i] = { ...pts[i], x: Number(e.target.value) }
                      updateShape(poly.id, { points: pts })
                    }}
                    className="mt-1 w-20 rounded border p-1"
                    aria-label={`Point ${i + 1} X`}
                  />
                </label>
                <label className="flex flex-col">
                  Y{i + 1}
                  <input
                    type="number"
                    value={p.y}
                    onChange={(e) => {
                      const pts = [...poly.points]
                      pts[i] = { ...pts[i], y: Number(e.target.value) }
                      updateShape(poly.id, { points: pts })
                    }}
                    className="mt-1 w-20 rounded border p-1"
                    aria-label={`Point ${i + 1} Y`}
                  />
                </label>
              </div>
            ))}
            <label className="flex flex-col text-sm">
              Couleur de remplissage
              <input
                type="color"
                value={poly.fill}
                onChange={(e) => updateShape(poly.id, { fill: e.target.value })}
                className="mt-1 h-8 w-8 border-none p-0"
                aria-label="Couleur de remplissage"
              />
            </label>
          </div>
        </aside>
      )
    }
    case 'text': {
      const t = selected as SvgText
      return (
        <aside
          aria-label="Propriétés du texte"
          className="h-full w-64 border-l border-gray-200 bg-white p-4"
        >
          <h2 className="mb-2 text-lg font-semibold">Texte</h2>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col text-sm">
              X
              <input
                type="number"
                value={t.x}
                onChange={(e) =>
                  updateShape(t.id, { x: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Position X"
              />
            </label>
            <label className="flex flex-col text-sm">
              Y
              <input
                type="number"
                value={t.y}
                onChange={(e) =>
                  updateShape(t.id, { y: Number(e.target.value) })
                }
                className="mt-1 rounded border p-1"
                aria-label="Position Y"
              />
            </label>
            <label className="flex flex-col text-sm">
              Contenu
              <input
                type="text"
                value={t.text}
                onChange={(e) => updateShape(t.id, { text: e.target.value })}
                className="mt-1 rounded border p-1"
                aria-label="Contenu du texte"
              />
            </label>
            <label className="flex flex-col text-sm">
              Couleur
              <input
                type="color"
                value={t.fill}
                onChange={(e) => updateShape(t.id, { fill: e.target.value })}
                className="mt-1 h-8 w-8 border-none p-0"
                aria-label="Couleur du texte"
              />
            </label>
          </div>
        </aside>
      )
    }
    default:
      return null
  }
}
