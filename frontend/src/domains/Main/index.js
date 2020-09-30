import React from "react"
import {ME} from "../../services/api/registration/index"
import {useQuery } from '@apollo/client';
import Home from "../home/index"
import Dashboard from "../dashboard/index"
export default function Main(){
    const { data,error,loading }  = useQuery(ME)
    console.log(data)
    console.log(error)
    console.log(loading)
    
    const me = data ? data.me : null
    if(loading) return <div>loading</div>
    return (<>{me ? <Dashboard /> : <Home />}</>)
    
}