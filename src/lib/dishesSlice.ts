import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../redux/store';
import { Dish } from './types';

interface DishState {
  value: Dish | null;
}
const initialState: DishState = {
  value: null,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState: initialState,
  reducers: {
    setDishes: (state, action: PayloadAction<Dish>) => {
      state.value = action.payload;
    },
  },
});

export const { setDishes } = dishesSlice.actions;

export const Dishes = (state: AppState) => state.dishes.value;

export default dishesSlice.reducer;
