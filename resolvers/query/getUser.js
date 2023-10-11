const getUser = (root, args, context) => {
  const { currentUser } = context;
  return currentUser;
};

export default getUser;
