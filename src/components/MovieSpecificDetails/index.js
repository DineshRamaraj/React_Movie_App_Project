// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'
import {Component} from 'react'
import Failure from '../Failure'
import Loading from '../Loading'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  in_Progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieSpecificDetails extends Component {
  state = {
    movieDetails: {},
    movieCase: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMoviesSpecificDetails()
  }

  updatedMovieDetails = data => ({
    id: data.id,
    adult: data.adult,
    backdropPath: data.backdrop_path,
    genres: data.genres,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    runtime: data.runtime,
    title: data.title,
    video: data.video,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  updatedMovieCast = movieCast =>
    movieCast.map(data => ({
      id: data.id,
      adult: data.adult,
      castId: data.castId,
      character: data.character,
      creditId: data.credit_id,
      gender: data.gender,
      knownForDepartment: data.known_for_department,
      name: data.name,
      order: data.order,
      originalName: data.original_name,
      popularity: data.popularity,
      profilePath: data.profile_path,
    }))

  updatedMovieCrew = movieCrew =>
    movieCrew.map(data => ({
      id: data.id,
      adult: data.adult,
      creditId: data.credit_id,
      department: data.department,
      gender: data.gender,
      job: data.job,
      knownForDepartment: data.known_for_department,
      name: data.name,
      originalName: data.original_name,
      popularity: data.popularity,
      profilePath: data.profilePath,
    }))

  getMoviesSpecificDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.in_Progress})
    const apiKey = Cookies.get('api_key')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log('movie id: ', id)
    const apiUrlMovieDetails = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const apiUrlMovieCase = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    const options = {
      method: 'GET',
    }
    const responseMovieDetails = await fetch(apiUrlMovieDetails, options)
    const responseMovieCase = await fetch(apiUrlMovieCase, options)
    const movieDetails = await responseMovieDetails.json()
    const movieCase = await responseMovieCase.json()
    console.log(movieDetails)
    console.log(movieCase)
    const updatedMovieDetails = this.updatedMovieDetails(movieDetails)
    const updatedMovieCast = this.updatedMovieCast(movieCase.cast)
    if (responseMovieDetails.ok && responseMovieCase.ok) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetails: updatedMovieDetails,
        movieCast: updatedMovieCast,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {movieDetails, movieCast} = this.state
    console.log(movieDetails)
    return (
      <div className="movie-specific-container">
        <div
          className="movie-details-container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.backdropPath})`,
          }}
        >
          <div className="movie-image-title-container">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.posterPath}`}
              alt={movieDetails.title}
              className="movie-img"
            />
            <div className="movie-title-other-container">
              <h1 className="movie-details-title">{movieDetails.title}</h1>
              <p className="movie-details-rating-item">
                Rating:
                <span className="movie-details-rating">
                  {movieDetails.voteAverage.toFixed(1)}
                </span>
              </p>
              <div className="movie-runtime-category-container">
                <p className="movie-runtime">{movieDetails.runtime} min</p>
                <ul className="movie-genres-list-container">
                  {movieDetails.genres.map(eachItem => (
                    <li className="genres-item" key={eachItem.id}>
                      <p className="genres-name">{eachItem.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="movie-release-date-title">
                Release Date:
                <span className="movie-release-date">
                  {movieDetails.releaseDate}
                </span>
              </p>
            </div>
          </div>
          <div className="movie-overview-container">
            <h1 className="movie-overview-title">Overview</h1>
            <p className="movie-overview">{movieDetails.overview}</p>
          </div>
        </div>
        <div className="sm-movie-image-title-container">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.posterPath}`}
            alt={movieDetails.title}
            className="movie-img"
          />
          <div className="movie-title-other-container">
            <h1 className="movie-details-title">{movieDetails.title}</h1>
            <p className="movie-details-rating-item">
              Rating:
              <span className="movie-details-rating">
                {movieDetails.voteAverage.toFixed(1)}
              </span>
            </p>
            <div className="movie-runtime-category-container">
              <p className="movie-runtime">{movieDetails.runtime} min</p>
              <ul className="movie-genres-list-container">
                {movieDetails.genres.map(eachItem => (
                  <li className="genres-item" key={eachItem.id}>
                    <p className="genres-name">{eachItem.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="movie-release-date-title">
              Release Date:
              <span className="movie-release-date">
                {movieDetails.releaseDate}
              </span>
            </p>
          </div>
        </div>
        <div className="sm-movie-overview-container">
          <h1 className="movie-overview-title">Overview</h1>
          <p className="movie-overview">{movieDetails.overview}</p>
        </div>
        <div className="movie-cast-container">
          <h1 className="movie-cast-heading">Cast</h1>
          <ul className="movie-cast-list-container">
            {movieCast.map(eachItem => (
              <li className="movie-cast-item" key={eachItem.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${eachItem.profilePath}`}
                  alt={eachItem.name}
                  className="movie-cast-image"
                />
                <h1 className="movie-cast-name">{eachItem.name}</h1>
                <p className="movie-cast-character">
                  Character:
                  <span className="movie-character">{eachItem.character}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
    return (
      <div className="main-movie-details-container">
        {this.renderMainView()}
      </div>
    )
  }
}

export default MovieSpecificDetails
