import { useParams } from "react-router-dom";
import Layout from "../layout";
import BizForm from "../components/BizForm";

const BizCreatePage = () => {
  const { id: bizId } = useParams();

  return (
    <Layout>
      <h3 className="m-0">{!bizId ? 'Create' : 'Update'} company</h3>

      <BizForm bizId={bizId} />
    </Layout>
  )
}

export default BizCreatePage;
