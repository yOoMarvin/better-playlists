import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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
        <input type='text' onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}


class Playlist extends Component {
  render() {
    let playlist = this.props.playlist //just a shorthand
    return(
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img src={playlist.imageUrl} style={{width: '60px'}} />
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
    // fetch data here
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        let trackDataPromise = responsePromise
          .then(response => response.json())
        return trackDataPromise
      })
      let allTracksDataPromises = Promise.all(trackDataPromises)
      let playlistsPromise = allTracksDataPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name,
              duration: trackData.duration_ms / 1000
            }))
        })
        return playlists
      })
      return playlistsPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        return {
          name: item.name,
          imageUrl: item.images[0].url, 
          songs: item.trackDatas.slice(0,3)
        }
    })
    }))
  }
  render() {
    let headerStyle = {color: 'red', 'font-size': '40px'}
    let playlistsToRender = 
      this.state.user && 
      this.state.playlists 
        ? this.state.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLocaleLowerCase())) 
        : []
    return (
      <div className="App">
        {this.state.user ? //only show the stuff if it has data. Check the data.
        <div>
          <h1 style={{... defaultStyle, 'font-size': '54px'}}>
            {this.state.user.name}'s Playlists
          </h1>}
          
          <PlaylistsCounter playlists={playlistsToRender}/>
          <HoursCounter playlists={playlistsToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text })}/>

          {playlistsToRender.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLocaleLowerCase())
          ).map(playlist => 
            <Playlist playlist={playlist}/>
          )}
        </div> : <button onClick={()=> {
          window.location = window.location.href.includes('localhost') 
            ? 'http://localhost:8888/login' 
            : 'https://yoomarvin-better-playlists-be.herokuapp.com/login' 
          }}
        style={{'padding': '20px', 'font-size': '25px', 'margin-top': '20px'}}>
          Sign in with Spotify
        </button>
        //If the stuff above exists, show it. Otherwise write loading...
      }

      </div>
    );
  }
}

export default App;
