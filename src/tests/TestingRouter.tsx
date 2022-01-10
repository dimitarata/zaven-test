import { createMemoryHistory } from "history";
import { ReactElement } from "react";
import { Router, Route } from "react-router-dom";

const history = createMemoryHistory();

interface ITestingRouterProps {
  RedirectedComponent: () => ReactElement;
  redirectionUrl: string;
}

export default function TestingRouter({
  RedirectedComponent,
  redirectionUrl,
}: ITestingRouterProps) {
  return (
    <Router history={history}>
      <Route path="/" exact component={RedirectedComponent} />
      <Route path={redirectionUrl} render={() => <>{redirectionUrl}</>} />
    </Router>
  );
}
