import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'
import HeaderFooterLayout from '../layouts/HeaderFooterLayout'
import Button from '../components/elements/button/Button'
import Paper from '../components/elements/paper/Paper'
import styles from './index.module.css'

export interface BlogIndexProps {
  data: any
}

export interface BlogIndexState {}

class BlogIndex extends React.Component<BlogIndexProps, BlogIndexState> {
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
        <div className={styles.content}>
          {posts.map(({ node }, index) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Paper
                key={node.fields.slug}
                style={{ gridArea: String.fromCharCode(97 + index) }}
              >
                <h3 style={{}}>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <Button>Hallo</Button>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
              </Paper>
            )
          })}
        </div>
      </HeaderFooterLayout>
    )
  }
}

export default BlogIndex

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
          }
        }
      }
    }
  }
`
