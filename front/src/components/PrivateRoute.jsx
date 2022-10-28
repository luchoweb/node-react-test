import { Redirect, useLocation } from "react-router-dom";
import { userRoleValidation } from "../helpers/userRoleValidation";
import useAuthCognito from "../hooks/useAuthCognito";

const PrivateRoute = ({ component: Component }) => {
  const location = useLocation();
  const { state } = useAuthCognito();
  const username = state?.user?.info?.username;
  const isAdmin = username && userRoleValidation(state?.user?.info);

  const adminActions = ['create', 'edit', 'delete', 'update'];
  const checkPath = adminActions.filter(action => location.pathname.includes(action));

  console.log(checkPath)

  if ( checkPath.length ) return isAdmin ? <Component /> : <Redirect to="/dashboard" />;

  return !username ? <Redirect to="/" /> : <Component />;
}

export default PrivateRoute;
