import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const SuccessDiv = styled.div`
  display: ${props => (props.success ? "flex" : "none")};
  align-items: center;
  flex-direction: column;
  padding: 15px;
`;

const Text = styled.p`
  margin: 10px;
  font-size: 20px;
`;

const Success = props => {
  const { success, fileLink } = props;
  return (
    <SuccessDiv success={success}>
      <Text>File successfully converted!</Text>
      <Button variant="outlined" color="primary" href={fileLink} download>
        Download
      </Button>
    </SuccessDiv>
  );
};

Success.propTypes = {
  success: PropTypes.bool,
  fileLink: PropTypes.any
};

export default Success;
