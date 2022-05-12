import React from 'react'
import styles from './Login.module.css'


const Login = ({children}) => {
  return (
    <div className={styles.Login}>
      {
        children
      }
    </div>
  )
}

export default Login