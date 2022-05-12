import React from 'react'
import styles from './LoginHeader.module.css'
import { Typography } from '@mui/material'
const LoginHeader = ({heading, subtitle, action, setToggleForms}) => {
  return (
    <div className={styles.LoginHeader}>
        <Typography sx={{fontWeight: 'bolder', fontSize: '32px'}}variant={'h4'}>{ heading }</Typography>
        <p>{ subtitle }<button onClick={
          () => {
            action === 'Sign In' ? setToggleForms(false) : setToggleForms(true)
          }
        }>{action}</button></p>
    </div>
  )
}

export default LoginHeader