import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({ title, description, keywords, ogImage, ogType = 'website' }) => {
  const location = useLocation()
  const baseUrl = 'https://demayne-govender-portfolio.vercel.app'
  const canonicalUrl = `${baseUrl}${location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = title || 'Demayne Govender | Full-Stack Engineer'

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Update description
    if (description) {
      updateMetaTag('description', description)
      updateMetaTag('og:description', description, true)
      updateMetaTag('twitter:description', description)
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('keywords', keywords)
    }

    // Update Open Graph tags
    if (title) {
      updateMetaTag('og:title', title, true)
      updateMetaTag('twitter:title', title)
    }
    
    updateMetaTag('og:url', canonicalUrl, true)
    updateMetaTag('og:type', ogType, true)
    
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true)
      updateMetaTag('twitter:image', ogImage)
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // Update structured data for current page
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: canonicalUrl,
      inLanguage: 'en-US',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Demayne Govender Portfolio',
        url: baseUrl,
      },
    }

    let scriptTag = document.querySelector('script[type="application/ld+json"][data-page-schema]')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.setAttribute('type', 'application/ld+json')
      scriptTag.setAttribute('data-page-schema', 'true')
      document.head.appendChild(scriptTag)
    }
    scriptTag.textContent = JSON.stringify(structuredData)
  }, [title, description, keywords, ogImage, ogType, canonicalUrl])

  return null
}

export default SEO

