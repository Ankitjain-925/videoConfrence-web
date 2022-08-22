import { shallowEqual, useSelector } from 'react-redux';
const useAllMetaData = () => {
  const { metadata = [] } = useSelector(
    (state) => state.OptionList ?? {},
    shallowEqual
  );
  return metadata;
};

export default useAllMetaData;
