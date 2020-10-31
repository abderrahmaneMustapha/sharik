import { gql } from "@apollo/client";

export const ALL_TAGS = gql`
    query {
        allTags {
            name
            id
        }
    }
`;
