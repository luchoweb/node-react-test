import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Amplify, Auth } from 'aws-amplify';
import useAuthCognito from "./hooks/useAuthCognito";

import PrivateRoute from "./components/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";

import awsmobile from './aws-exports';
Amplify.configure(awsmobile);

function App() {
  const {state, dispatch} = useAuthCognito();
  const { user } = state;

  useEffect(() => {
    const validateSession = async() => {
      try {
        const user = await Auth.currentAuthenticatedUser({bypassCache: false});
        dispatch({
          type: 'USER_SESSION',
          payload: {
            info: user,
            loading: true
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    if ( !user?.info?.username ) validateSession();

    setTimeout(() => {
      dispatch({
        type: 'USER_LOADING',
        payload: false
      })
    }, 1000)

  }, [user?.info, dispatch]);

  return (
    <Router>
      {user?.loading ? <LoadingSpinner /> : 
        <Switch>
          <Route exact path="/">
            {user?.info?.username ? <Redirect to="/dashboard" /> : <LoginPage />}
          </Route>

          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/dashboard/biz/create" component={DashboardPage} />
          <PrivateRoute path="/dashboard/biz/edit/:id" component={DashboardPage} />
          <PrivateRoute path="/dashboard/biz/delete/:id" component={DashboardPage} />

          <PrivateRoute path="/dashboard/product/export" component={DashboardPage} />
          <PrivateRoute path="/dashboard/product/create/:id" component={DashboardPage} />
          <PrivateRoute path="/dashboard/product/edit/:id" component={DashboardPage} />
          <PrivateRoute path="/dashboard/product/delete/:id" component={DashboardPage} />

          <Route path="*">
            {user?.info?.username ? <Redirect to="/dashboard" /> : <NotFoundPage />}
          </Route>
        </Switch>
      }
    </Router>
  );
}

export default App;
