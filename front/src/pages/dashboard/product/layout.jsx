import Header from "../components/Header";

const ProductLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="product pt-4 pb-4">
        <div className="container">
          { children }
        </div>
      </div>
    </>
  )
}

export default ProductLayout;
