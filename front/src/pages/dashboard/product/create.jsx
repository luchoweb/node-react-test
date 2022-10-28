import Layout from "../layout";
import ProductForm from "../components/ProductForm";

const ProductCreatePage = () => {
  return (
    <Layout>
      <h3 className="m-0">New product</h3>

      <ProductForm />
    </Layout>
  )
}

export default ProductCreatePage;
