export type SvgShapeType =
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'line'
  | 'polygon'
  | 'text'

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

export interface SvgCircle extends SvgBaseShape {
  type: 'circle'
  radius: number
}

export interface SvgEllipse extends SvgBaseShape {
  type: 'ellipse'
  rx: number
  ry: number
}

export interface SvgLine extends SvgBaseShape {
  type: 'line'
  x2: number
  y2: number
}

export interface SvgPolygon extends SvgBaseShape {
  type: 'polygon'
  points: { x: number; y: number }[]
}

export interface SvgText extends SvgBaseShape {
  type: 'text'
  text: string
}

export type SvgShape =
  | SvgRect
  | SvgCircle
  | SvgEllipse
  | SvgLine
  | SvgPolygon
  | SvgText

export interface SvgDocument {
  shapes: SvgShape[]
  selectedId: string | null
}
