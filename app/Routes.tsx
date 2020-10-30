/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './pages/HomePage';

const LazyCounterPage = React.lazy(() => import('./containers/CounterPage'));

const LazyControlPage = React.lazy(() => import('./pages/ControlPage'));

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

const ControlPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyControlPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.CONTROL} component={ControlPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
