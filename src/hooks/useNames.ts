import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import {loadList} from '../redux/ArrayReducers';

export const useNames = () => {
  const dispatch = useDispatch();
  const names = useSelector((state: RootState) => state.names.list);
  const fetchNames = () => {
    dispatch(loadList() as any);
  };

  useEffect(() => {
    fetchNames();
  }, []);

  return {
    names,
    refreshNames: fetchNames,
  };
};
