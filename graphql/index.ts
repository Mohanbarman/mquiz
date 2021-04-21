import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';

import addResult from './resolvers/addResult';
import createUser from './resolvers/createUser';

import getResults from './resolvers/getResults';
import getUsers from './resolvers/getUsers';
import getQuestions from './resolvers/getQuestions'
import getCategories from './resolvers/getCategories';


const typeDefsArray = loadFilesSync(path.join(__dirname, 'types'), { extensions: ['graphql'] });
export const typeDefs = mergeTypeDefs(typeDefsArray);

export const resolvers = {
    Query: { getResults, getUsers, getQuestions, getCategories },
    Mutation: { addResult, createUser },

    // enum resolvers map
    AllowedQuestionType: {
        BOOLEAN: 'boolean',
        MULTIPLE: 'multiple',
    },
    AllowedDifficulty: {
        HARD: 'hard',
        EASY: 'easy',
        MEDIUM: 'medium',
    }
}