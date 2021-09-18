import React from "react";
import styled from "styled-components";
import {TextField, Button} from "@material-ui/core";
import {COLOR} from "@src/theme";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import Error from "@src/components/Error";

const SearchInput = styled(TextField)`
  width: 100%;
  font-family: "Source Sans Pro", sans-serif;
  margin-right: 0;
  background: ${COLOR.white};
  .MuiFormLabel-root {
    font-family: "Source Sans Pro", sans-serif;
  }
  fieldset {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .MuiInputBase-root {
    font-family: "Source Sans Pro", sans-serif;
  }

  #search-text-field-label {
    color: black;
    font-weight: 300;
    line-height: 14px;
  }
`;

const SearchBtn = styled(Button)`
  width: 50px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: none;
`;

const InputRow = styled.div`
  margin: 0 0 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  width: 20px;
  opacity: 0.4;
  :hover {
    opacity: 0.2;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  cursor: pointer;
  width: 20px;
  :hover {
    opacity: 0.7;
  }
`;

const Search = ({cityInputVal, handleChange, handleSearch, errorMsg, handleReset}) => {
  return (
    <>
      <InputRow>
        <SearchInput
          variant="outlined"
          placeholder="Berlin"
          label="Search for an EU city"
          id="search-text-field"
          value={cityInputVal}
          onChange={e => {
            const first = e.target.value.charAt(0).toUpperCase();
            const last = e.target.value.slice(1).toLowerCase();
            handleChange(first + last);
          }}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(cityInputVal);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <StyledCloseIcon
                  onClick={e => {
                    handleReset(e);
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
        <SearchBtn
          variant="contained"
          aria-label="search"
          onClick={e => {
            e.preventDefault();
            handleSearch(cityInputVal);
          }}
        >
          <StyledSearchIcon />
        </SearchBtn>
      </InputRow>
      {errorMsg && <Error>{errorMsg} </Error>}
    </>
  );
};

export default Search;
