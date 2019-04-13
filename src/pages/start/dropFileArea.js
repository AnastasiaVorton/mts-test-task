import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import FileCopy from "@material-ui/icons/FileCopy";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import FormatPicker from "./formatPicker";

const styles = {
  icon: {
    fontSize: "100px",
    marginTop: "35px"
  }
};

const DropFileArea = styled.div`
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

function MyDropzone(props) {
  const { classes } = props;

  const test = 1;

  const [file, setValue] = useState(0);

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      console.warn("file recieved!", acceptedFiles[0].name);
      const binaryStr = reader.result;
      const newVal = file + binaryStr;
      setValue(newVal);
      //   fileData = binaryStr;
      //   console.log(fileData);
    };

    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <DropFileArea {...getRootProps()}>
        <input {...getInputProps()} />
        <FileCopy className={classes.icon} />
        Drop files here
      </DropFileArea>
      <FormatPicker fileData={file} />
    </React.Fragment>
  );
}

MyDropzone.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyDropzone);
