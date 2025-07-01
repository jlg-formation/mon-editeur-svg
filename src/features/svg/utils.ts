export function applyZoom(
  zoom: number,
  pan: { x: number; y: number },
  factor: number,
  center: { x: number; y: number }
) {
  const newZoom = Math.min(5, Math.max(0.2, zoom * factor))
  const dx = (center.x - pan.x) / zoom
  const dy = (center.y - pan.y) / zoom
  return {
    zoom: newZoom,
    pan: {
      x: center.x - dx * newZoom,
      y: center.y - dy * newZoom,
    },
  }
}

export interface Bounds {
  x: number
  y: number
  width: number
  height: number
}

export function getShapeBounds(shape: import('./types').SvgShape): Bounds {
  switch (shape.type) {
    case 'rect':
      return { x: shape.x, y: shape.y, width: shape.width, height: shape.height }
    case 'circle':
      return {
        x: shape.x - shape.radius,
        y: shape.y - shape.radius,
        width: shape.radius * 2,
        height: shape.radius * 2,
      }
    case 'ellipse':
      return {
        x: shape.x - shape.rx,
        y: shape.y - shape.ry,
        width: shape.rx * 2,
        height: shape.ry * 2,
      }
    case 'line':
      return {
        x: Math.min(shape.x, shape.x2),
        y: Math.min(shape.y, shape.y2),
        width: Math.abs(shape.x2 - shape.x) || 1,
        height: Math.abs(shape.y2 - shape.y) || 1,
      }
    case 'polygon': {
      const xs = shape.points.map((p) => p.x)
      const ys = shape.points.map((p) => p.y)
      const minX = Math.min(...xs)
      const maxX = Math.max(...xs)
      const minY = Math.min(...ys)
      const maxY = Math.max(...ys)
      return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
    }
    case 'text':
      // Approximate text as a 0x0 box for now
      return { x: shape.x, y: shape.y, width: 1, height: 1 }
    default:
      return { x: 0, y: 0, width: 1, height: 1 }
  }
}

export function getShapesBounds(shapes: import('./types').SvgShape[]): Bounds {
  if (shapes.length === 0) {
    return { x: 0, y: 0, width: 1, height: 1 }
  }
  const bounds = shapes.map(getShapeBounds)
  const minX = Math.min(...bounds.map((b) => b.x))
  const minY = Math.min(...bounds.map((b) => b.y))
  const maxX = Math.max(...bounds.map((b) => b.x + b.width))
  const maxY = Math.max(...bounds.map((b) => b.y + b.height))
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
}

export function computeFitView(bounds: Bounds, w: number, h: number) {
  const padding = 20
  const bw = bounds.width + padding * 2
  const bh = bounds.height + padding * 2
  const zoom = Math.min(5, Math.min(w / bw, h / bh))
  const cx = bounds.x + bounds.width / 2
  const cy = bounds.y + bounds.height / 2
  const pan = { x: w / 2 - cx * zoom, y: h / 2 - cy * zoom }
  return { zoom, pan }
}
