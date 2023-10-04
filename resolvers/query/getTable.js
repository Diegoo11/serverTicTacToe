import { GraphQLError } from 'graphql';
import Table from '../../db/models/Table.js';

const getTable = async () => {
  const id = '651dcafb0f57c99a604cc15c';
  let table;

  try {
    table = await Table.findById(id);
  } catch (err) {
    throw new GraphQLError(err.message);
  }
  table.table_id = table._id;

  return table;
};

export default getTable;
