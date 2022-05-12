import React from 'react';
import styles from './Container.module.css';
import Login from '../Login/Login';
import Brand from '../Brand/Brand';
import LoginHeader from '../Login/LoginHeader/LoginHeader';
import LoginForm from '../Login/LoginForm/LoginForm';
import SignInForm from '../SignInForm/SignInForm';

const Container = () => {
  const [toggleForms, setToggleForms] = React.useState(true);
  return (
    <div className={styles.Container}>
      {
        toggleForms ?
          <Login>
            <LoginHeader heading={"Let's Setup your account"} subtitle={"Already have an account?"} action={"Sign In"} setToggleForms={setToggleForms} />
            <LoginForm />
          </Login> :
          <Login>
            <LoginHeader heading={"Login to your account"} subtitle={"Don't have an account?"} action={"Sign Up"} setToggleForms={setToggleForms} />
            <SignInForm />
          </Login>
      }
      <Brand />


    </div>
  )
}

export default Container