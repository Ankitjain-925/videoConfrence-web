import { shallowEqual, useSelector } from 'react-redux';
const useAllLoginReducerAim = () => {
  const { stateLoginValueAim = [] } = useSelector(
    (state) => state.LoginReducerAim ?? {},
    shallowEqual
  );
  return stateLoginValueAim;
};

export default useAllLoginReducerAim;
