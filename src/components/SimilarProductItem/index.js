// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {each} = props
  const {imageUrl, title, price, brand, rating} = each
  return (
    <li className="similar-products-li-con">
      <img
        src={imageUrl}
        alt={`similar product${title}`}
        className="similar-products-img"
      />
      <h1 className="similar-products-title">{title}</h1>
      <p className="similar-products-para">by {brand}</p>
      <div className="price-rating-con">
        <p className="similar-products-price">Rs {price}/-</p>
        <div className="similar-products-rating-con">
          <p className="rating-span">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
