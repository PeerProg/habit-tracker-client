import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';
import { Header } from './components';
import { UserProviderComponent } from './contexts';

const App = () => {
  return (
    <UserProviderComponent>
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <div className="container">
            <Switch>
              {routes.map(({ path, component, exact }, index) => (
                <Route
                  key={index}
                  path={path}
                  component={component}
                  exact={exact}
                />
              ))}
              <Redirect to="/" />
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
    </UserProviderComponent>
  );
};

export default App;
