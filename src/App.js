import "./App.css";
import AutoComplete from "./AutoComplete";
import React, { Component } from "react";
import { Item } from "./Item";

class App extends Component {
  constructor(props) {
    super(props);
    this.clearDataRef = React.createRef(null);
    this.state = {
      artist: "",
      song: "",
      genre: "",
      rating: "",
      artist_song: [],
    };

    this.callbackFunction = this.callbackFunction.bind(this);
    this.clicked = this.clicked.bind(this);
    this.handle = this.handle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callbackFunction = (event, value) => {
    if (event.id === "artist") {
      return this.setState({ artist: value }, console.log(this.state));
    }
    if (event.id === "song") {
      return this.setState({ song: value }, console.log(this.state));
    }
    if (event.id === "genre") {
      return this.setState({ genre: value }, console.log(this.state));
    }
    if (event.id === "rating") {
      return this.setState({ rating: value }, console.log(this.state));
    }
  };

  clicked = (event, value) => {
    this.callbackFunction(event, value);
  };

  handle(event) {
    event.preventDefault();
    if (Object.keys(this.state.artist).length === 0) {
      return alert("All inputfields are required! (no artist selected)");
    }
    if (Object.keys(this.state.song).length === 0) {
      return alert("All inputfields are required! no song selected)");
    }
    if (Object.keys(this.state.genre).length === 0) {
      return alert("All inputfields are required! no genre selected)");
    }
    if (Object.keys(this.state.rating).length === 0) {
      return alert("All inputfields are required! no rating selected)");
    }

    this.handleSubmit(this.state);
  }

  handleSubmit() {
    var newArray = this.state.artist_song.slice();
    var itemToBeAdded = {
      artist: this.state.artist,
      id: Math.random().toString(36).slice(2),
      song: this.state.song,
      genre: this.state.genre,
      rating: this.state.rating,
    };
    newArray.push(itemToBeAdded);
    console.log(newArray);
    this.setState({ artist_song: newArray });
    this.setState({ artist: "" });
    this.setState({ id: "" });
    this.setState({ song: "" });
    this.setState({ genre: "" });
    this.setState({ rating: "" });
  }

  render() {
    return (
      <main>
        <div className="App">
          <header className="header">
            <h3>My Music Library</h3>
          </header>
          <form className="submit" id="myForm" onSubmit={this.handle}>
            <AutoComplete clicked={this.clicked} className="AutoComplete" />
            <button className="submit_btn">Add item</button>
          </form>
          <div className="SongSaver"></div>
          <ul className="ListItems">
            <li>
              <div>
                <h3>Artist</h3>
              </div>

              <div>
                <h3>Song Title</h3>
              </div>

              <div>
                <h3>Genre</h3>
              </div>

              <div>
                <h3>Rating</h3>
              </div>
            </li>
            {this.state.artist_song.map((item) => (
              <Item key={Math.random().toString(36).slice(2)} item={item} />
            ))}
          </ul>
        </div>
      </main>
    );
  }
}

export default App;
