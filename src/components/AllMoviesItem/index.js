import {Link} from 'react-router-dom'
import './index.css'

const AllMoviesItem = props => {
  const {moviesList} = props
  return (
    <ul className="movies-list-container">
      {moviesList.map(eachItem => (
        <Link
          to={`/movie-details/${eachItem.id}`}
          className="movies-link"
          key={eachItem.id}
        >
          <li className="movies-item" key={eachItem.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${eachItem.posterPath}`}
              alt={eachItem.title}
              className="movie-image"
            />
            <h1 className="movie-title">{eachItem.title}</h1>
            <p className="movie-rating-item">
              Rating:
              <span className="movie-rating">
                {eachItem.voteAverage.toFixed(1)}
              </span>
            </p>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default AllMoviesItem
