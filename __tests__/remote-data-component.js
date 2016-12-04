import React from 'react';
import { mount } from 'enzyme';
import RemoteData from '../src/index';

import { PENDING, SUCCESS, FAILURE } from 'remote-data-js/lib/states';

describe('rendering the right child component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <RemoteData url='http://test.com/jack'
        notAsked={props => <p>Not Asked</p>}
        pending={props => <p>Pending</p>}
        success={props => <p>Success! {props.request.data}</p>}
        failure={props => <p>Failure! {props.request.data}</p>}
      />
    );

  });

  test('It renders a component in the NotAsked state by default', () => {
    expect(wrapper.find('p').text()).toEqual('Not Asked');
  });

  test('It renders the component in the loading state when it is loading', () => {
    const remoteDataInstance = wrapper.state('remoteData');
    remoteDataInstance.state = PENDING;
    wrapper.setState({ remoteData: remoteDataInstance });

    expect(wrapper.find('p').text()).toEqual('Pending');
  });

  // TODO : not great to reach in and hack the state here
  // should instead test via clicking a button and mocking the fetch call
  test('It renders the component in the success state when it succeeded', () => {
    const remoteDataInstance = wrapper.state('remoteData');
    remoteDataInstance.state = SUCCESS;
    remoteDataInstance.stateData = 'Response from API';
    wrapper.setState({ remoteData: remoteDataInstance });

    expect(wrapper.find('p').text()).toEqual('Success! Response from API');
  });

  test('It renders the component in the failure state when it failed', () => {
    const remoteDataInstance = wrapper.state('remoteData');
    remoteDataInstance.state = FAILURE;
    remoteDataInstance.stateData = 'Error from API';
    wrapper.setState({ remoteData: remoteDataInstance });

    expect(wrapper.find('p').text()).toEqual('Failure! Error from API');
  });
});
