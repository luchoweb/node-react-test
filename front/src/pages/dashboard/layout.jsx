import Header from "./components/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="dashboard pt-4 pb-4">
        <div className="container">
          { children }
        </div>
      </div>
    </>
  )
}

export default Layout;
