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
        <h2>{this.props.playlists && this.props.playlists.length} Text</h2>
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
    //Wrap this in a timeout to make it more clear that data is loaded later
    //That's why we use the and operator when binding data
    //So this is just for demonstration purpose
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {
    let name = 'Marvin'
    let headerStyle = {color: 'red', 'font-size': '40px'}
    return (
      <div className="App">
        {this.state.serverData.user ? //only show the stuff if it has data. Check the data.
        <div>
          <h1 style={{... defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>}
          <Aggregate playlists={this.state.serverData.user.playlists}/>
          <Aggregate />
          <Filter />
          <Playlist />
          <Playlist />
          <Playlist />
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        //If the stuff above exists, show it. Otherwise write loading...
      }

      </div>
    );
  }
}

export default App;
