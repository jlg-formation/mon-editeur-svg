import { useSvgStore } from './store'
import type { SvgRect } from './types'

export default function SvgCanvas() {
  const shapes = useSvgStore((s) => s.shapes)
  const selectedId = useSvgStore((s) => s.selectedId)
  const selectShape = useSvgStore((s) => s.selectShape)
  const showGrid = useSvgStore((s) => s.showGrid)

  return (
    <svg
      width={400}
      height={300}
      className="border border-gray-300 bg-gray-100"
      tabIndex={0}
    >
      {showGrid && (
        <>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d1d5db" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </>
      )}
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
