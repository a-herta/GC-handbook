import type emitter from './backend/events'
import type { navigate } from './backend/events'

declare global {
  interface Window {
    hide: string[]
    emitter: typeof emitter
    navigate: typeof navigate
  }
}
