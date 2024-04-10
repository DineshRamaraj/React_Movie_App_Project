// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'
import {Component} from 'react'
import Failure from '../Failure'
import Loading from '../Loading'
import AllMoviesItem from '../AllMoviesItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_Progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    moviesList: [],
    currentPageNo: 500,
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
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPageNo}`

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
      console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      console.log('Error ', data)
    }
  }

  renderSuccessView = () => {
    const {moviesList} = this.state
    const clickDecreasePage = () => {
      const {currentPageNo} = this.state
      if (currentPageNo > 1) {
        this.setState(
          prevState => ({
            currentPageNo: prevState.currentPageNo - 1,
          }),
          this.getMoviesList,
        )
      }
    }

    const clickIncreasePage = () => {
      const {currentPageNo} = this.state
      if (currentPageNo <= 500) {
        this.setState(
          prevState => ({
            currentPageNo: prevState.currentPageNo + 1,
          }),
          this.getMoviesList,
        )
      }
    }
    return (
      <AllMoviesItem
        moviesList={moviesList}
        clickDecreasePage={clickDecreasePage}
        clickIncreasePage={clickIncreasePage}
      />
    )
  }

  renderLoadingView = () => <Loading />

  renderFailureView = () => <Failure />

  renderMainView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.in_Progress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-container">{this.renderMainView()}</div>
  }
}

export default Home
