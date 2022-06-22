import { Dish } from './types';

const parseInputs = (values: Dish) => {
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

  return requestBody;
};

export default parseInputs;
