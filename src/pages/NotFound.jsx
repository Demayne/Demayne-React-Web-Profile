import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { RevealLines } from '../components/motion'

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found | Demayne Govender" description="This page doesn't exist." noindex />
      <section className="container-site flex min-h-[80svh] flex-col justify-center pt-[72px]">
        <p className="label mb-6">Error 404</p>
        <RevealLines as="h1" className="display-lg" lines={['This page took', 'a wrong turn.']} animateOnMount />
        <div className="mt-10">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </section>
    </>
  )
}
