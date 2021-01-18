import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  NewForm,
  ChooseForm,
  FillForm,
  Success,
  ChooseData,
  ViewData,
} from "./paths";
const App = () => {
  return (
    <>
      <Switch>
        <Route path="/home" component={Home}></Route>
        <Route path="/newForm" component={NewForm}></Route>
        <Route path="/chooseForm" component={ChooseForm}></Route>
        <Route path="/fillForm/:key" component={FillForm}></Route>
        <Route path="/success/:successId" component={Success}></Route>
        <Route path="/chooseData" component={ChooseData}></Route>
        <Route path="/viewData/:formId" component={ViewData}></Route>
      </Switch>
    </>
  );
};

export default App;
