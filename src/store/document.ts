import { create } from 'zustand'
import type { SvgDocument } from '../features/svg/types'

export interface DocumentState {
  document: SvgDocument
}

export interface DocumentActions {
  newDocument: () => void
  importDocument: (doc: SvgDocument) => void
  exportDocument: () => string
}

const emptyDoc: SvgDocument = { shapes: [], selectedId: null }

export const useDocumentStore = create<DocumentState & DocumentActions>((set, get) => ({
  document: emptyDoc,
  newDocument: () => set({ document: emptyDoc }),
  importDocument: (doc) => set({ document: doc }),
  exportDocument: () => JSON.stringify(get().document),
}))
