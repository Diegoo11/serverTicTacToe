import connectDB from '../../db/db.js';

const resetTable = async (root, args) => {
  await connectDB({
    query: `UPDATE tables SET p_0 = 0,
      p_1 = 0,
      p_2 = 0,
      p_3 = 0,
      p_4 = 0,
      p_5 = 0,
      p_6 = 0,
      p_7 = 0,
      p_8 = 0
      WHERE table_id = 1
    `,
  });
  const [table] = await connectDB({ query: 'SELECT * FROM tables WHERE table_id = 1' });
  return table;
};

export default resetTable;
