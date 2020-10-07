import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
  mutation addEvent(
    $name: String!
    $description: String!
    $position: String!
    $startAt: Date!
    $endAt: Date!
    $profilePic: Upload!
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
        name
        profilePic
      }
    }
  }
`

export const ALL_EVENTS = gql`
  query {
    allEvents {
      name
      slug
      eventCreator {
        firstName
        lastName
      }
      description
      position
      startAt
      endAt
      profilePic
    }
  }
`

export const EVENT_BY_SLUG = gql`
  query getEventBySlug($slug: String!) {
    getEventBySlug(slug: $slug) {
      name
      slug
      eventCreator {
        email
      }
      description
      position
      endAt
      startAt
      status
      profilePic
    }
  }
`
