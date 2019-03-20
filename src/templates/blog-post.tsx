import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import SEO from '../components/seo'
import HeaderFooterLayout from '../layouts/HeaderFooterLayout'

import styles from './BlogPost.module.css'
import { connect } from 'react-redux'
import { setPrimaryColor } from '../state/actions/theme.actions'
import { ThemeColor } from '../models/Theme'
import { AppState } from '../state/reducer'
import { ThemeState } from '../state/reducers/theme.reducer'

import Img from 'gatsby-image'
import Toc from '../components/blocks/toc/Toc'
import Sidebar from '../components/blocks/sidebar/Sidebar'
import Comments from '../components/blocks/comments/Comments'

export interface BlogPostTemplateProps {
  data: any
  pageContext: any
  setPrimaryColor(color: ThemeColor): void
  theme: ThemeState
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

  useEffect(() => {
    props.setPrimaryColor({
      dark: post.frontmatter.colorDark,
      light: post.frontmatter.colorLight,
      main: post.frontmatter.colorMain,
      contrast: '#fff',
    })
  }, [])

  return (
    <HeaderFooterLayout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div className={styles.grid}>
        <div className={styles.sidebarLeft} />
        <div className={styles.content}>
          <Img
            style={{ width: '100%' }}
            fluid={post.frontmatter.image.childImageSharp.fluid}
          />
          <h1>{post.frontmatter.title}</h1>
          <small
            style={{
              display: `block`,
            }}
          >
            {post.frontmatter.date}
          </small>
          <MDXRenderer>{post.code.body}</MDXRenderer>
          <br />
          <Comments postId={post.frontmatter.id} />
        </div>
        <div className={styles.sidebarRight}>
          <Sidebar>
            <Toc toc={post.tableOfContents} />
          </Sidebar>
        </div>
      </div>
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
      tableOfContents
      frontmatter {
        id
        title
        colorLight
        colorMain
        colorDark
        colorContrast
        image {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
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
