import React from "react"
import  SigninForm from "../../components/forms/LoginForm/index"
import  SignupForm from "../../components/forms/SignupForm/index"
import { UserNew, UserAdmin } from 'grommet-icons';
import {
   Tabs,
   Tab, 
  } from 'grommet';
import {RichTabTitle} from "../../components/tabs/index"

function Home(){
    return(
      <>
        <Tabs>
            <Tab
                title={
                <RichTabTitle
                    icon={<UserAdmin color="accent-2" />}
                    label="Login"
                />
                }
            >   
            <SigninForm   />
            </Tab>


            <Tab
                title={
                <RichTabTitle
                    icon={<UserNew color="accent-2" />}
                    label="New user"
                />
                }
            >   
            <SignupForm   />
            </Tab>
      </Tabs>
      </>
    )
}

export default Home