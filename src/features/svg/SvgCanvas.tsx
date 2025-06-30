import { useSvgStore } from './store'
import type { SvgRect } from './types'

export default function SvgCanvas() {
  const shapes = useSvgStore((s) => s.shapes)
  const selectedId = useSvgStore((s) => s.selectedId)
  const selectShape = useSvgStore((s) => s.selectShape)

  return (
    <svg
      width={400}
      height={300}
      className="border border-gray-300 bg-gray-100"
      tabIndex={0}
    >
      {shapes.map((shape) => {
        if (shape.type === 'rect') {
          const rect = shape as SvgRect
          return (
            <rect
              key={rect.id}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill={rect.fill}
              stroke={rect.id === selectedId ? '#2563eb' : '#444'}
              strokeWidth={rect.id === selectedId ? 3 : 1}
              onClick={() => selectShape(rect.id)}
              style={{ cursor: 'pointer' }}
            />
          )
        }
        return null
      })}
    </svg>
  )
}
