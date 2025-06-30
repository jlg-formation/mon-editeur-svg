import { useSvgStore } from './store'
import type { SvgRect } from './types'
import { useState } from 'react'

export default function SvgCanvas() {
  const shapes = useSvgStore((s) => s.shapes)
  const selectedId = useSvgStore((s) => s.selectedId)
  const selectShape = useSvgStore((s) => s.selectShape)
  const showGrid = useSvgStore((s) => s.showGrid)
  const zoom = useSvgStore((s) => s.zoom)
  const setZoom = useSvgStore((s) => s.setZoom)
  const pan = useSvgStore((s) => s.pan)
  const setPan = useSvgStore((s) => s.setPan)

  const [panning, setPanning] = useState(false)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

  const onWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault()
    const factor = e.deltaY < 0 ? 1.1 : 0.9
    const newZoom = Math.min(5, Math.max(0.2, zoom * factor))
    setZoom(newZoom)
  }

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    setPanning(true)
    setLastPos({ x: e.clientX, y: e.clientY })
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!panning || !lastPos) return
    const dx = e.clientX - lastPos.x
    const dy = e.clientY - lastPos.y
    setPan({ x: pan.x + dx, y: pan.y + dy })
    setLastPos({ x: e.clientX, y: e.clientY })
  }

  const endPan = (e: React.PointerEvent<SVGSVGElement>) => {
    setPanning(false)
    setLastPos(null)
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  return (
    <svg
      width={400}
      height={300}
      className="border border-gray-300 bg-gray-100"
      tabIndex={0}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPan}
      onPointerLeave={endPan}
    >
      <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
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
      </g>
    </svg>
  )
}
