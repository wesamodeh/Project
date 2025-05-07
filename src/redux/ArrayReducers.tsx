import {AppDispatch} from './Store';
import {setList} from './namesSlice';

export const loadList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    const names = data.map((user: any) => ({
      id: user.id,
      name: user.name,
    }));

    dispatch(setList(names));
  } catch (error) {
    console.log('Error fetching names:', error);
  }
};
