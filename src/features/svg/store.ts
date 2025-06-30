import { create } from 'zustand'
import type { SvgDocument, SvgRect } from './types'

type SvgActions = {
  addRect: () => void
  selectShape: (id: string | null) => void
  removeSelected: () => void
}

const initialDoc: SvgDocument = {
  shapes: [],
  selectedId: null,
}

export const useSvgStore = create<SvgDocument & SvgActions>((set, get) => ({
  ...initialDoc,
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
}))
