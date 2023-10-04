import { GraphQLError } from 'graphql';
import Table from '../../db/models/Table.js';

const getTable = async () => {
  const id = '';
  let table;

  try {
    table = await Table.findById(id);
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  return table;
};

export default getTable;
