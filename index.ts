import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { resolvers, typeDefs } from './graphql';

async function startServer() {
    dotenv.config();
    const DATABSE_URL = process.env['DATABASE_URL'];
    if (!DATABSE_URL) throw "DATABASE_URL must be present in environment variables";

    await mongoose.connect(DATABSE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log('Connected to the mongodb database');

    const server = new ApolloServer({ resolvers, typeDefs });
    const serverInfo = await server.listen({port: 4000});
    console.log(`Server started on ${serverInfo.url}`)
}

startServer().then().catch(console.log);