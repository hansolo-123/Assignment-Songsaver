import "./App.css";
import AutoComplete from "./AutoComplete";
import React, { Component } from "react";
import { Item } from "./Item";

class App extends Component {
  constructor(props) {
    super(props);
    this.clearDataRef = React.createRef(null);
    this.state = {
      sort: "",
      toggle: false,
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
    this.removeItem = this.removeItem.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.alphaSort = this.alphaSort.bind(this);
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
    this.clearOptionInput();
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
    const newArray = this.state.artist_song.slice();
    const itemToBeAdded = {
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

  removeItem(Item) {
    console.log("clicked", Item, this.state.artist_song);
    const id = Item.id;
    const index = this.state.artist_song.findIndex(
      (playlist) => playlist.id === id
    );
    const playlist = [...this.state.artist_song];
    playlist[index] = {
      ...playlist.slice(0, index),
      ...playlist.slice(index + 1),
    };
    if (index !== -1) {
      playlist.splice(index, 1);
      this.setState({ artist_song: playlist });
    }
  }
  handleToggle = () => {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
    console.log(this.state.sort);
  };

  alphaSort = () => {
    if (this.state.sort === "artist") {
      return [...this.state.artist_song].sort(function (a, b) {
        let nameA = a.artist.toUpperCase();
        let nameB = b.artist.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    if (this.state.sort === "song") {
      return [...this.state.artist_song].sort(function (a, b) {
        let nameA = a.song.toUpperCase();
        let nameB = b.song.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    if (this.state.sort === "genre") {
      return [...this.state.artist_song].sort(function (a, b) {
        let nameA = a.genre.toUpperCase();
        let nameB = b.genre.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }
    if (this.state.sort === "rating") {
      return [...this.state.artist_song].sort(function(a, b) {
        let num1 = a.rating.toUpperCase();
        let num2 = b.rating.toUpperCase();
        if (num1 < num2) {
          return -1;
        }
        if (num1 > num2) {
        return 1;
      }
      return 0;
    });
  };
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
              <div
                className="para"
                value="artist"
                id="artist"
                onClick={() => {
                this.setState({ sort: "artist" });
                this.handleToggle();
                }}
              >
                <h3>Artist</h3>
                <div className="symbol">⇵</div>
              </div>
              <div
                className="para"
                id="song"
                onClick={() => {
                  this.setState({ sort: "song" });
                  this.handleToggle();
                
                }}
              >
                <h3>Song Title</h3>
                <div className="symbol">⇵</div>
              </div>

              <div
                className="para"
                id="genre"
                onClick={() => {
                  this.setState({ sort: "genre" });
                  this.handleToggle();
                }}
              >
                <h3>Genre</h3>
                <div className="symbol">⇵</div>
              </div>

              <div
                className="para"
                id="rating"
                onClick={() => {
                  this.setState({ sort: "rating" });
                  this.handleToggle();
                }}
              >
                <h3>Rating</h3>
                <div className="symbol">⇵</div>
              </div>
            </li>
            {(this.state.toggle
              ? this.alphaSort()
              : this.state.artist_song
            ).map((item) => (
              <Item
                key={Math.random().toString(36).slice(2)}
                clickItem={() => this.removeItem(item)}
                item={item}
              />
            ))}
          </ul>
        </div>
      </main>
    );
  }
}

export default App;
