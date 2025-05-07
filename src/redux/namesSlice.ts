import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Name {
  id: number;
  name: string;
}

interface NamesState {
  list: Name[];
}

const initialState: NamesState = {
  list: [],
};

const namesSlice = createSlice({
  name: 'names',
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Name[]>) => {
      state.list = action.payload;
    },
  },
});

export const {setList} = namesSlice.actions;
export default namesSlice.reducer;
