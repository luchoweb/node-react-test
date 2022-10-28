import BizLayout from "./layout";
import BizForm from "../components/BizForm";
import { useParams } from "react-router-dom";

const BizCreatePage = () => {
  const { id: bizId } = useParams();

  return (
    <BizLayout>
      <h3 className="m-0">{!bizId ? 'Create' : 'Update'} company</h3>

      <BizForm bizId={bizId} />
    </BizLayout>
  )
}

export default BizCreatePage;
