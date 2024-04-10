import {Link} from 'react-router-dom'
import ContextContainer from '../../Context/contextContainer'
import './index.css'

const Header = () => (
  <ContextContainer.Consumer>
    {value => {
      const {searchInput, changeSearchInput, clickSearchButton} = value

      const onChangeSearchInput = event => {
        changeSearchInput(event.target.value)
      }

      const onClickSearchButton = () => {
        clickSearchButton()
      }

      return (
        <nav className="navbar-container">
          <div className="logo-container">
            <Link to="/" className="link-item">
              MovieDB
            </Link>
          </div>
          <div className="nav-items-search-container">
            <ul className="nav-items-container">
              <Link to="/" className="link-item">
                <li className="nav-item">
                  <p className="nav-item-link">Popular</p>
                </li>
              </Link>
              <Link to="/top-rated" className="link-item">
                <li className="nav-item">
                  <p className="nav-item-link">Top Rated</p>
                </li>
              </Link>
              <Link to="/up-coming" className="link-item">
                <li className="nav-item">
                  <p className="nav-item-link">Upcoming</p>
                </li>
              </Link>
            </ul>
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Movie Name"
                onChange={onChangeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                className="search-button"
                onClick={onClickSearchButton}
              >
                Search
              </button>
            </div>
          </div>
        </nav>
      )
    }}
  </ContextContainer.Consumer>
)

export default Header
