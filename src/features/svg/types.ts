export type SvgShapeType = 'rect'

export interface SvgBaseShape {
  id: string
  type: SvgShapeType
  x: number
  y: number
  fill: string
}

export interface SvgRect extends SvgBaseShape {
  type: 'rect'
  width: number
  height: number
}

export type SvgShape = SvgRect

export interface SvgDocument {
  shapes: SvgShape[]
  selectedId: string | null
}
