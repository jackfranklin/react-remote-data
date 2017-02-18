import React from 'react'
import 'isomorphic-fetch'
import { mount } from 'enzyme'
import RemoteData from '../src/index'
import nock from 'nock'

import { PENDING, SUCCESS, FAILURE } from 'remote-data-js/lib/states'

function asyncTest(fn, timeout = 10) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        fn()
        resolve()
      } catch (e) {
        reject(e)
      }
    }, timeout)
  })
}

describe('fetching data via the fetch function', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <RemoteData url='http://test.com/jack'
        notAsked={props => (
          <div>
            <button onClick={props.fetch}>Fetch</button>
          </div>
        )}
        pending={props => <p>Pending</p>}
        success={props => <p>Success! {props.request.data.name}</p>}
        failure={props => <p>Failure! {props.request.data.message}</p>}
      />
    )
  })

  test('it renders not asked with a fetch prop', () => {
    expect(wrapper.find('button').text()).toEqual('Fetch')
    expect(wrapper.find('button').props().onClick).toBeTruthy()
  })

  test('clicking on the button moves the state to pending and makes the request', () => {
    nock('http://test.com').get('/jack').reply(200, { name: 'Jack' })
    wrapper.find('button').simulate('click')
    expect(wrapper.state().remoteData.state).toEqual(PENDING)
    return asyncTest(() => {
      expect(wrapper.find('p').text()).toEqual('Success! Jack')
      expect(wrapper.state().remoteData.state).toEqual(SUCCESS)
    })
  })

  test('when it fails it goes to the failure case', () => {
    nock('http://test.com').get('/jack').reply(404)
    wrapper.find('button').simulate('click')
    expect(wrapper.state().remoteData.state).toEqual(PENDING)
    return asyncTest(() => {
      expect(wrapper.state().remoteData.state).toEqual(FAILURE)
      expect(wrapper.find('p').text()).toEqual('Failure! Not Found')
    })
  })
})
