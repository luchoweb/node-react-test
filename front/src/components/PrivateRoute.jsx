import { Route, Redirect } from "react-router-dom";
import useAuthCognito from "../hooks/useAuthCognito";

const PrivateRoute = ({ component: Component, path }) => {
  const { state } = useAuthCognito();
  return (
    <Route exact path={path}>
      { state?.user?.info?.username ? <Component /> : <Redirect to="/" /> }
    </Route>
  )
}

export default PrivateRoute;
