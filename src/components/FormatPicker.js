import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import TextField from "@material-ui/core/TextField/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import ArrowForward from "@material-ui/icons/ArrowForward";
import CircularProgress from "@material-ui/core/CircularProgress/index";

import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios/index";
import Success from "./SuccessComponent";

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
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};

const formatsFrom = [
  {
    value: "docx",
    label: "Word DOCX"
  },
  {
    value: "xlsx",
    label: "Excel XLSX"
  }
];

const formatsTo = [
  {
    value: "pdf",
    label: "PDF"
  }
];

const ExtensionsCnntainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

class FormatPicker extends Component {
  state = {
    format1: "docx",
    format2: "pdf",
    loading: false,
    successful: false,
    fileLink: null
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  downloadFile() {
    const fileDownload = require("js-file-download");
    fileDownload(this.state.fileLink, "result.pdf");
  }

  handleConvert(from, to) {
    this.setState({ loading: true });
    const headers = {
      Apikey: "88fb601c-d4dc-4760-8c3b-366f4abf547d",
      "Content-Type": "multipart/form-data",
      accept: "application/octet-stream"
    };

    axios.defaults.baseURL = "https://api.cloudmersive.com";
    axios
      .post(`/convert/${from}/to/${to}`, this.props.fileData, {
        headers: headers,
        responseType: "arraybuffer"
      })
      .then(response => {
        this.setState({ loading: false });
        console.log("success!");
        const file = new Blob([response.data], {
          type: "application/" + to
        });
        const url = URL.createObjectURL(file);
        this.setState({ fileLink: url });
      })
      .then(data => {
        this.setState({ successful: true });
      })
      .catch(error => {
        dispatch({ type: ERROR_FINDING_USER });
      });
  }

  render() {
    const { loading } = this.state;
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
            label="Select format to"
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
          disabled={loading}
          onClick={() =>
            this.handleConvert(this.state.format1, this.state.format2)
          }
        >
          Convert
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            className={this.props.classes.buttonProgress}
          />
        )}
        <Success
          success={this.state.successful}
          fileLink={this.state.fileLink}
        />
      </React.Fragment>
    );
  }
}

FormatPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  fileData: PropTypes.any
};

export default withStyles(styles)(FormatPicker);
