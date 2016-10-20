import React from 'react';
import RemoteDataJs from 'remote-data-js';

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

  responseProps() {
    return Object.assign({}, this.props, {
      data: this.state.remoteData.data
    });
  }

  render() {
    return this.state.remoteData.case({
      NotAsked: () => this.props.notAsked(),
      Pending: () => this.props.pending(),
      Success: () => this.props.success(this.responseProps()),
      Failure: () => this.props.failure(this.responseProps()),
    });
  }
}

export default RemoteData;
