import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useAuthCognito = () => useContext(UserContext);

export default useAuthCognito;
