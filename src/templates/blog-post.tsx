import React from 'react'
import { Link, graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Bio from '../components/Bio'
import SEO from '../components/seo'
import HeaderFooterLayout from '../layouts/HeaderFooterLayout'

import styles from './BlogPost.module.css'
import { connect } from 'react-redux'
import { setPrimaryColor } from '../state/actions/theme.actions'
import { ThemeColor } from '../models/Theme'
import { AppState } from '../state/reducer'

export interface BlogPostTemplateProps {
  data: any
  pageContext: any
}

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

const BlogPostTemplate: React.SFC<BlogPostTemplateProps> = props => {
  const post = props.data.mdx
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext

  setPrimaryColor({
    dark: post.frontmatter.colorDark,
    light: post.frontmatter.colorLight,
    main: post.frontmatter.colorMain,
    contrast: '#fff',
  })

  return (
    <HeaderFooterLayout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div className={styles.grid}>
        <div className={styles.sidebarLeft} />
        <div className={styles.content}>
          <img
            className={styles.image}
            src={post.frontmatter.image.childImageSharp.fixed.src}
          />
          <h1>{post.frontmatter.title}</h1>
          <p
            style={{
              display: `block`,
            }}
          >
            {post.frontmatter.date}
          </p>
          <MDXRenderer>{post.code.body}</MDXRenderer>
          <hr style={{}} />
          <Bio />

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.sidebarRight} />
    </HeaderFooterLayout>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPostTemplate)

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        colorLight
        colorMain
        colorDark
        colorContrast
        image {
          childImageSharp {
            fixed(width: 800) {
              src
              srcSet
              base64
            }
          }
        }
        date(formatString: "MMMM DD, YYYY")
      }
      code {
        body
      }
    }
  }
`
