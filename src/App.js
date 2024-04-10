import Cookies from 'js-cookie'
import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import NotFound from './components/NotFound'
import MovieSpecificDetails from './components/MovieSpecificDetails'
import SearchContainer from './components/SearchContainer'
import ContextContainer from './Context/contextContainer'
import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    isSearch: false,
  }

  componentDidMount() {
    Cookies.set('api_key', '44c0de38cf901ef4e3170a3f84498138', {expires: 30})
  }

  changeSearchInput = value => {
    this.setState({searchInput: value})
  }

  clickSearchButton = () => {
    this.setState({isSearch: true})
  }

  onRetry = () => {
    this.setState({searchInput: '', isSearch: false})
  }

  render() {
    const {searchInput, isSearch} = this.state
    console.log(searchInput)
    return (
      <ContextContainer.Provider
        value={{
          searchInput,
          changeSearchInput: this.changeSearchInput,
          clickSearchButton: this.clickSearchButton,
          onRetry: this.onRetry,
        }}
      >
        <Header />
        <Switch>
          {searchInput.length > 0 && isSearch ? (
            <Route exact path="/" component={SearchContainer} />
          ) : (
            <Route exact path="/" component={Home} />
          )}
          <Route path="/top-rated" component={TopRated} />
          <Route path="/up-coming" component={Upcoming} />
          <Route path="/movie-details/:id" component={MovieSpecificDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ContextContainer.Provider>
    )
  }
}

export default App
