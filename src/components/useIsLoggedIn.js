import { useSelector } from 'react-redux';

const useIsLoggedIn = () => {
  const token = useSelector((state) => state.user.token);
  return token;
};

export default useIsLoggedIn;
