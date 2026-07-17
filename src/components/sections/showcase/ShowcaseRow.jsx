import ShowcaseImage from './ShowcaseImage'
import ShowcaseContent from './ShowcaseContent'

/**
 * One product showcase row.
 * @param {object}  showcase - showcase data entry
 * @param {boolean} reverse  - when true: content left, image right
 */
export default function ShowcaseRow({ showcase, reverse = false }) {
  const image   = <ShowcaseImage mock={showcase.mock} accent={showcase.accent} accentRgb={showcase.accentRgb} />
  const content = <ShowcaseContent showcase={showcase} />

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {/*
        On mobile: image always renders first (visual priority).
        On desktop: order is controlled by reverse prop.
      */}
      <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>
        {image}
      </div>
      <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>
        {content}
      </div>
    </div>
  )
}
