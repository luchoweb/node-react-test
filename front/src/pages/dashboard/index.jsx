import { Auth } from "aws-amplify";
import useAuth from "../../hooks/useAuthCognito";

const DashboardPage = () => {
  const {state, dispatch} = useAuth();

  const signOut = async() => {
    try {
      await Auth.signOut({ global: true });
      dispatch({
        type: 'USER_SESSION',
        payload: {
          info: {},
          loading: true
        }
      })
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <div className="dashboard">
      <button className="btn btn-danger btn-sm" onClick={() => signOut()}>Logout</button>
      <h1>Dashboard</h1>
      {state?.user?.username}
    </div>
  )
}

export default DashboardPage;
