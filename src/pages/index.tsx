import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/Seo'
import HeaderFooterLayout from '../layouts/HeaderFooterLayout'
import Button from '../components/elements/button/Button'
import Paper from '../components/elements/paper/Paper'
import styles from './index.module.css'
import Img from 'gatsby-image'
import { connect } from 'react-redux'
import { ThemeState } from '../state/reducers/theme.reducer'
import { AppState } from '../state/reducer'
import { darkText, lightText } from '../theme/text'
import { ThemeColor } from '../models/Theme'
import { setPrimaryColor } from '../state/actions/theme.actions'
import { defaultPrimaryColor } from '../theme/colors'

export interface BlogIndexProps {
  data: any
  theme: ThemeState
  setPrimaryColor(color: ThemeColor): void
}

export interface BlogIndexState {}

const mapStateToProps = (state: AppState) => {
  return {
    theme: state.theme,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPrimaryColor: (primaryColor: ThemeColor) =>
      dispatch(setPrimaryColor(primaryColor)),
  }
}

class BlogIndex extends React.Component<BlogIndexProps, BlogIndexState> {
  componentDidMount() {
    this.props.setPrimaryColor(defaultPrimaryColor)
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <HeaderFooterLayout>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <div className={styles.root}>
          <div className={styles.content}>
            {posts.map(({ node }, index) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <Link
                  key={node.fields.slug}
                  style={{
                    textDecoration: 'none',
                    gridArea: index < 5 ? String.fromCharCode(97 + index) : '',
                    color: 'inherit',
                    boxSizing: 'border-box',
                    display: 'flex',
                  }}
                  className={styles.item}
                  to={node.fields.slug}
                >
                  <Paper style={{ padding: 16 }}>
                    <Img
                      style={{ width: '100%' }}
                      fluid={node.frontmatter.image.childImageSharp.fluid}
                    />
                    <h2 className={styles.title}>{title}</h2>
                    <small>{node.frontmatter.date}</small>
                    <p
                      className={styles.excerpt}
                      style={{
                        color: this.props.theme.darkMode
                          ? darkText.secondary
                          : lightText.secondary,
                      }}
                      dangerouslySetInnerHTML={{ __html: node.excerpt }}
                    />
                  </Paper>
                </Link>
              )
            })}
          </div>
        </div>
      </HeaderFooterLayout>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogIndex)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            image {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
