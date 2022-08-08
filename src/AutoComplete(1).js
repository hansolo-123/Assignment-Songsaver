import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/";
import { Box } from "@mui/system";

function AutoComplete() {
  const [jsonResults, setJsonResults] = useState([]);
  useEffect(() => {
    const url =
      "https://shazam.p.rapidapi.com/auto-complete?term=michael%20ja&locale=en-US";

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
  var finalArray = jsonResults.hints.map(function (obj) {
    return obj.term;
  });
  console.log(finalArray);

  return (
    <Stack sx={{ width: 300, margin: "auto" }}>
      <Autocomplete
        id="song_suggestion"
        getOptionLabel={(finalArray) => `${finalArray}`}
        options={finalArray}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) =>
          option.finalArray === value.finalArray
        }
        noOptiontext={"no suggestions found"}
        renderOption={(props, finalArray) => (
          <Box
            component="li"
            {...props}
            key={Math.random().toString(36).slice(2)}
          >
            {finalArray}
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
