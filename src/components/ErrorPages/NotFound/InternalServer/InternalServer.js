import React from "react";
import "./InternalServer.css";
import Logo from '../../../Images/internalError.png';

const InternalServer = props => {
  return (
    <p className={'notFoundInternal'}>
    <img src={Logo} alt="NotFoundPage" />
    <h1>InternalServer Error Contact Admin</h1>
</p>
  );
};

export default InternalServer;
