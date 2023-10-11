const Query = `
  type Query {
    getBooks: [Book],
    getTable(
      gameId: String!
    ): Table
    getUser: User
    getEnemy(
      gameId: String!
    ): User
  }
`;

export default Query;
