import React, { Component } from 'react';

import './styles/index.css';

const axios = require('axios')

const playersURL = "http://localhost:3000/players";
const addPlayersURL = "http://localhost:3000/player";
const deletePlayersURL = "http://localhost:3000/player/";
const editPlayersURL = "http://localhost:3000/player/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      adaptName: "",
      adaptId: ""
    }
  }

  getPlayers = () => {
    axios.get(playersURL)
    .then(res => {
      this.setState({
        players: res.data
      })
    })
    .catch(error => {
      console.log(error + "(Failed to load API)")
    })
  }

  addPlayer = (adaptName) => {
    axios.post(addPlayersURL, {
      name: adaptName
    })
    .then(res => {
      this.getPlayers()
    })
    .catch(error => {
      console.log(error + "(Failed to add Player)")
    })
  }

  deletePlayer = (adaptId) => {
    axios.delete(deletePlayersURL + adaptId, {
      id: adaptId
    })
    .then(res => {
      this.getPlayers()
    })
    .catch(error => {
      console.log(error + "(Failed to delete Player)")
    })
  }

  editPlayer = (adaptId, adaptName) => {
    axios.put(editPlayersURL + adaptId, {
      params: {
        id: adaptId,
        name: adaptName
      }
    })
    .then(res => {
      this.getPlayers()
    })
    .catch(error => {
      console.log(error + "(Failed to edit Player)")
    })
  }

  componentDidMount() {
    this.getPlayers()
  }

  handleName = (e) => {
    this.setState({ adaptName: e.target.value });
  }
  handleId = (e) => {
    this.setState({ adaptId: e.target.value });
  }

  handleAdd = (e) => {
    let adaptName = this.state.adaptName
    this.addPlayer(adaptName)
  }
  handleDel = (e) => {
    let adaptId = this.state.adaptId
    this.deletePlayer(adaptId)
  }
  handleEdit = (e) => {
    let adaptId = this.state.adaptId
    this.editPlayer(adaptId)
  }
  render() {
    let playerList = this.state.players.map((players) => {
      return <li key={players.id}>name: {players.name} <span></span> id: {players.id} </li>
    })

    return (
      <div id="wrapper">
        <div id="player-list-container">
          <div id="player-list-content">
            <h2>
              Player List
            </h2>
            <ul>
              {playerList}
            </ul>
          </div>
        </div>

        <div id="cfg-container">
          <div className="box-container">
            <h2>
              Edit Player
            </h2>
            <div className="box-content">
            <input type="text" onChange={this.handleId} placeholder="Enter player ID..." />
              <button type="submit" onClick={this.handleEdit} >
                Edit
              </button>
            </div>
          </div>

          <div className="box-container">
            <h2>
              Add Player
            </h2>
            <div className="box-content">
              <input type="text" onChange={this.handleName} placeholder="Choose player name..." />
              <button type="submit" onClick={this.handleAdd} >
                Add
              </button>
            </div>
          </div>

          <div className="box-container">
            <h2>
              Delete Player
            </h2>
            <div className="box-content">
              <input type="text" onChange={this.handleId} placeholder="Enter player ID..." />
              <button type="submit" onClick={this.handleDel} >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
