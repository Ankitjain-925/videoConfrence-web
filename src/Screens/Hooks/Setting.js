import { shallowEqual, useSelector } from 'react-redux';
const useAllSetting = () => {
  const { settings = [] } = useSelector(
    (state) => state.Settings ?? {},
    shallowEqual
  );
  return settings;
};

export default useAllSetting;
