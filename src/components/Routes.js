import React, { lazy, Suspense } from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const CampaignDetail = lazy(() => import("../pages/CampaignDetail"));
const AddNewCampaign = lazy(() => import("../pages/AddNewCampaign"));
const Header = lazy(() => import("../components/header/Header"));

export default function Routes() {
  const classes = useStyle();

  return (
    <Suspense
      fallback={
        <div className={classes.loader}>
          <CircularProgress size={40} color="primary" />
        </div>
      }
    >
      <Router>
        <Header />
        <div className={classes.content}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/campaign-detail/:id" exact component={CampaignDetail} />
          <Route path="/add" exact component={AddNewCampaign} />
        </div>
      </Router>
    </Suspense>
  );
}

const useStyle = makeStyles((theme) => ({
  loader: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginTop: 60,
    padding: "10px 120px",
  },
}));
