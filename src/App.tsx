import "./App.css";
import "react-router-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./containers/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />

          <Redirect to="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
