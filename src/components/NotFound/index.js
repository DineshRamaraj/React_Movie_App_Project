import './index.css'

const NotFound = () => (
  <div className="not-found-container" data-testid="not found">
    <img
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
