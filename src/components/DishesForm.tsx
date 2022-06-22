import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dish } from 'lib/types';
import { useDispatch } from 'react-redux';
import { setDishes } from 'lib/dishesSlice';
import { useAppSelector } from 'lib/hooks';
type Inputs = Dish;

const DishesForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dispatch = useDispatch();
  const [dishType, setDishType] = useState('pizza');
  const [error, setError] = useState('');

  const sendDish = async (values: Inputs) => {
    const { name, preparation_time, type } = values;
    const diameter = Number(values.diameter);
    const no_of_slices = Number(values.no_of_slices);
    const spiciness_scale = Number(values.spiciness_scale);
    const slices_of_bread = Number(values.slices_of_bread);

    let requestBody: Dish = {
      name,
      preparation_time,
      type,
    };

    switch (type) {
      case 'pizza':
        requestBody.no_of_slices = no_of_slices;
        requestBody.diameter = diameter;
        break;
      case 'soup':
        requestBody.spiciness_scale = spiciness_scale;
        break;
      case 'sandwich':
        requestBody.slices_of_bread = slices_of_bread;
        break;
      default:
        break;
    }

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
    const [hour, minute, second] = result.split(':');
    if (result.split(':').length !== 3)
      return setError('Please use a hh:mm:ss format');

    if ([hour, minute, second].some((number) => number.length !== 2))
      return setError('Please use a hh:mm:ss format');
    setError('');
  };

  const dishes = useAppSelector((state) => state.dishes.value);

  return (
    <div className="flex flex-col gap-4">
      <p className="w-4">{error}</p>
      <form onSubmit={handleSubmit(sendDish)}>
        <input type="text" {...register('name')} required />
        <input
          type="text"
          {...register('preparation_time')}
          required
          placeholder="00:00:00"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            validateTimeInput(e)
          }
        />
        <select
          {...register('type')}
          required
          onChange={(e) => setDishType(e.target.value)}
        >
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
        {dishType === 'pizza' && (
          <div>
            <input type="number" {...register('no_of_slices')} required />
            <input
              type="number"
              {...register('diameter')}
              required
              step="0.01"
            />
          </div>
        )}
        {dishType === 'soup' && (
          <div>
            <input type="number" {...register('spiciness_scale')} required />
          </div>
        )}
        {dishType === 'sandwich' && (
          <div>
            <input type="number" {...register('slices_of_bread')} required />
          </div>
        )}
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default DishesForm;
