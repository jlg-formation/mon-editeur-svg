import { useSvgStore } from './store'

export default function Toolbar() {
  const addRect = useSvgStore((s) => s.addRect)
  const removeSelected = useSvgStore((s) => s.removeSelected)
  const selectedId = useSvgStore((s) => s.selectedId)

  return (
    <div className="flex gap-2">
      <button
        className="rounded bg-yellow-400 px-2 py-1 hover:bg-yellow-500"
        onClick={addRect}
      >
        Ajouter un rectangle
      </button>
      <button
        className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600 disabled:opacity-50"
        onClick={removeSelected}
        disabled={!selectedId}
      >
        Supprimer la sélection
      </button>
    </div>
  )
}
