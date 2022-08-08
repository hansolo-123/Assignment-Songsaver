import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/";
import { Box } from "@mui/system";

function AutoComplete() {
  const [jsonResults, setJsonResults] = useState([]);
  useEffect(() => {
    const url =
      "https://shazam.p.rapidapi.com/auto-complete?term=kiss%20the&locale=en-US";

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "4cca8a9cf7mshca269824eef397dp151856jsn53d3ecc1a2d8",
        "X-RapidAPI-Host": "shazam.p.rapidapi.com",
      },
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setJsonResults(response))
      .catch((err) => console.error(err));
  }, []);
 
  console.log(jsonResults);

  return (
    <Stack sx={{ width: 300, margin: "auto" }}>
      <Autocomplete
        id="song_suggestion"
        getOptionLabel={(jsonResults) => `${jsonResults}`}
        options={jsonResults}
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
    </Stack>
  );
}

export default AutoComplete;
