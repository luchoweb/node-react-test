import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import useAuthCognito from "../../../hooks/useAuthCognito";

const Header = () => {
  const {dispatch} = useAuthCognito();

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
    <header className="bg-dark text-white pt-3 pb-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-3 col-md-6">
            <Link to="/dashboard" className="text-white">
              <h4>Test</h4>
            </Link>
          </div>
          <div className="col-3 col-md-6 text-end">
            <button className="btn btn-danger btn-sm" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
