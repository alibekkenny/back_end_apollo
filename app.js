const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client')
const { resolvers } = require('./resolvers');
const { makeExecutableSchema } = require('graphql-tools')
const ConstraintDirective = require('graphql-constraint-directive')

const prisma = new PrismaClient()

async function main() {
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs: fs.readFileSync(
        path.join(__dirname, '.', '/graphql/schema.graphql'),
        'utf8'
      ),
      resolvers,
    }),
    schemaDirectives: { constraint: ConstraintDirective },
    context: {
      prisma,
    }
  });
  const app = express();
  app.use(cors());
  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

main()
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect()
  })