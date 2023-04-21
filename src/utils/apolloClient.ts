import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const token = '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';

export const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
        authorization: `Bearer ${token}`,
    }
})

export const createClient = () => new ApolloClient({ cache: new InMemoryCache() });
