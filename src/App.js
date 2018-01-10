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
        songs: [
          {name:'Beat It', duration:1345}, 
          {name:'Canelloni Makaroni', duration:1236},
          {name:'Rosa helikopter', duration: 70000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name:'Le Song', duration:1345}, 
          {name:'Hey hey hey', duration:1236},
          {name:'Halelulja', duration: 70000}
        ]
      },
      {
        name: 'Another Playlist',
        songs: [
          {name:'Take it off', duration:1345}, 
          {name:'Blabla', duration:1236},
          {name:'Soul sister', duration: 70000}
        ]
      },
      {
      name: 'Best Playlists ever',
      songs: [
        {name:'Le Song', duration:1345}, 
        {name:'The Song', duration:1236},
        {name:'The lalala', duration: 70000}
      ]
      }
    ]
  } 
};


// COMPONENTS
class PlaylistsCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    } , [])

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)

    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration / 60 / 60)} hours</h2>
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
    let playlist = this.props.playlist //just a shorthand
    return(
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}


class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    //Wrap this in a timeout to make it more clear that data is loaded later
    //That's why we use the and operator when binding data
    //So this is just for demonstration purpose
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
    // just for dummy use, simulate typing
    setTimeout(() => {
      this.setState({filterString: 'weekly'});
    }, 2000);
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
          <PlaylistsCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter />
          {this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLocaleLowerCase())
          ).map(playlist => 
            <Playlist playlist={playlist}/>
          )}
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        //If the stuff above exists, show it. Otherwise write loading...
      }

      </div>
    );
  }
}

export default App;
