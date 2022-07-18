import { createContext, useEffect, useState } from "react";
import { useUserQuery } from "../app/AuthApi";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [bread, setBread] = useState("");
  const navigate = useNavigate();
  const { data: user } = useUserQuery();
  useEffect(() => {
    if (user?.role?.roleName === "Admin") {
      // window.location.replace("/admin");
      // navigate("/admin");
    }
  }, [user]);
  // const [authState, setAuth] = useState({
  //   user: [],
  //   isAuthenticated: false,
  // });
  // const { user: userRedux } = useSelector((state) => state.auths);
  // const [login, { data, isLoading, error }] = useLoginMutation();

  // useEffect(() => {
  //   refetch();
  // }, [userRedux]);

  const datas = { user, bread, setBread };
  return <AuthContext.Provider value={datas}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
