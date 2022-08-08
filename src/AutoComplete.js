import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Autocomplete } from "@mui/material/";
import { Box } from "@mui/system";

function AutoComplete() {
  const [jsonResults, setJsonResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const url =
      `https://shazam.p.rapidapi.com/auto-complete?term=${query}&locale=en-US`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '36a1f1013fmshf3decc03d7287c7p18fe1cjsn05bde566eb9c',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
      };

      

    console.log(query)
     
    const fetchKeywords = async () => {
      const data = await fetch(url, options);
      const jsonData = await data.json();
      setJsonResults(jsonData.hints.map((item)=>item.term))
    };
   
    fetchKeywords(url, options);
  },[query])

  console.log(jsonResults);

  return (
    <Stack sx={{ width: 300, margin: "auto" }}>
      <Autocomplete
        id="song_suggestion"
        getOptionLabel={(jsonResults) => `${jsonResults}`}
        options={jsonResults}
        defaultValue={[""]}
        onInputChange={e => setQuery(e.target.value)}
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
    </Stack>
  );
}

export default AutoComplete;
