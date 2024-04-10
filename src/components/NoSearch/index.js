import './index.css'

const NoSearchResult = props => {
  const {onRetry} = props

  const onClickRetrySearch = () => {
    onRetry()
  }

  return (
    <div className="no-search-container">
      <img
        className="no-search-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1 className="no-search-heading">No Search results found</h1>
      <p className="no-search-description">
        Try different key words or remove search filter
      </p>
      <button
        className="no-search-retry-button"
        type="button"
        onClick={onClickRetrySearch}
      >
        Retry
      </button>
    </div>
  )
}

export default NoSearchResult
