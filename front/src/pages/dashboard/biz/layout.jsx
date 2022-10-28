import Header from "../components/Header";

const BizLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="biz pt-4 pb-4">
        <div className="container">
          { children }
        </div>
      </div>
    </>
  )
}

export default BizLayout;
