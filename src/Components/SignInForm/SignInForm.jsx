import React from 'react'
import styles from '../Login/LoginForm/LoginForm.module.css';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, InputAdornment, IconButton, TextField, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useValidator from '../../Hooks/useValidator';
import { useState } from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useConfetti from '../../Hooks/useConfetti';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            height: '55px',
            borderColor: '#F1F1F1',
        },
    },
    '& label': {
        color: '#A0A0A0',
        fontSize: '14px',
        fontWeight: '500'
    }
});

const PasswordOutlinedInput = styled(OutlinedInput)({
    '& .MuiOutlinedInput-notchedOutline': {
        height: '55px',
        borderColor: '#F1F1F1',
    },

});

const PasswordLabel = styled(InputLabel)({
    color: '#A0A0A0',
    fontSize: '14px',
    fontWeight: '500'
})

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const SignInForm = () => {
    
    const {user, authenticateUser} = useContext(AuthContext);

    const [open, setOpen] = React.useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        console.log(formData);
        setFormData({ ...formData, [event.target.name]: event.target.value })
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const [enableSubmit, setEnableSubmit] = useState(false);

    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        let check = true;

        for (let data in formData) {

            if (formData[data] === null || formData[data] === '') {
                check = false;
                break;
            }

        }

        check ? setEnableSubmit(true) : setEnableSubmit(false);
    }, [formData])

    const validator = useValidator();

    const [errors, setErrors] = useState({
        email: { errorState: false, messages: [] },
        password: { errorState: false, messages: [] }
    })

    const confettiEffect = useConfetti()
    const [auth, setAuth ] = useState(true);

    const handleErrorsOnSubmit = (validations) => {

        if (validations.email === undefined && validations.password === undefined) {

            if(!authenticateUser(formData.email, formData.password)){
                setAuth(false);
            }
            else{
                handleOpenModal();
                confettiEffect();
            }
        }
        else {

            let errObj = {};

            if (validations.email) {
                errObj = { ...errors, ...errObj, email: { errorState: true, messages: [...validations.email] } }
            }

            if (validations.password) {
                errObj = { ...errors, ...errObj, password: { errorState: true, messages: [...validations.password] } }
            }

            console.log(errObj);
            setErrors(errObj);
        }
    }

    return (

        <div className={styles.LoginForm}>
            <form>

                {
                    errors.email.errorState ?
                        <CssTextField error name="email" sx={{ width: '100%' }} size='normal' label="Email Address" id="fullWidth" onClick={() => setErrors({ ...errors, email: { errorState: false, messages: [] } })} onChange={handleFormData} helperText={
                            errors.email.messages.map((msg) => <p style={{ color: '#D32F2F' }}>{msg}</p>)
                        } />
                        :
                        <CssTextField name="email" sx={{ width: '100%' }} size='normal' label="Email Address" id="fullWidth" onChange={handleFormData} />

                }

                {
                    errors.password.errorState ?
                        <FormControl error onClick={() => setErrors({ ...errors, password: { errorState: false, messages: [] } })} sx={{ width: '100%' }} variant="outlined" size={'normal'}>
                            <PasswordLabel htmlFor="outlined-adornment-password">Password</PasswordLabel>
                            <PasswordOutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                name={'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff sx={{ fontSize: 'medium' }} /> : <Visibility sx={{ fontSize: 'medium' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {
                                errors.password.messages.map((msg) => <FormHelperText sx={{ marginTop: '10px', color: '#D32F2F', fontWeight: 'bold' }}>{msg}</FormHelperText>)
                            }
                        </FormControl> :

                        <FormControl sx={{ width: '100%' }} variant="outlined" size={'normal'}>
                            <PasswordLabel htmlFor="outlined-adornment-password">Password</PasswordLabel>
                            <PasswordOutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                name={'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff sx={{ fontSize: 'medium' }} /> : <Visibility sx={{ fontSize: 'medium' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText sx={{ mt: 1, ml: 0 }}><a style={{ textDecoration: 'none', color: '#5594EA', fontWeight: 'bold' }} href="test.com">Forgot Password?</a></FormHelperText>
                        </FormControl>
                }
                {
                    !auth && <FormHelperText sx={{ marginTop: '10px', color: '#D32F2F', fontWeight: 'bold', fontSize: '14px' }}>Please enter valid credentials and try again...</FormHelperText>
                }
                {
                    enableSubmit ?
                        <Button sx={{ mt: '10px', textTransform: 'none', height: '50px', fontSize: "13px", fontWeight: 'bold' }} size={'large'} variant="contained" onClick={() => handleErrorsOnSubmit(validator(formData))}>
                            Next
                        </Button> :
                        <Button sx={{ mt: '10px', textTransform: 'none', height: '50px', fontSize: "13px", fontWeight: 'bold' }} size={'large'} variant="contained" disabled>
                            Next
                        </Button>
                }
            </form>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ textAlign: 'center' }} id="modal-modal-title" variant="h4" component="h2">
                        Welcome {user.name}!
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default SignInForm

