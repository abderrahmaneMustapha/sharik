import { gql } from '@apollo/client';

const CREATE_EVENT = gql`mutation addEvent($name:String!, $eventCreator:ID!, $description:String!
        $position:String!, $startAt:Date!, $endAt:Date!, $profilePic: String! ){
    addEvent(input: {name:$name, eventCreator:$eventCreator, description: $description, position: $position,
       startAt : $startAt , endAt:$endAt,profilePic: $profilePic })
   }`
