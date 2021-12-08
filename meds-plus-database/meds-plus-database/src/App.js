import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AddMed from "./components/add-med.component";
import MedsList from "./components/meds-list.component";

export default function App() {
  return (
      <Router>
        <div>
          <Link to="/add">ADD</Link>
        </div>
        <div>
          <Link to="/tutorials">View</Link>
        </div>

        <hr />

        <Switch>
          <Route path="/add">
            <AddMed />
          </Route>
          <Route path="/tutorials">
            <MedsList />
          </Route>
        </Switch>
      </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
