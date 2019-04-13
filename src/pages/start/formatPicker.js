import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowForward from "@material-ui/icons/ArrowForward";

import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

const styles = {
  select: {
    width: "150px",
    maxWidth: "150px"
  },
  button: {
    margin: "15px",
    width: "90%",
    backgroundColor: "rgba(102, 119, 193, 1)",
    "&:hover": {
      backgroundColor: "rgba(72, 89, 168, 1)"
    }
  }
};

const formatsFrom = [
  {
    value: "docx",
    label: "Word DOCX"
  },
  {
    value: "pdf",
    label: "PDF"
  },
  {
    value: "pptx",
    label: "PowerPoint PPTX"
  },
  {
    value: "xlsx",
    label: "Excel XLSX"
  },
  {
    value: "csv",
    label: "CSV"
  }
];

const formatsTo = [
  {
    value: "pdf",
    label: "PDF"
  },
  {
    value: "xlsx",
    label: "Excel XLSX"
  },
  {
    value: "csv",
    label: "CSV"
  }
];

const ExtensionsCnntainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Success = styled.h2`
  display: ${props => (props.successful ? "block" : "none")};
`;

class FormatPicker extends Component {
  state = {
    format1: "docx",
    format2: "pdf",
    successful: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleConvert(from, to) {
    const headers = {
      Apikey: "88fb601c-d4dc-4760-8c3b-366f4abf547d"
    };
    axios
      .post(
        `https://api.cloudmersive.com/convert/${from}/to/${to}`,
        this.props.fileData,
        { headers: headers }
      )
      .then(response => {
        console.log("success!");
        console.log("data: ", response.data);
      })
      .then(data => {
        this.setState({ successful: true });
      })
      .catch(error => {
        dispatch({ type: ERROR_FINDING_USER });
      });

    // console.warn(
    //   "converting ",
    //   this.props.fileData,
    //   " from ",
    //   from,
    //   " to ",
    //   to
    // );
  }

  render() {
    return (
      <React.Fragment>
        <ExtensionsCnntainer>
          <TextField
            select
            label="Select format from"
            className={this.props.classes.select}
            value={this.state.format1}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange("format1")}
          >
            {formatsFrom.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <ArrowForward />
          <TextField
            select
            label="Select format from"
            className={this.props.classes.select}
            value={this.state.format2}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange("format2")}
          >
            {formatsTo.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            >
          </TextField>
        </ExtensionsCnntainer>
        <Button
          variant="contained"
          color="primary"
          className={this.props.classes.button}
          onClick={() =>
            this.handleConvert(this.state.format1, this.state.format2)
          }
        >
          Convert
        </Button>
        <Success visible={this.props.successful}>Success!</Success>
      </React.Fragment>
    );
  }
}

FormatPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  fileData: PropTypes.any
};

export default withStyles(styles)(FormatPicker);
