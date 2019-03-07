import React, { CSSProperties } from 'react'
import styles from './HeaderFooterLayout.module.css'
import Toolbar from '../components/blocks/toolbar/Toolbar'
import { ThemeState } from '../state/reducers/theme.reducer'
import { connect } from 'react-redux'
import { AppState } from '../state/reducer'
import { darkBackground, lightBackground } from '../theme/background'
import { darkText, lightText } from '../theme/text'

export interface HeaderFooterLayoutProps {
  theme: ThemeState
}

export interface HeaderFooterLayoutState {}

const mapStateToProps = (state: AppState) => {
  return {
    theme: state.theme,
  }
}

class HeaderFooterLayout extends React.Component<
  HeaderFooterLayoutProps,
  HeaderFooterLayoutState
> {
  styles(): CSSProperties {
    if (this.props.theme.darkMode) {
      return {
        backgroundColor: darkBackground.default,
        color: darkText.primary,
      }
    } else {
      return {
        backgroundColor: lightBackground.default,
        color: lightText.primary,
      }
    }
  }
  render() {
    return (
      <div className={styles.root} style={this.styles()}>
        <Toolbar />
        <div className={styles.content}>{this.props.children}</div>
        <footer className={styles.footer} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(HeaderFooterLayout)
