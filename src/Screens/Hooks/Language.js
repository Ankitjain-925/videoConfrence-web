import { shallowEqual, useSelector } from 'react-redux';
const useAllLanguage = () => {
  const { stateLanguageType = [] } = useSelector(
    (state) => state.LanguageReducer ?? {},
    shallowEqual
  );
  return stateLanguageType;
};

export default useAllLanguage;
