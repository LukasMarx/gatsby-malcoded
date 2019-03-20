import {
  createStore as reduxCreateStore,
  Store,
  AnyAction,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { AppState, reducer } from './reducer'
import { devToolsEnhancer, composeWithDevTools } from 'redux-devtools-extension'
import { defaultPrimaryColor } from '../theme/colors'
import { Token } from '../models/Token'
import { CommentMiddleware } from './middleware/comment.middleware'

const initialState: AppState = {
  theme: {
    darkMode: false,
    primaryColor: defaultPrimaryColor,
  },
  auth: {
    token: null,
    user: null,
  },
  comment: {
    commentsByPost: {},
    loadingByPost: {},
  },
}

if (typeof window !== 'undefined') {
  const stringToken = localStorage.getItem('token')
  if (stringToken) {
    const rawToken: Token = JSON.parse(stringToken)
    const token = rawToken.access_token
    const user = rawToken.user

    initialState.auth.token = token
    initialState.auth.user = user
  }
}

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

const createStore = () => {
  const store: Store<AppState, AnyAction> = reduxCreateStore(
    combineReducers(reducer),
    initialState,
    composeEnhancers(
      applyMiddleware(CommentMiddleware)
      // other store enhancers if any
    )
  )

  return store
}
export default createStore
