const Mutation = `
  type Mutation {
    played(
      play: Int!
      ico: Int!
    ): Table

    resetTable(
      game_id: Int!
    ): Table
  }
`;

export default Mutation;
