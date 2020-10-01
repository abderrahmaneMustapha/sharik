import React from "react"

import {ME} from "../../../services/api/registration/index"

import {useQuery} from "@apollo/client"

import {Box, Avatar} from "grommet"

export default function Profile(){
    const {data, loading , error} = useQuery(ME)
    console.log(error)
    if(loading) return <div>loading</div>
    if(!data.me) return <div>Not Logged in</div>

    return(
        <>
            <Box direction="row"  gap="small">
                <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" /> 
            </Box> 
        </>
    )
}