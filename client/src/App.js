
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOfPosts: [],
      post: ''
    }
  }

  componentDidMount() {
    this.getDataFromDB();
  }

  getDataFromDB = () => {
    fetch('/api/posts/', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => this.setState({ listOfPosts: json }))
      .catch(err => console.log(err))
  }

  handleAdd = () => {
    fetch('/api/posts?post=' + this.state.post, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post: this.state.post,
      })
    })
      .then(res => res.json())
      .then(json => this.setState({ listOfPosts: json }))
      .catch(err => console.log(err))
  }

  handleDelete = (id) => {
    fetch('/api/posts/' + id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(json => this.setState({listOfPosts: json}))
      .catch(err => console.log(err))
  }

  handleEdit = (id) => {
    fetch('/api/posts/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post: this.state.post,
      })
    })
      .then(res => res.json())
      .then(json => this.setState({listOfPosts: json}))
      .catch(err => console.log(err))
  }

  handlePost = (e) => {
    this.setState({
      post: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
          <div className="instruction">
            Write post and click add or edit.
          </div>
        <div className="inputDiv">
          <input onChange={this.handlePost} type="text" placeholder="Enter Post" />
          <button onClick={() => this.handleAdd()}>Add</button>
        </div>
        <div>
          {
            this.state.listOfPosts.map((post) => {
              return (
                <div className="postDiv" key={post.post}>
                  {post.post}
                  <button onClick={() => this.handleDelete(post._id)}>Delete</button>
                  <button onClick={() => this.handleEdit(post._id)}>Edit</button>
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
