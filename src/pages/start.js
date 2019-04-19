import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles/index";
import Card from "@material-ui/core/Card/index";

import PropTypes from "prop-types";
import DropFileArea from "../components/DropFileArea";

const styles = {
  card: {
    minWidth: 400,
    maxWidth: 400,
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
          <DropFileArea />
        </Card>
      </React.Fragment>
    );
  }
}

StartPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StartPage);
