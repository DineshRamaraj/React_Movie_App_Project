// eslint-disable-next-line import/no-extraneous-dependencies
import Loader from 'react-loader-spinner'
import './index.css'

const Loading = () => (
  <div className="loading-container" data-testid="loader">
    <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
  </div>
)

export default Loading
