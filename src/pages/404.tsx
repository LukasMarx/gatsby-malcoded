import React from 'react'

import SEO from '../components/seo'
import HeaderFooterLayout from '../layouts/HeaderFooterLayout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <HeaderFooterLayout>
        <SEO title="404: Not Found" />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </HeaderFooterLayout>
    )
  }
}

export default NotFoundPage
