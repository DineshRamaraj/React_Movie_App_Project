import './index.css'
import ContextContainer from '../../Context/contextContainer'

const Failure = () => (
  <ContextContainer.Consumer>
    {value => {
      const {onRetry} = value
      return (
        <div className="failure-container" data-testid="failure">
          <img
            className="failure-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
            alt="failure"
          />
          <h1 className="failure-heading">Oops! Something Went Wrong</h1>
          <p className="failure-description">
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button
            className="failure-retry-button"
            type="button"
            onClick={onRetry}
          >
            Retry
          </button>
        </div>
      )
    }}
  </ContextContainer.Consumer>
)

export default Failure
