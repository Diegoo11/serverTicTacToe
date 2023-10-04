import connectDB from '../../db/db.js';

const getTable = async () => {
  const [table] = await connectDB({ query: 'SELECT * FROM tables WHERE table_id = 1' });
  return table;
};

export default getTable;
