import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation addEvent(
    $name: String!
    $description: String!
    $position: String!
    $startAt: Date!
    $endAt: Date!
    $profilePic:Upload!
  ) {
    addEvent(
      name: $name
      description: $description
      position: $position
      startAt: $startAt
      endAt: $endAt
      profilePic: $profilePic
    ) {
      event {
        name,
        profilePic
      }
    }
  }
`;
