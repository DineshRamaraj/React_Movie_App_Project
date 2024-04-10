// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'
import {Component} from 'react'
import Failure from '../Failure'
import Loading from '../Loading'
import AllMoviesItem from '../AllMoviesItem'
import NoSearch from '../NoSearch'
import './index.css'
import ContextContainer from '../../Context/contextContainer'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_Progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchContainer extends Component {
  state = {
    moviesList: [],
    currentPageNo: 1,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMoviesList()
  }

  updatedData = moviesData =>
    moviesData.map(data => ({
      id: data.id,
      adult: data.adult,
      backdropPath: data.backdrop_path,
      genreIDs: data.genre_ids,
      originalLanguage: data.original_language,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      posterPath: data.poster_path,
      releaseDate: data.release_date,
      title: data.title,
      video: data.video,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    }))

  getMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstants.in_Progress})
    const apiKey = Cookies.get('api_key')
    const {currentPageNo} = this.state
    const {searchInput} = this.props
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${currentPageNo}`

    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const updatedData = this.updatedData(data.results)
    if (response.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        moviesList: updatedData,
      })
      //   console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      //   console.log('Error ', data)
    }
  }

  renderSuccessView = () => {
    const {moviesList} = this.state
    return <AllMoviesItem moviesList={moviesList} />
  }

  renderLoadingView = () => <Loading />

  renderFailureView = () => <Failure />

  renderNoSearchView = () => (
    <ContextContainer.Consumer>
      {value => {
        const {onRetry} = value
        return <NoSearch onRetry={onRetry} />
      }}
    </ContextContainer.Consumer>
  )

  renderMainView = () => {
    const {apiStatus, moviesList} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        if (moviesList.length > 0) {
          return this.renderSuccessView()
        }
        return this.renderNoSearchView()
      case apiStatusConstants.in_Progress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {moviesList} = this.state
    const {searchInput} = this.props
    console.log(searchInput)
    console.log(moviesList)
    return <div className="search-component">{this.renderMainView()}</div>
  }
}

export default SearchContainer
