import React from 'react';
import { mount } from 'enzyme';
import RemoteData from '../src/index';

import { PENDING, SUCCESS, FAILURE } from 'remote-data-js/lib/states';

describe('fetching data via the fetch function', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <RemoteData url='http://test.com/jack'
        notAsked={props => (
          <div>
            <button onClick={props.fetch}>Fetch</button>
          </div>
        )}
        pending={props => <p>Pending</p>}
        success={props => <p>Success! {props.data}</p>}
        failure={props => <p>Failure! {props.data}</p>}
      />
    );

  });

  test('it renders not asked with a fetch prop', () => {
    console.log('got wrapper', wrapper)
    expect(wrapper.find('button').text()).toEqual('Fetch');
    expect(wrapper.find('button').props().onClick).toBeTruthy();
  });
});
