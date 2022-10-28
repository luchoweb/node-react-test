import BizLayout from "./layout";
import BizForm from "../components/BizForm";

const BizCreatePage = () => {
  return (
    <BizLayout>
      <h3 className="m-0">New company</h3>

      <BizForm />
    </BizLayout>
  )
}

export default BizCreatePage;
