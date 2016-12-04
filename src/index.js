import React from 'react';
import RemoteDataJs from 'remote-data-js';
import {
  SUCCESS,
  FAILURE,
  NOT_ASKED,
  PENDING,
} from 'remote-data-js/lib/states';

const FINAL_STATES = [ SUCCESS, FAILURE ]

class RemoteData extends React.Component {
  componentWillMount() {
    this.setState({
      remoteData: new RemoteDataJs({
        url: this.props.url,
        onChange: data => this.remoteDataChange(data),
      }),
    })
  }

  fetch(...args) {
    return this.state.remoteData.fetch(...args);
  }

  remoteDataChange(remoteData) {
    this.setState({ remoteData })
  }

  propsForChildStates(state) {
    return Object.assign({}, this.props, {
      fetch: (...args) => this.fetch(...args),
      data: FINAL_STATES.indexOf(state) > -1 ? this.state.remoteData.data : undefined,
    });
  }

  render() {
    return this.state.remoteData.case({
      NotAsked: () => this.props.notAsked(this.propsForChildStates(NOT_ASKED)),
      Pending: () => this.props.pending(this.propsForChildStates(PENDING)),
      Success: () => this.props.success(this.propsForChildStates(SUCCESS)),
      Failure: () => this.props.failure(this.propsForChildStates(FAILURE)),
    });
  }
}

export default RemoteData;
