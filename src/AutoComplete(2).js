import React, { useState, useEffect } from "react";
import Genres from "./Genres"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/";
import { Box } from "@mui/system";


function AutoComplete() {
  const [jsonResults, setJsonResults] = useState([]);
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState("")
  const [song, setSong] = useState("")
  const [genre, setGenre] = useState("")

  useEffect(() => {
    const url = `https://shazam.p.rapidapi.com/auto-complete?term=${query}&locale=en-US`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "36a1f1013fmshf3decc03d7287c7p18fe1cjsn05bde566eb9c",
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

  console.log(jsonResults);

  return (
    <Stack sx={{ width: 700, margin: "left" }} direction="row" >
      <Autocomplete className="AutoComplete"
        id="artist_suggestion"
        getOptionLabel={(jsonResults) => `${jsonResults}`}
        options={jsonResults}
        defaultValue={[""]}
        onInputChange={(e) => setQuery(e.target.value)}
        onChange={(event, newValue) => {
          setArtist(newValue);
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
        defaultValue={[""]}
        onInputChange={(e) => setQuery(e.target.value)}
        onChange={(event, newValue) => {
          setSong(newValue);
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
        defaultValue={[""]}
        onInputChange={(e) => setQuery(e.target.value)}
        onChange={(event, newValue) => {
          setGenre(newValue);
        }}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) =>
          option.Genres === value.Genres
        }
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
}

export default AutoComplete;


