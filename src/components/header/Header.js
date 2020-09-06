import React from "react";
import { withStyles, AppBar, Avatar } from "@material-ui/core";
import { Style } from "./Style";
import { withRouter } from "react-router-dom";

const Header = ({ classes, history }) => {
  return (
    <AppBar className={classes.container} color="primary">
      <div className={classes.header}>
        <Avatar onClick={() => history.push('/')}>CP</Avatar>
        <h1 onClick={() => history.push('/')} className={classes.name}>Campaign</h1>
      </div>
    </AppBar>
  );
};

export default withStyles(Style)(withRouter(Header));
