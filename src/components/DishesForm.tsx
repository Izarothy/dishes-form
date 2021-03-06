import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dish } from 'lib/types';
import { useDispatch } from 'react-redux';
import { setDishes } from 'lib/dishesSlice';
import { useAppSelector } from 'lib/hooks';
import parseInputs from 'lib/parseInputs';
type Inputs = Dish;

const DishesForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dispatch = useDispatch();
  const [dishType, setDishType] = useState('pizza');
  const [error, setError] = useState('');
  const [prepTime, setPrepTime] = useState('00:00:00');

  const sendDish = async (values: Inputs) => {
    const requestBody = parseInputs(values);
    const res = await fetch(
      'https://frosty-wood-6558.getsandbox.com:443/dishes ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    console.log(res);
    if (!res.ok) {
      return setError(
        `There was an error while sending the request (${Object.values(
          await res.json()
        )})`
      );
    }

    const data = await res.json();
    dispatch(setDishes(data));

    reset();
  };

  const validateTimeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const result = (e.target as HTMLInputElement).value;
    setPrepTime(result);

    const [hour, minute, second] = result.split(':');
    if (result.split(':').length < 3) {
      setPrepTime('00:00:00');
      return setError('Please use a hh:mm:ss format');
    }

    if (
      [hour, minute, second].some(
        (number) => !number.length || number.length > 2
      )
    ) {
      setPrepTime('00:00:00');
      return setError('Please use a hh:mm:ss format');
    }
    setError('');
  };

  const dishes = useAppSelector((state) => state.dishes.value);

  return (
    <form
      onSubmit={handleSubmit(sendDish)}
      className="bg-primary-dark rounded-md flex flex-col gap-2 text-center items-center lg:w-1/3 xl:w-1/4 px-4 py-8"
    >
      <h2 className="w-full text-2xl text-white font-semibold">Dish form</h2>
      <p className="h-8 text-red-700">{error}</p>
      <label className="label-dishes">
        <h3 className="label-dishes-title">Dish name</h3>
        <input
          type="text"
          {...register('name')}
          required
          className="input-dishes"
          placeholder="Ex. My Own Pizza"
        />
      </label>
      <label className="label-dishes">
        <h3 className="label-dishes-title">Preparation time</h3>
        <input
          type="text"
          {...register('preparation_time')}
          required
          placeholder="00:00:00"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            validateTimeInput(e)
          }
          className="input-dishes"
          value={prepTime}
        />
      </label>
      <div className="flex justify-start w-[14.8rem]">
        <label className="label-dishes">
          <h3 className="label-dishes-title font-montserrat">Dish type</h3>
          <select
            {...register('type')}
            required
            onChange={(e) => setDishType(e.target.value)}
            className="input-dishes py-2 w-full"
          >
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
        </label>
      </div>
      {dishType === 'pizza' && (
        <div>
          <label className="label-dishes">
            <h3 className="label-dishes-title">Number of slices</h3>
            <input
              type="number"
              {...register('no_of_slices')}
              required
              className="input-dishes"
              placeholder="Ex. 8"
            />
          </label>
          <label className="label-dishes">
            <h3 className="label-dishes-title">Pizza diameter</h3>
            <input
              type="number"
              {...register('diameter')}
              required
              step="0.01"
              className="input-dishes"
              placeholder="Ex. 12.2"
            />
          </label>
        </div>
      )}
      {dishType === 'soup' && (
        <>
          <label className="label-dishes">
            <h3 className="label-dishes-title">Scale of spiciness (1-10)</h3>
            <input
              type="number"
              {...register('spiciness_scale')}
              required
              className="input-dishes"
              min="1"
              max="10"
              placeholder="Ex. 5"
            />
          </label>
        </>
      )}
      {dishType === 'sandwich' && (
        <>
          <label className="label-dishes">
            <h3 className="label-dishes-title">Number of bread slices</h3>
            <input
              type="number"
              {...register('slices_of_bread')}
              required
              className="input-dishes"
              placeholder="Ex. 2"
            />
          </label>
        </>
      )}
      <input
        type="submit"
        value="Send"
        className="py-2 px-10 my-2 cursor-pointer rounded-md bg-blue-500 text-white"
      />
    </form>
  );
};

export default DishesForm;
