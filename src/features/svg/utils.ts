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
