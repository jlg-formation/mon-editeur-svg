import { useSvgStore } from './store'
import type {
  SvgRect,
  SvgCircle,
  SvgEllipse,
  SvgLine,
  SvgPolygon,
  SvgText,
} from './types'
import { useRef, useState } from 'react'
import { applyZoom } from './utils'

export default function SvgCanvas() {
  const shapes = useSvgStore((s) => s.shapes)
  const selectedIds = useSvgStore((s) => s.selectedIds)
  const toggle = useSvgStore((s) => s.toggleShapeSelection)
  const showGrid = useSvgStore((s) => s.showGrid)
  const zoom = useSvgStore((s) => s.zoom)
  const setZoom = useSvgStore((s) => s.setZoom)
  const pan = useSvgStore((s) => s.pan)
  const setPan = useSvgStore((s) => s.setPan)

  const [panning, setPanning] = useState(false)
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)

  const svgRef = useRef<SVGSVGElement | null>(null)

  const onWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault()
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const center = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    const factor = e.deltaY < 0 ? 1.1 : 0.9
    const { zoom: newZoom, pan: newPan } = applyZoom(zoom, pan, factor, center)
    setZoom(newZoom)
    setPan(newPan)
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
      ref={svgRef}
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
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </>
        )}
        {shapes.map((shape) => {
          switch (shape.type) {
            case 'rect': {
              const rect = shape as SvgRect
              const isSelected = selectedIds.includes(rect.id)
              const isHover = hoverId === rect.id
              return (
                <rect
                  key={rect.id}
                  x={rect.x}
                  y={rect.y}
                  width={rect.width}
                  height={rect.height}
                  fill={rect.fill}
                  stroke={isSelected ? '#2563eb' : isHover ? '#94a3b8' : '#444'}
                  strokeWidth={isSelected ? 3 : 1}
                  onMouseEnter={() => setHoverId(rect.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => toggle(rect.id)}
                  style={{ cursor: 'pointer' }}
                />
              )
            }
            case 'circle': {
              const c = shape as SvgCircle
              const isSelected = selectedIds.includes(c.id)
              const isHover = hoverId === c.id
              return (
                <circle
                  key={c.id}
                  cx={c.x}
                  cy={c.y}
                  r={c.radius}
                  fill={c.fill}
                  stroke={isSelected ? '#2563eb' : isHover ? '#94a3b8' : '#444'}
                  strokeWidth={isSelected ? 3 : 1}
                  onMouseEnter={() => setHoverId(c.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => toggle(c.id)}
                  style={{ cursor: 'pointer' }}
                />
              )
            }
            case 'ellipse': {
              const el = shape as SvgEllipse
              const isSelected = selectedIds.includes(el.id)
              const isHover = hoverId === el.id
              return (
                <ellipse
                  key={el.id}
                  cx={el.x}
                  cy={el.y}
                  rx={el.rx}
                  ry={el.ry}
                  fill={el.fill}
                  stroke={isSelected ? '#2563eb' : isHover ? '#94a3b8' : '#444'}
                  strokeWidth={isSelected ? 3 : 1}
                  onMouseEnter={() => setHoverId(el.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => toggle(el.id)}
                  style={{ cursor: 'pointer' }}
                />
              )
            }
            case 'line': {
              const ln = shape as SvgLine
              const isSelected = selectedIds.includes(ln.id)
              const isHover = hoverId === ln.id
              return (
                <line
                  key={ln.id}
                  x1={ln.x}
                  y1={ln.y}
                  x2={ln.x2}
                  y2={ln.y2}
                  stroke={
                    isSelected ? '#2563eb' : isHover ? '#94a3b8' : ln.fill
                  }
                  strokeWidth={isSelected ? 3 : 1}
                  onMouseEnter={() => setHoverId(ln.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => toggle(ln.id)}
                  style={{ cursor: 'pointer' }}
                />
              )
            }
            case 'polygon': {
              const poly = shape as SvgPolygon
              const points = poly.points.map((p) => `${p.x},${p.y}`).join(' ')
              const isSelected = selectedIds.includes(poly.id)
              const isHover = hoverId === poly.id
              return (
                <polygon
                  key={poly.id}
                  points={points}
                  fill={poly.fill}
                  stroke={isSelected ? '#2563eb' : isHover ? '#94a3b8' : '#444'}
                  strokeWidth={isSelected ? 3 : 1}
                  onMouseEnter={() => setHoverId(poly.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => toggle(poly.id)}
                  style={{ cursor: 'pointer' }}
                />
              )
            }
            case 'text': {
              const t = shape as SvgText
              const isSelected = selectedIds.includes(t.id)
              const isHover = hoverId === t.id
              return (
                <text
                  key={t.id}
                  x={t.x}
                  y={t.y}
                  fill={t.fill}
                  fontSize="16"
                  stroke={isSelected ? '#2563eb' : isHover ? '#94a3b8' : 'none'}
                  strokeWidth={isSelected ? 1 : 0}
                  onMouseEnter={() => setHoverId(t.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => toggle(t.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {t.text}
                </text>
              )
            }
            default:
              return null
          }
        })}
      </g>
    </svg>
  )
}
