// Write your code here
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProductItemDetails extends Component {
  state = {productDetails: {}, status: apiConstants.initial, quantity: 1}

  componentDidMount() {
    this.getData()
  }

  changeData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    title: data.title,
    brand: data.brand,
    totalReviews: data.total_reviews,
    rating: data.rating,
    availability: data.availability,
    price: data.price,
    description: data.description,

    similarProducts: data.similar_products.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
      title: each.title,
      style: each.style,
      price: each.price,
      description: each.description,
      brand: each.brand,
      totalReviews: each.total_reviews,
      rating: each.rating,
      availability: each.availability,
    })),
  })

  getData = async () => {
    this.setState({status: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = this.changeData(data)
      this.setState({
        productDetails: updatedData,
        status: apiConstants.success,
      })
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  onClickDash = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onClickPlus = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  failureView = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Product Not Found</h1>
      <button
        onClick={this.onClickContinueShopping}
        type="button"
        className="add-to-cart-btn"
      >
        Continue Shopping
      </button>
    </div>
  )

  showProductDtls = () => {
    const {productDetails, quantity} = this.state
    const {
      imageUrl,
      price,
      description,
      title,
      brand,
      rating,
      availability,
      totalReviews,
      similarProducts,
    } = productDetails

    return (
      <div className="product-dtls-sub-con">
        <div className="img-dtls-con">
          <img src={imageUrl} alt="product" className="main-img" />
          <div className="matter-con">
            <h1 className="matter-title">{title}</h1>
            <p className="price">Rs {price}/- </p>
            <div className="reviews-rating-con">
              <div className="rating-con">
                <p className="rating-span">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p>{totalReviews} reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="available-para">
              <span className="available-span">Available:</span> {availability}
            </p>
            <p className="available-para">
              <span className="available-span">Brand:</span> {brand}
            </p>
            <hr className="hr-line" />
            <div className="quantity-con">
              <button
                type="button"
                data-testid="minus"
                onClick={this.onClickDash}
                className="minus-con"
              >
                <BsDashSquare className="minus" alt="plus" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                data-testid="plus"
                onClick={this.onClickPlus}
                className="plus-con"
              >
                <BsPlusSquare className="plus" alt="minus" />
              </button>
            </div>
            <button className="add-to-cart-btn" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-products-con">
          <h1 className="similar-products-name">Similar Products</h1>
          <ul className="similar-products-ul-con">
            {similarProducts.map(each => (
              <SimilarProductItem each={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {status} = this.state

    switch (status) {
      case apiConstants.loading:
        return this.loadingView()
      case apiConstants.success:
        return this.showProductDtls()
      case apiConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="product-item-dtls-main-con">
          {this.renderProductDetails()}
        </div>
      </div>
    )
  }
}

export default ProductItemDetails
