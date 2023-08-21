import React from "react";
import Container from "@mui/material/Container";

const ContentContainer = ({ children }) => {
  return (
    <Container maxWidth="md" className="my-10">
      {children}
    </Container>
  );
};

export default ContentContainer;
