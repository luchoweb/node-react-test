import BizLayout from "./layout";
import ProductForm from "../components/ProductForm";

const ProductCreatePage = () => {
  return (
    <BizLayout>
      <h3 className="m-0">New product</h3>

      <ProductForm />
    </BizLayout>
  )
}

export default ProductCreatePage;
