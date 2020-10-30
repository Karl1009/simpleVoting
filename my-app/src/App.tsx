import React from "react";

import NavBar from "./components/NavBar";
import MainPage from "./pages/MainPage";
import CampaignPage from "./pages/CampaignPage"
import { Switch, Route } from "react-router-dom";
import AllCampaignsPage from "./pages/AllCampaignsPage"
import AddNewCampaignPage from "./pages/AddNewCampaignPage"
import FinishedCampaignPage from "./pages/FinishedCampaignPage"
function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
      <Route path="/" exact={true} component={MainPage}/>
      <Route path="/campaign/:campaign_id" exact={true} component={CampaignPage}/>
      <Route path="/allcampaigns" exact={true} component={AllCampaignsPage}/>
      <Route path="/newCampaign" exact={true} component={AddNewCampaignPage}/>
      <Route path="/finishedCampaign" exact={true} component={FinishedCampaignPage}/>
      </Switch>
    </div>
  );
}

export default App;
