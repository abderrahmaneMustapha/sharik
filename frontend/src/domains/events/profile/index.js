import React from "react"
import {useRouteMatch} from "react-router-dom"
import {EVENT_BY_SLUG } from "../../../services/api/events/index"
import {useQuery} from "@apollo/client"
import {Heading, Button, Box} from "grommet"
export default function EventProfile(){
    let match = useRouteMatch()
    const {data, loading}  = useQuery(EVENT_BY_SLUG, {
        variables : {slug : match.params.slug}
    })
 
    if (loading && !data) return <div>Loading ... </div>
    const event  = data.getEventBySlug
    return(
        <Box>
            <Heading>{event.name}</Heading>
            <Button label="join event"></Button>
        </Box>
    )
} 