import PropTypes from 'prop-types'
const FeaturesCard = ({ feature }) => {
  return (
    <div className='feature-card lg:w-[160px] lg:h-[200px] w-[140px] h-[160px] border border-cyan-700 flex flex-col items-end justify-around gap-4 p-4 relative cursor-pointer'>
      <div className="image w-full flex items-center justify-center">
      <img className='lg:w-[30px] lg:h-[30px] w-[25px] h-[25px]' src={feature.image} alt="Image" />
      </div>
      <p className='lg:text-[14px] text-[12px] text-center'>{feature.title}</p>
      <img className='w-[24px] h-[24px]' src="https://img.icons8.com/ios-glyphs/0e7490/30/circled-right.png" alt="circled-right"/>
    </div>
  )
}

export default FeaturesCard

FeaturesCard.propTypes = {
  feature: PropTypes.object.isRequired,
}