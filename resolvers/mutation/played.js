import { GraphQLError } from 'graphql';
import Table from '../../db/models/Table.js';

const played = async (root, args) => {
  const { play, ico } = args;
  const id = '651dcafb0f57c99a604cc15c';
  let table;
  try {
    table = await Table.findById(id);
    if (table[`p_${play}`] !== 0) throw new Error('Played not valid');
  } catch (err) {
    throw new GraphQLError(`Error database ${err}`);
  }
  table[`p_${play}`] = ico;
  try {
    await table.save();
  } catch (err) {
    throw new GraphQLError(err.message);
  }
  table.table_id = table._id;
  return table;
};

export default played;
