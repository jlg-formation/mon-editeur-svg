import { create } from 'zustand'
import type {
  SvgDocument,
  SvgShape,
  SvgRect,
  SvgCircle,
  SvgEllipse,
  SvgLine,
  SvgPolygon,
  SvgText,
} from './types'

interface SvgUiState {
  showGrid: boolean
  zoom: number
  pan: { x: number; y: number }
}

type SvgActions = {
  addRect: () => void
  addCircle: () => void
  addEllipse: () => void
  addLine: () => void
  addPolygon: () => void
  addText: () => void
  selectShape: (id: string | null) => void
  removeSelected: () => void
  updateShape: (id: string, patch: Partial<SvgShape>) => void // Ajout
  toggleGrid: () => void
  setZoom: (zoom: number) => void
  setPan: (pan: { x: number; y: number }) => void
}

const initialDoc: SvgDocument = {
  shapes: [],
  selectedId: null,
}

export const useSvgStore = create<SvgDocument & SvgUiState & SvgActions>(
  (set, get) => ({
    ...initialDoc,
    showGrid: false,
    zoom: 1,
    pan: { x: 0, y: 0 },
    addRect: () => {
      const newRect: SvgRect = {
        id: crypto.randomUUID(),
        type: 'rect',
        x: 120 + Math.random() * 100,
        y: 80 + Math.random() * 100,
        width: 80,
        height: 60,
        fill: '#fbbf24',
      }
      set((state) => ({
        shapes: [...state.shapes, newRect],
        selectedId: newRect.id,
      }))
    },
    addCircle: () => {
      const newCircle: SvgCircle = {
        id: crypto.randomUUID(),
        type: 'circle',
        x: 150 + Math.random() * 100,
        y: 100 + Math.random() * 100,
        radius: 40,
        fill: '#f87171',
      }
      set((state) => ({
        shapes: [...state.shapes, newCircle],
        selectedId: newCircle.id,
      }))
    },
    addEllipse: () => {
      const newEllipse: SvgEllipse = {
        id: crypto.randomUUID(),
        type: 'ellipse',
        x: 160 + Math.random() * 100,
        y: 90 + Math.random() * 100,
        rx: 50,
        ry: 30,
        fill: '#34d399',
      }
      set((state) => ({
        shapes: [...state.shapes, newEllipse],
        selectedId: newEllipse.id,
      }))
    },
    addLine: () => {
      const newLine: SvgLine = {
        id: crypto.randomUUID(),
        type: 'line',
        x: 120 + Math.random() * 100,
        y: 120 + Math.random() * 100,
        x2: 220 + Math.random() * 100,
        y2: 170 + Math.random() * 100,
        fill: '#000000',
      }
      set((state) => ({
        shapes: [...state.shapes, newLine],
        selectedId: newLine.id,
      }))
    },
    addPolygon: () => {
      const baseX = 150 + Math.random() * 100
      const baseY = 120 + Math.random() * 100
      const newPolygon: SvgPolygon = {
        id: crypto.randomUUID(),
        type: 'polygon',
        x: baseX,
        y: baseY,
        points: [
          { x: baseX, y: baseY - 40 },
          { x: baseX - 40, y: baseY + 40 },
          { x: baseX + 40, y: baseY + 40 },
        ],
        fill: '#a78bfa',
      }
      set((state) => ({
        shapes: [...state.shapes, newPolygon],
        selectedId: newPolygon.id,
      }))
    },
    addText: () => {
      const newText: SvgText = {
        id: crypto.randomUUID(),
        type: 'text',
        x: 140 + Math.random() * 100,
        y: 140 + Math.random() * 100,
        text: 'Texte',
        fill: '#1d4ed8',
      }
      set((state) => ({
        shapes: [...state.shapes, newText],
        selectedId: newText.id,
      }))
    },
    selectShape: (id) => set({ selectedId: id }),
    removeSelected: () => {
      const { selectedId, shapes } = get()
      if (!selectedId) return
      set({
        shapes: shapes.filter((s) => s.id !== selectedId),
        selectedId: null,
      })
    },
    updateShape: (id, patch) => {
      set((state) => ({
        shapes: state.shapes.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      }))
    },
    toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
    setZoom: (zoom) => set({ zoom }),
    setPan: (pan) => set({ pan }),
  }),
)
