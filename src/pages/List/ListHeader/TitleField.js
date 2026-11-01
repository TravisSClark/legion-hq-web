import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

function TitleField({ activations, title, handleChange }) {
  return (
    <TextField
      value={title}
      helperText={`${activations} ${
        activations === 1 ? "activation" : "activations"
      }`}
      onChange={handleChange}
      fullWidth={true}
    />
  );
}

TitleField.propTypes = {
  activations: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TitleField;
