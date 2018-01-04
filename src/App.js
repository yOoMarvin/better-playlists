import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
}

// Fake Data here
let fakeServerData = {
  user: {
    name: 'Marvin',
    playlists: [
      {
        name: 'My favorites',
        songs: ['Beat It,', 'Canelloni Makaroni', 'Rosa helikopter']
      },
      {
        name: 'Discover Weekly',
        songs: ['Le Song', 'The song', 'The lalala']
      },
    {
      name: 'Another Playlist- the best',
      songs: ['Le Song', 'The song', 'The lalala']
    },
    {
    name: 'Best Playlists ever',
    songs: ['Le Song', 'The song', 'The lalala']
  }
    ]
  }
};


// COMPONENTS
class Aggregate extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>Number Text</h2>
      </div>
    );
  }
}


class Filter extends Component {
  render() {
    return(
      <div style={{defaultStyle}}>
        <img />
        <input type='text' />
      </div>
    );
  }
}


class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}


class App extends Component {
  constructor() {
    super()
    this.state = {serverData: {}}
  }
  componentDidMount() {
    this.setState({serverData: fakeServerData});
  }
  render() {
    let name = 'Marvin'
    let headerStyle = {color: 'red', 'font-size': '40px'}
    return (
      <div className="App">
        <h1 style={{... defaultStyle, 'font-size': '54px'}}>
          {this.state.serverData.user && 
            this.state.serverData.user.name}'s Playlists
        </h1>
        <Aggregate />
        <Aggregate />
        <Filter />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
