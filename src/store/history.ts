import { create } from 'zustand'
import type { SvgDocument } from '../features/svg/types'

export interface HistoryState {
  past: SvgDocument[]
  present: SvgDocument
  future: SvgDocument[]
}

export interface HistoryActions {
  undo: () => void
  redo: () => void
  record: (doc: SvgDocument) => void
  reset: (doc?: SvgDocument) => void
}

const emptyDoc: SvgDocument = { shapes: [], selectedIds: [] }

export const useHistoryStore = create<HistoryState & HistoryActions>((set) => ({
  past: [],
  present: emptyDoc,
  future: [],
  undo: () =>
    set((state) => {
      if (state.past.length === 0) return state
      const previous = state.past[state.past.length - 1]
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
      }
    }),
  redo: () =>
    set((state) => {
      if (state.future.length === 0) return state
      const next = state.future[0]
      return {
        past: [...state.past, state.present],
        present: next,
        future: state.future.slice(1),
      }
    }),
  record: (doc) =>
    set((state) => ({
      past: [...state.past, state.present],
      present: doc,
      future: [],
    })),
  reset: (doc = emptyDoc) => set({ past: [], present: doc, future: [] }),
}))
