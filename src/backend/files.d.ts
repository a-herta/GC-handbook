declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

declare module '*.webp' {
  const ref: string
  export default ref
}

declare module '*.csv' {
  const content: Record<string, unknown>[]
  export default content
}
