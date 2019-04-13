import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import PropTypes from "prop-types";
import MyDropzone from "./dropFileArea";

const styles = {
  card: {
    minWidth: 400,
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  }
};

class StartPage extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Card className={this.props.classes.card}>
          <MyDropzone />
        </Card>
      </React.Fragment>
    );
  }
}

StartPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StartPage);
