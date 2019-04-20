import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import Button from "@material-ui/core/Button/index";
import CircularProgress from "@material-ui/core/CircularProgress/index";

import PropTypes from "prop-types";
import axios from "axios/index";
import Success from "./SuccessComponent";
import Extensions from "./Extensions";
import { formatsFrom } from "./Extensions";

const styles = {
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

  handleConvert(from, to) {
    let foundFormat = false;
    for (let ext of formatsFrom) {
      if (this.props.extension === ext["value"]) {
        foundFormat = true;
        break;
      }
    }
    if (!foundFormat) {
      alert(
        "The extension of the file you provided is not supported yet. Please, provide a file in one of provided extension."
      );
      window.location.reload();
      return;
    }
    if (this.props.extension !== from) {
      alert(
        `The extension of your file is not the one you chose. Please chose another extension or provide a .${from} file.`
      );
      window.location.reload();
      return;
    }
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
        <Extensions
          format1={this.state.format1}
          format2={this.state.format2}
          handleChange={this.handleChange("format1")}
        />
        <Button
          variant="contained"
          color="primary"
          className={this.props.classes.button}
          disabled={loading || !this.props.received}
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
  fileData: PropTypes.any,
  received: PropTypes.bool,
  extension: PropTypes.string
};

export default withStyles(styles)(FormatPicker);
