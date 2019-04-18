import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import FileCopy from "@material-ui/icons/FileCopy";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles/index";
import FormatPicker from "./FormatPicker";

const styles = {
  icon: {
    fontSize: "100px",
    marginTop: "35px"
  }
};

const DropFile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 15px;
  width: 90%;
  height: 200px;
  background: rgba(217, 219, 226, 1);
  color: white;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
`;

function DropFileArea(props) {
  const { classes } = props;
  const [file, setValue] = useState(null);
  const [fileReceived, setReceived] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      console.warn("file recieved!", acceptedFiles[0].name);
      setValue(reader.result);
      setReceived(true);
    };

    reader.readAsArrayBuffer(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <DropFile {...getRootProps()}>
        <input {...getInputProps()} />
        <FileCopy className={classes.icon} />
        Drop files here
      </DropFile>
      <FormatPicker fileData={file} received={fileReceived}/>
    </React.Fragment>
  );
}

DropFileArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropFileArea);
