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

const FileReceived = styled.div`
  padding: 0 20px;
  text-align: center;
  display: ${props => (props.received ? "flex" : "none")};
  word-break: break-all;
`;

function DropFileArea(props) {
  const { classes } = props;
  const [file, setValue] = useState(null);
  const [fileReceived, setReceived] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileExt, setExtension] = useState("");

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      if (acceptedFiles.length > 1) {
        alert(
          "Only one file is allowed! Please use a single file for conversion."
        );
        window.location.reload();
        return;
      }
      const nameExtArr = acceptedFiles[0].name.split(".");
      setExtension(nameExtArr[nameExtArr.length-1]);
      setFileName(acceptedFiles[0].name);
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
        <FileReceived received={fileReceived}><p>{fileName}</p></FileReceived>
      <FormatPicker
        extension={fileExt}
        fileData={file}
        received={fileReceived}
      />
    </React.Fragment>
  );
}

DropFileArea.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DropFileArea);
