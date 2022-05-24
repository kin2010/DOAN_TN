import { createContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useUserQuery } from '../app/AuthApi';
import { getToken } from '../Utils/Common';
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const { data: user, isLoading, error, refetch } = useUserQuery();
  const [authState, setAuth] = useState({
    user: [],
    isAuthenticated: false,
  });
  const { user: userRedux } = useSelector((state) => state.auths);
  // const [login, { data, isLoading, error }] = useLoginMutation();

  useEffect(() => {
    refetch();
  }, [userRedux]);
  //have token
  if (getToken()) {
  }
  const datas = { user };
  return <AuthContext.Provider value={datas}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
