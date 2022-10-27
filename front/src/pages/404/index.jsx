import { Link } from "react-router-dom"

import "./styles.scss";

const NotFoundPage = () => {
  return(
    <div className="notFound text-center">
      <h1>Page not found!</h1>
      <Link to="/" className="text-dark">Go to login page</Link>
    </div>
  )
}

export default NotFoundPage;
