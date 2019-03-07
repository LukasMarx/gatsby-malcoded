import {
  createStore as reduxCreateStore,
  Store,
  AnyAction,
  combineReducers,
} from 'redux'
import { AppState, reducer } from './reducer'

const initialState: AppState = {
  theme: {
    darkMode: false,
    primaryColor: {
      main: '#c40030',
      light: '#ff0f4b',
      dark: '#a3000e',
      contrast: '#fff',
    },
  },
}

const createStore = () => {
  const store: Store<AppState, AnyAction> = reduxCreateStore(
    combineReducers(reducer),
    initialState
  )

  return store
}
export default createStore
