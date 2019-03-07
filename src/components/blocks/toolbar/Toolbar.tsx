import React, { Component } from 'react'
import styles from './Toolbar.module.css'
import { connect } from 'react-redux'
import { AppState } from '../../../state/reducer'
import { ThemeState } from '../../../state/reducers/theme.reducer'
import { darkBackground, lightBackground } from '../../../theme/background'
import { darkText, lightText } from '../../../theme/text'
import Button from '../../elements/button/Button'
import { toogleDarkMode } from '../../../state/actions/theme.actions'

export interface ToolbarProps {
  theme: ThemeState
  toggleDarkMode(): void
}

const mapStateToProps = (state: AppState) => {
  return {
    theme: state.theme,
  }
}

const mapDispatchToProps = dispatch => {
  return { toggleDarkMode: () => dispatch(toogleDarkMode()) }
}

class Toolbar extends Component<ToolbarProps> {
  constructor(props) {
    super(props)
    this.stlyes = this.stlyes.bind(this)
  }

  stlyes() {
    if (this.props.theme.darkMode) {
      return {
        backgroundColor: darkBackground.paper,
        color: darkText.primary,
      }
    } else {
      return {
        backgroundColor: lightBackground.paper,
        color: lightText.primary,
      }
    }
  }

  render() {
    return (
      <div className={styles.root} style={this.stlyes()}>
        <span id={styles.logo}>malcoded.com</span>
        <Button flat fill id={styles.home}>
          Home
        </Button>
        <Button flat fill id={styles.about}>
          About
        </Button>
        <Button
          flat
          fill
          id={styles.darkMode}
          onClick={this.props.toggleDarkMode}
        >
          Dark Mode
        </Button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
