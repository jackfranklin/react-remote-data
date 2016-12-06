# react-remote-data

A React component around [remote-data-js](https://github.com/jackfranklin/remote-data-js), a JavaScript library aimed at modelling remote data and the states it can be in. This library provides a `<RemoteData />` component to deal with fetching and displaying remote data or the error state.

```
npm install --save react-remote-data-js
```

## Usage

```jsx
import RemoteData from 'react-remote-data-js'

<RemoteData url="http://example.com/users/jack"
  notAsked={props => <div><button onClick={props.fetch}>Make Request</button></div>}
  pending={() => <p>Loading...</p>}
  success={props => <div><UserComponent user={props.request.data} /></div>}
  failure={props => <div><ApiErrorComponent error={props.request.data} /></div>}
/>
```

Render a `RemoteData` component and pass it the following props:

- `url: String | Function` the URL that the request will be made to.

Render a `RemoteData` component and pass it the following props:

- `url: String | Function` the URL that the request will be made to. If you give a function, it will be called with arguments that you give to the `fetch` function (see below for an example)
- `notAsked: Function` a function that takes properties given to it by the `<RemoteDataJs>` component and returns what will be rendered when the request is in the `NotAsked` state.
- `pending`, `success` and `failure` are all the same as `notAsked` but are used for the relevant state.

When `notAsked`, `pending`, `success` and `failure` are rendered, the function you provide is called with some props. They are:

- `fetch: Function` call `props.fetch(...args)` to start the request. This immediately turns the request to `pending`, and it will update to `success` or `failure` depending on the outcome of the request.
- `request: RemoteDataJs` this is the underlying instance of the [RemoteDataJs](https://github.com/jackfranklin/remote-data-js) object that this component wraps around. The bit you'll most likely be interested in is `request.data`, which contains the API response for a successful request, or an `Error` for a failed request.

## Fetching URLs with parameters

Often you'll want to take a piece of data and use it to construct a URL. For example, you might have a form that lets a user type in a username to search your API for. In that case you need to define the `url` property as a function. You'll then need to update your call to `props.fetch` to pass in the username:

```jsx
<RemoteData url={name => `http://example.com/users/${name}`}
  notAsked={props => <div><button onClick={() => props.fetch(this.state.userName)}>Make Request</button></div>}
  pending={() => <p>Loading...</p>}
  success={props => <div><UserComponent user={props.request.data} /></div>}
  failure={props => <div><ApiErrorComponent error={props.request.data} /></div>}
/>
```

## Questions, problems, comments?

Would love to hear them! Please raise an issue on this repository.
