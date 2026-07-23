import { motion } from 'framer-motion'
import SectionWrapper from '@ui/SectionWrapper'
import SectionHeading from '@ui/SectionHeading'
import ProductCarousel from './products/ProductCarousel'
import { products, productsHeading } from '@data/products'

export default function Products() {
  return (
    <SectionWrapper id="products" wrapperClassName="overflow-hidden">
      {/* Ambient orbs */}
      <div
        className="glow-orb glow-orb-purple pointer-events-none"
        style={{ width: 500, height: 500, top: '-10%', right: '-8%', opacity: 0.2 }}
      />
      <div
        className="glow-orb glow-orb-accent pointer-events-none"
        style={{ width: 400, height: 400, bottom: '5%', left: '-6%', opacity: 0.15 }}
      />

      <div className="relative z-10 flex flex-col gap-16">
        {/* Heading */}
        <SectionHeading
          eyebrow={productsHeading.eyebrow}
          title={productsHeading.title}
          subtitle={productsHeading.subtitle}
        />

        {/* Carousel */}
        <ProductCarousel products={products} />
      </div>
    </SectionWrapper>
  )
}
