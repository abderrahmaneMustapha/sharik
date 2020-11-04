import { gql } from "@apollo/client";

export const ALL_TAGS = gql`
    query {
        allTags {
            name
            id
        }
    }
`;

export const ADD_TAGS_TO_USER = gql`
    mutation addTagsToUser($tags: [String!]) {
        addTagsToUser(tags: $tags) {
            success,
            tag{name}
        }
    }
`;
