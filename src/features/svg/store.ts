import { create } from 'zustand'
import type { SvgDocument, SvgShape, SvgRect } from './types'

interface SvgUiState {
  showGrid: boolean
}

type SvgActions = {
  addRect: () => void
  selectShape: (id: string | null) => void
  removeSelected: () => void
  updateShape: (id: string, patch: Partial<SvgShape>) => void // Ajout
  toggleGrid: () => void
}

const initialDoc: SvgDocument = {
  shapes: [],
  selectedId: null,
}

export const useSvgStore = create<SvgDocument & SvgUiState & SvgActions>((set, get) => ({
  ...initialDoc,
  showGrid: false,
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
}))
