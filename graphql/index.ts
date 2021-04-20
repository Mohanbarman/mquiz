import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';

import addResult from './resolvers/addResult';
import getResults from './resolvers/getResults';
import getUsers from './resolvers/getUsers';
import createUser from './resolvers/createUser';

const typeDefsArray = loadFilesSync(path.join(__dirname, 'types'), { extensions: ['graphql'] });
export const typeDefs = mergeTypeDefs(typeDefsArray);

export const resolvers = {
    Query: { getResults, getUsers },
    Mutation: { addResult, createUser },
}