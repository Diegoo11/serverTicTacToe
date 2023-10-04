import connectDB from '../../db/db.js';

const played = async (root, args) => {
  const { play, ico } = args;
  await connectDB({ query: `UPDATE tables SET p_${play} = ${ico} WHERE table_id = 1` });
  const [table] = await connectDB({ query: 'SELECT * FROM tables WHERE table_id = 1' });
  return table;
};

export default played;
