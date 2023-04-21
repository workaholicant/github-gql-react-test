import { gql } from "@apollo/client";

export const searchUsers = gql`
    query ($query: String!, $cursor:String) {
        search(query: $query, type: USER, first: 30, after: $cursor) {
        userCount
        pageInfo {
            hasNextPage
            endCursor
        }
        nodes {
            ... on User {
            databaseId
            name
            login
            bio
            avatarUrl
            }
        }
        }
    }
`

export const searchRepositories = gql`
    query ($query: String!, $cursor:String) {
        search(query: $query, type: REPOSITORY, first: 30, after: $cursor) {
        repositoryCount
        pageInfo {
            hasNextPage
            endCursor
        }
        nodes {
            ... on Repository {
            databaseId
            name
            description
            url
            }
        }
        }
    }
`

