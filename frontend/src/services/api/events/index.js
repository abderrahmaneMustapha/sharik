import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
    mutation addEvent(
        $name: String!
        $description: String!
        $position: String!
        $tags: [String!]
        $startAt: Date!
        $endAt: Date!
        $profilePic: Upload!
    ) {
        addEvent(
            name: $name
            description: $description
            position: $position
            tags: $tags
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

export const GET_EVENT_PICTURES_BY_ID_ON_END = gql`
    query getEventPicturesByIdOnEnd($id: ID!) {
        getEventPicturesByIdOnEnd(id: $id) {
            id
            pictures
        }
    }
`;

export const GET_EVENT_PICTURES_BY_ID_ON_CREATION = gql`
    query getEventPicturesByIdOnCreation($id: ID!) {
        getEventPicturesByIdOnCreation(id: $id) {
            id
            pictures
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

export const ADD_EVENT_PITURES_ON_END = gql`
    mutation addEventPicturesOnEnd($event: ID!, $photos: Upload!) {
        addEventPicturesOnEnd(event: $event, photos: $photos) {
            success
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

export const GET_USER_NOTIFICATIONS_UNREAD = gql`
    query {
        getUserNotificationsUnread {
            recipient {
                id
                email
            }
            verb
            description
        }
    }
`;

export const GET_CURRENT_USER_RECENT_EVENTS = gql`
    query {
        getRecentUserEvents {
            name
            slug
        }
    }
`;

export const LIKE_EVENT = gql`
    mutation eventLike($id: ID!) {
        eventLike(id: $id) {
            success
            eventLikeNumbers
        }
    }
`;
export const GET_EVENT_LIKES_NUMBERS = gql`
    query getEventsLikesNumbers($id: ID!) {
        getEventsLikesNumbers(id: $id)
    }
`;

export const FAV_EVENT = gql`
    mutation eventFavorite($id: ID!) {
        eventFavorite(id: $id) {
            success
            eventFavNumbers
        }
    }
`;
export const GET_EVENT_FAVS_NUMBERS = gql`
    query getEventsFavsNumbers($id: ID!) {
        getEventsFavsNumbers(id: $id)
    }
`;

export const WAS_THERE_EVENT = gql`
    mutation eventWasThere($id: ID!) {
        eventWasThere(id: $id) {
            success
            eventWasThereNumbers
        }
    }
`;

export const GET_EVENT_WAS_THERES_NUMBERS = gql`
    query getEventsWasThereNumbers($id: ID!) {
        getEventsWasThereNumbers(id: $id)
    }
`;

export const HATE_EVENT = gql`
    mutation eventHate($id: ID!) {
        eventHate(id: $id) {
            success
        }
    }
`;

export const EVENT_END_CONFIRM = gql`
    mutation eventEndConfirmation($event: ID!, $text: String!) {
        eventEndConfirmation(input: { event: $event, text: $text }) {
            errors {
                field
                messages
            }
            eventEndConfirmation {
                event {
                    id
                }
            }
        }
    }
`;
