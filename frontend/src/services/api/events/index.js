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
        id
        name
        profilePic
      }
    }
  }
`;

export const ALL_EVENTS = gql`
  query {
    allEvents {
      id
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
`;

export const PAST_ALL_EVENTS = gql`
  query {
    pastAllEvents {
      id
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
`;

export const CURRENT_ALL_EVENTS = gql`
  query {
    currentAllEvents {
      id
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
`;

export const UPCOMING_ALL_EVENTS = gql`
  query {
    upcomingAllEvents {
      id
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
`;
export const EVENT_BY_SLUG = gql`
  query getEventBySlug($slug: String!) {
    getEventBySlug(slug: $slug) {
      id
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
`;

export const EVENT_JOIN_REQUEST = gql`
  mutation addEventUserJoinRequest($id: ID!) {
    addEventUserJoinRequest(id: $id) {
      success
      eventJoinReq {
        event {
          name
        }
      }
    }
  }
`;

export const ADD_EVENT_PICTURES_ON_CREATION = gql`
  mutation addEventPicturesOnCreation($event: ID!, $pictures: Upload!) {
    addEventPicturesOnCreation(event: $event, photos: $pictures) {
      success
      eventPicture {
        id
      }
    }
  }
`;

export const GET_PENDING_EVENT_JOIN_REQUEST = gql`
  query getEventsUserJoinRequestsPending($slug: String!) {
    getEventsUserJoinRequestsPending(slug: $slug) {
      id
      requestFrom {
        id
        lastLogin
        firstName
        lastName
        city
        profilePic
      }
    }
  }
`;

export const ACCEPT_JOIN_REQUEST = gql`
  mutation acceptEventUserJoinRequest($id: ID!) {
    acceptEventUserJoinRequest(id: $id) {
      success
      eventJoinReq {
        id
        accept
      }
    }
  }
`;

export const GET_EVENT_ACCEPTED_JOIN_REQUEST = gql`
  query getEventsUserJoinRequestsAccepted($slug: String!) {
    getEventsUserJoinRequestsAccepted(slug: $slug) {
      id
      requestFrom {
        id
        key
        lastLogin
        firstName
        lastName
        city
        profilePic
      }
    }
  }
`;
