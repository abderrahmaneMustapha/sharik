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
                    label="Personal Data"
                />
                }
            >   
            <SigninForm   />
            </Tab>


            <Tab
                title={
                <RichTabTitle
                    icon={<UserNew color="accent-2" />}
                    label="Personal Data"
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