import React from "react"
import {useMutation } from '@apollo/client';

import {
    Button,
    Form,
    FormField as Field,
  } from 'grommet';
import { useFormik  } from 'formik'

// me
import {LOGIN_USER} from "../../../services/api/registration/index"
import {SigninSchema} from "./schema/index"

import {useHistory} from "react-router-dom"


// lets use this link later when we want handle errors
//import { onError } from 'apollo-link-error';

function SigninForm (){
    let history = useHistory()
    const [loginUser, { data,loading }  ] = useMutation(LOGIN_USER)
   
    
    const formik = useFormik({
        initialValues : {
            email : "",
            password : "",
        },
        validationSchema : SigninSchema,
        onSubmit :  async values => { await new Promise( 
            loginUser(
                    { variables: {
                        email : values.email,
                        password : values.password
                    }}
                ).then(data=>{
                    if(data.data.tokenAuth.success){
                        localStorage.setItem("jwt", data.data.tokenAuth.token)
                        localStorage.setItem("jwt_refresh", data.data.tokenAuth.refreshToken)
                        history.push(`/profile/me`)
                    }
                    
                })
            )
        }
    })
     
    if (loading) return (<p>{loading}</p>)
      

        const errors = data ? data.tokenAuth.errors : null
        return(
            <>
             
                 
                <div>
                    {
                        errors ? errors.nonFieldErrors.map(
                            element=>(
                                <div>{element.message}</div>
                            )
                        ):undefined
                    }
                </div>

                
                <Form  >
                    <label htmlFor="email">Email</label>
                    <Field
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    type="email"
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email && formik.touched.email ?
                    (<div>{formik.errors.email}</div>) : null}

                    <label htmlFor="password">Password</label>
                    <Field
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={formik.handleChange}
                   
                    />
                    {formik.errors.password && formik.touched.password ?
                    (<div>{formik.errors.password}</div>) : null}
                
                    <Button 
                        primary  
                        color="dark-1" 
                        label="Submit"
                        onClick={formik.handleSubmit} 
                        type="submit">                        
                    </Button>
                    
                </Form>
                    
            </>
        )

    
    
}

export default SigninForm