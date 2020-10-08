import React from "react"
import {useRouteMatch} from "react-router-dom"
import {EVENT_BY_SLUG,  EVENT_JOIN_REQUEST } from "../../../services/api/events/index"
import {useMutation, useQuery} from "@apollo/client"
import {Heading, Button, Box} from "grommet"
export default function EventProfile(){
    let match = useRouteMatch()
    const {data, loading}  = useQuery(EVENT_BY_SLUG, {
        variables : {slug : match.params.slug}
    })
    const [joinEvent] = useMutation( EVENT_JOIN_REQUEST)
    
    const handleEventJoinReq = ()=>{
        console.log(joinEvent({
            variables : {
                id : data.getEventBySlug.id
            }
        }))
    }
    if (loading && !data) return <div>Loading ... </div>
    const event  = data.getEventBySlug
    return(
        <Box>
            <Heading>{event.name}</Heading>
            <Button label="join event" onClick={handleEventJoinReq}></Button>
        </Box>
    )
} 