import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation addEvent(
    $name: String!
    $eventCreator: ID!
    $description: String!
    $position: String!
    $startAt: Date!
    $endAt: Date!
    $profilePic:Upload!
  ) {
    addEvent(
      input: {
        name: $name
        eventCreator: $eventCreator
        description: $description
        position: $position
        startAt: $startAt
        endAt: $endAt
        profilePic: $profilePic
      }
    ) {
      event {
        name
      }
      errors{field,messages}
    }
  }
`;
