import { schema } from 'normalizr';

const detailsSchema = new schema.Entity(
  'details', 
  {
    idAttribute: 'id',
  },
);

const productsSchema = new schema.Entity(
  'products',
  {
    detail: detailsSchema,
  },
  {
    idAttribute: 'id',
  },
);


const Schemas = {
  // ILLUST: illustSchema,
  PRODUCTS_ARRAY: [productsSchema], 
};

export default Schemas;