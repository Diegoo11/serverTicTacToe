const Query = `
  type Query {
    getTable(
      gameId: String!
    ): Table

    getUser: User

    getEnemy(
      gameId: String!
    ): User

    getTurn(
      gameId: String!
    ): Uid
  }
`;

export default Query;
