import React from 'react'
import { Typography } from '@mui/material'
import styles from '../Brand/Brand.module.css'

const Brand = () => {
    return (
        <div className={styles.Brand}>
            <Typography sx={{mt: '100px', fontSize: '30px', fontWeight: 'bold'}}variant={'h4'} >Dummy Heading</Typography>
            <Typography sx={{mt: '50px', color: 'white', width: '60%', lineHeight: 1.8}} variant={'body1'}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC piece of class Latin </Typography>
        </div>
    )
}

export default Brand