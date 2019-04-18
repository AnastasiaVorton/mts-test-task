import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles/index";
import TextField from "@material-ui/core/TextField/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import ArrowForward from "@material-ui/icons/ArrowForward";

import PropTypes from "prop-types";
import styled from "styled-components";

const styles = {
    select: {
        width: "150px",
        maxWidth: "150px"
    },
};

const formatsFrom = [
    {
        value: "docx",
        label: "Word DOCX"
    },
    {
        value: "xlsx",
        label: "Excel XLSX"
    },
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

class Extensions extends Component {
    render() {
        return (
                <ExtensionsCnntainer>
                    <TextField
                        select
                        label="Select format from"
                        className={this.props.classes.select}
                        value={this.props.format1}
                        margin="normal"
                        variant="outlined"
                        onChange={this.props.handleChange}
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
                        value={this.props.format2}
                        margin="normal"
                        variant="outlined"
                    >
                        {formatsTo.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                        >
                    </TextField>
                </ExtensionsCnntainer>
        );
    }
}

Extensions.propTypes = {
    classes: PropTypes.object.isRequired,
    format1: PropTypes.string,
    format2: PropTypes.string,
    handleChange: PropTypes.func
};

export default withStyles(styles)(Extensions);
