
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOfAlbums: [],
      artist: '',
      album: '',
      albumCover: ''
    }
  }

  componentDidMount() {
    this.getDataFromDB();
  }

  getDataFromDB = () => {
    fetch('/api/albums/', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => this.setState({ listOfAlbums: json }))
      .catch(err => console.log(err))
  }

  handleAdd = () => {
    fetch('/api/albums?artist=' + this.state.artist + 'album=' + this.state.album + 'albumCover=' + this.state.albumCover, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artist: this.state.artist,
        album: this.state.album,
        albumCover: this.state.albumCover
      })
    })
      .then(res => res.json())
      .then(json => this.setState({ listOfAlbums: json }))
      .catch(err => console.log(err))
  }

  handleDelete = (id) => {
    fetch('/api/albums/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(json => this.setState({listOfAlbums: json}))
      .catch(err => console.log(err))
  }

  handleEdit = (id) => {
    fetch('/api/albums/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        artist: this.state.artist,
        album: this.state.album,
        albumCover: this.state.albumCover
      })
    })
      .then(res => res.json())
      .then(json => this.setState({listOfAlbums: json}))
      .catch(err => console.log(err))
  }

  handleArtist = (e) => {
    this.setState({
      artist: e.target.value
    })
  }

  handleAlbum = (e) => {
    this.setState({
      album: e.target.value
    })
  }

  handleURL = (e) => {
    this.setState({
      albumCover: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="inputDiv">
          <input onChange={this.handleArtist} type="text" placeholder="Enter artist" />
          <input onChange={this.handleAlbum} type="text" placeholder="Enter album" />
          <input onChange={this.handleURL} type="text" placeholder="Enter imgURL" />
          <button onClick={() => this.handleAdd()}>Add</button>
        </div>
        <div>
          {
            this.state.listOfAlbums.map((album) => {
              return (
                <div key={album.artist}>
                  {album.artist}
                  <button onClick={() => this.handleDelete(album._id)}>Delete</button>
                  <button onClick={() => this.handleEdit(album._id)}>Edit</button>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
