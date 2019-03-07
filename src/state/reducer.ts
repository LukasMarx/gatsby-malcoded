import { ThemeState, theme } from './reducers/theme.reducer'

export interface AppState {
  theme: ThemeState
}

export const reducer = {
  theme,
}
