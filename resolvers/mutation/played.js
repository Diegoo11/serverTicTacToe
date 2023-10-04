import { GraphQLError } from 'graphql';
import Table from '../../db/models/Table.js';

const played = async (root, args) => {
  const { play, ico } = args;
  const id = '';
  let table;
  try {
    table = await Table.findById(id);
  } catch (err) {
    throw new GraphQLError(`Error database ${err}`);
  }
  table[`p_${play}`] = ico;
  try {
    await table.save();
  } catch (err) {
    throw new GraphQLError(err.message);
  }

  return table;
};

export default played;
