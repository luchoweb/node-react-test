import { Redirect } from "react-router-dom";
import useAuthCognito from "../hooks/useAuthCognito";

const PrivateRoute = ({ component: Component }) => {
  const { state } = useAuthCognito();
  const username = state?.user?.info?.username;

  return username ? <Component /> : <Redirect to="/" />;
}

export default PrivateRoute;
