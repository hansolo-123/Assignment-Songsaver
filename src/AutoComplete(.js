import React, { useState, useEffect,  } from "react";
import Genres from "./Genres";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/";
import { Box } from "@mui/system";

const AutoComplete = React.memo((props) => {
  const [jsonResults, setJsonResults] = useState([]);
  const [query, setQuery] = useState("");
  const [artistData, setArtistData] = useState("");
  const [songData, setSongData] = useState("");
  const [genreData, setGenreData] = useState("");

  useEffect(() => {
    const url = `https://shazam.p.rapidapi.com/auto-complete?term=${query}&locale=en-US&offset=0&limit=5`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fda18cc248msh9d9173d406fc949p17d49ajsn654407f3dcb6",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };

    

    const fetchKeywords = async () => {
      const data = await fetch(url, options);
      const jsonData = await data.json();
      if (jsonData.hints.some((e) => e.term === "undefined")) {
        return setJsonResults(["no suggestions found"]);
      }
      setJsonResults(jsonData.hints.map((item) => item.term));
    };

    fetchKeywords(url, options);
  }, [query]);

  console.log(jsonResults)
  console.log(artistData, songData, genreData)

  return (
    <Stack sx={{ width: 700, margin: "left" }} direction="row">
      <Autocomplete
        className="AutoComplete"
        id="artist_suggestion"
        getOptionLabel={(jsonResults) => `${jsonResults}`}
        options={jsonResults}
        freeSolo
        autoSelect
        defaultValue={[artistData]}
        onInputChange={(e) => {setQuery(e.target.value); setArtistData(e.target.value)}}
        onChange={(event, value) => {
          if (event) {
            event.id = "artist";
          }
          props.clicked(event, value);
        }}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) =>
          option.jsonResults === value.jsonResults
        }
        noOptiontext={"no suggestions found"}
        renderOption={(props, jsonResults) => (
          <Box
            component="li"
            {...props}
            key={Math.random().toString(36).slice(2)}
          >
            {jsonResults}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="search an artist" />
        )}
      />
      <Autocomplete
        id="song_suggestion"
        getOptionLabel={(jsonResults) => `${jsonResults}`}
        options={jsonResults}
        freeSolo
        autoSelect
        defaultValue={[songData]}
        onInputChange={(e) => {setQuery(e.target.value); setSongData(e.target.value)}}
        onChange={(event, value) => {
          if (event) {
            event.id = "song";
          }
          props.clicked(event, value);
        }}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) =>
          option.jsonResults === value.jsonResults
        }
        noOptiontext={"no suggestions found"}
        renderOption={(props, jsonResults) => (
          <Box
            component="li"
            {...props}
            key={Math.random().toString(36).slice(2)}
          >
            {jsonResults}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="search a song" />
        )}
      />
      <Autocomplete
        id="genre_suggestion"
        getOptionLabel={(Genres) => `${Genres}`}
        options={Genres}
        freeSolo
        autoSelect
        defaultValue={[genreData]}
        onChange={(event, value) => {
          if (event) {
            event.id = "genre";
          }
          props.clicked(event, value);
          setGenreData(event.target.value)}
        }
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) => option.Genres === value.Genres}
        noOptiontext={"no suggestions found"}
        renderOption={(props, Genres) => (
          <Box
            component="li"
            {...props}
            key={Math.random().toString(36).slice(2)}
          >
            {Genres}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="select a genre" />
        )}
      />
    </Stack>
  );
});

export default AutoComplete;
