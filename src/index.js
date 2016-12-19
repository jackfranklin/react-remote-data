/* global module */
import { Component, PropTypes } from 'react'
import RemoteDataJs from 'remote-data-js'
import {
  SUCCESS,
  FAILURE,
  NOT_ASKED,
  PENDING,
} from 'remote-data-js/lib/states'

class RemoteData extends Component {
  componentWillMount() {
    this.setState({
      remoteData: new RemoteDataJs({
        url: this.props.url,
        onChange: data => this.remoteDataChange(data),
      }),
    })
  }

  fetch(...args) {
    return this.state.remoteData.fetch(...args)
  }

  remoteDataChange(remoteData) {
    this.setState({ remoteData })
  }

  propsForChildStates(state) {
    return Object.assign({}, this.props, {
      fetch: (...args) => this.fetch(...args),
      request: this.state.remoteData,
    })
  }

  render() {
    return this.state.remoteData.case({
      NotAsked: () => this.props.notAsked(this.propsForChildStates(NOT_ASKED)),
      Pending: () => this.props.pending(this.propsForChildStates(PENDING)),
      Success: () => this.props.success(this.propsForChildStates(SUCCESS)),
      Failure: () => this.props.failure(this.propsForChildStates(FAILURE)),
    })
  }
}

RemoteData.propTypes = {
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  notAsked: PropTypes.func.isRequired,
  pending: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired,
  failure: PropTypes.func.isRequired,
}

module.exports = RemoteData
