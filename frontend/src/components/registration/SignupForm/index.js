import React from "react"
import {CREATE_USER} from "../../../services/api/registration/index"
import {useMutation } from '@apollo/client';
import {SignupSchema} from "./schema/index"
import {
    Button,
    Form,
    FormField as Field,

  } from 'grommet';
import { useFormik  } from 'formik'


import {useHistory} from "react-router-dom"


export default function SignupForm(){
    let history = useHistory()
    const [createUser, { data,error,loading }  ] = useMutation(CREATE_USER)

    const formik  =useFormik({
 
         initialValues: {
                     firstName: "",
                     lastName: "",
                     email : "",
                     password1 : "",
                     password2 : "",
         },
         validationSchema: SignupSchema,
         onSubmit :  async values => { await new Promise( 
 
        createUser(
                     { variables: {
                         first_name: values.firstName,
                         last_name: values.lastName,
                         email : values.email,
                         password1 : values.password1,
                         password2 : values.password2,
                     }}
                 ).then(data=>{
                     if(data.data.register.success){
                         localStorage.setItem("jwt", data.data.register.token)
                         localStorage.setItem("jwt_refresh", data.data.register.refreshToken)
                         history.push(`/profile/me`)
                     }
                     
                 }))
                 
             }})

             let errors = data ? data.register.errors : undefined

             if(error) return console.log(error)
             if(loading) return <div>Loading</div>

             return(
                
                <>               
                    <div>
                    {errors ?
                        Object.keys(errors).map(
                            element=>(
                                errors[element].map(
                                    sub=>(
                                        <div>{sub.message}</div>
                                    )
                                )
                            )
                        )
                        : undefined
                    }
                    </div>
                    
                    <Form  onSubmit={formik.handleSubmit}>
    
                        <label htmlFor="firstName">First Name</label>
                        <Field id="firstName" name="firstName" placeholder="Jane"  onChange={formik.handleChange} />
                        {formik.errors.firstName && formik.touched.firstName ?
                        (<div>{formik.errors.firstName}</div>) : null}
    
                        <label htmlFor="lastName">Last Name</label>
                        <Field id="lastName" name="lastName" placeholder="Doe"  onChange={formik.handleChange} />
                        {formik.errors.lastName && formik.touched.lastName ?
                        (<div>{formik.errors.lastName}</div>) : null}
    
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
    
                        <label htmlFor="password1">Password</label>
                        <Field
                        id="password1"
                        name="password1"
                        placeholder="password"
                        type="password"
                        onChange={formik.handleChange}
                        />
                        {formik.errors.password1 && formik.touched.password1 ?
                        (<div>{formik.errors.password1}</div>) : null}
    
                        <label htmlFor="password2">Password Confirmation</label>
                        <Field
                        id="password2"
                        name="password2"
                        placeholder="password confirmation"
                        type="password"
                        onChange={formik.handleChange}
                        />
                        {formik.errors.password2 && formik.touched.password2 ?
                        (<div>{formik.errors.password2}</div>) : null}
    
                        <Button 
                            primary 
                            label="Submit" 
                            type="submit"
                            color="dark-1" 
                            >                        
                        </Button>
                        
                    </Form>
                       
                
                </>
             )
}