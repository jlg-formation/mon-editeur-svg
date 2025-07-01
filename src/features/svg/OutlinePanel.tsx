import { useSvgStore } from './store'
import type { SvgShape } from './types'

const LABELS: Record<SvgShape['type'], string> = {
  rect: 'Rectangle',
  circle: 'Cercle',
  ellipse: 'Ellipse',
  line: 'Ligne',
  polygon: 'Polygone',
  text: 'Texte',
}

export default function OutlinePanel() {
  const shapes = useSvgStore((s) => s.shapes)
  const selectedIds = useSvgStore((s) => s.selectedIds)
  const toggle = useSvgStore((s) => s.toggleShapeSelection)

  return (
    <aside
      aria-label="Outline"
      className="h-full w-48 overflow-auto border-r border-gray-200 bg-white"
    >
      <table className="w-full text-sm">
        <tbody>
          {shapes.map((shape) => (
            <tr key={shape.id} className="border-b last:border-none">
              <td>
                <button
                  onClick={() => toggle(shape.id)}
                  className={`w-full px-2 py-1 text-left hover:bg-gray-100 ${
                    selectedIds.includes(shape.id) ? 'font-bold' : ''
                  }`}
                >
                  {shape.type === 'text' && 'text' in shape
                    ? shape.text
                    : LABELS[shape.type]}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  )
}
