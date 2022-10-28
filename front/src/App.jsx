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
import BizPage from "./pages/dashboard/biz";
import BizCreatePage from "./pages/dashboard/biz/create";
import BizDeletePage from "./pages/dashboard/biz/delete";
import ProductPage from "./pages/dashboard/product";
import ProductCreatePage from "./pages/dashboard/product/create";
import ProductDeletePage from "./pages/dashboard/product/delete";

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

          <Route exact path="/dashboard">
            <PrivateRoute component={DashboardPage} />
          </Route>

          <Route exact path="/dashboard/biz/create">
            <PrivateRoute component={BizCreatePage} />
          </Route>
          <Route exact path="/dashboard/biz/:id">
            <PrivateRoute component={BizPage} />
          </Route>
          <Route exact path="/dashboard/biz/edit/:id">
            <PrivateRoute component={BizCreatePage} />
          </Route>
          <Route exact path="/dashboard/biz/delete/:id">
            <PrivateRoute component={BizDeletePage} />
          </Route>

          <Route exact path="/dashboard/product/create/:biz">
            <PrivateRoute component={ProductCreatePage} />
          </Route>
          <Route exact path="/dashboard/product/:id">
            <PrivateRoute component={ProductPage} />
          </Route>
          <Route exact path="/dashboard/product/edit/:id">
            <PrivateRoute component={ProductCreatePage} />
          </Route>
          <Route exact path="/dashboard/product/delete/:id">
            <PrivateRoute component={ProductDeletePage} />
          </Route>

          <Route path="*">
            {user?.info?.username ? <Redirect to="/dashboard" /> : <NotFoundPage />}
          </Route>
        </Switch>
      }
    </Router>
  );
}

export default App;
