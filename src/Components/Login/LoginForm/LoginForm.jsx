import React from 'react'
import styles from './LoginForm.module.css';
import { FormControl, FormHelperText, InputLabel, OutlinedInput, InputAdornment, IconButton, TextField, MenuItem, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useValidator from '../../../Hooks/useValidator';
import { useState } from 'react';
import { useEffect } from 'react';
import useConfetti from '../../../Hooks/useConfetti';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const userTypes = ["Customer", "Employee", "Administrator"];

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
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const LoginForm = () => {
  
  const {user, setUser} = useContext(AuthContext);

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: '',
    password: ''
  });

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
    name: { errorState: false, messages: [] },
    email: { errorState: false, messages: [] },
    userType: { errorState: false, messages: [] },
    password: { errorState: false, messages: [] }
  })

  const confettiEffect = useConfetti()

  const handleErrorsOnSubmit = (validations) => {
    if (validations === undefined) {
      // success

      setUser({...formData});
      handleOpenModal();
      confettiEffect();

    }
    else {
      let errObj = {};

      if (validations.name) {
        errObj = { ...errors, ...errObj, name: { errorState: true, messages: [...validations.name] } }
      }

      if (validations.email) {
        errObj = { ...errors, ...errObj, email: { errorState: true, messages: [...validations.email] } }
      }

      if (validations.userType) {
        errObj = { ...errors, ...errObj, userType: { errorState: true, messages: [...validations.userType] } }
      }
      if (validations.password) {
        errObj = { ...errors, ...errObj, password: { errorState: true, messages: [...validations.password] } }
      }
      setErrors(errObj);
    }
  }
  return (
    <div className={styles.LoginForm}>
      <form>
        {
          errors.name.errorState ?
            <CssTextField error name="name" sx={{ width: '100%' }} size='normal' label="Your Name" onClick={() => setErrors({ ...errors, name: { errorState: false, messages: [] } })} onChange={handleFormData} helperText={
              errors.name.messages.map((msg) => <p style={{ color: '#D32F2F' }}>{msg}</p>)
            } /> :
            <CssTextField name="name" sx={{ width: '100%' }} size='normal' label="Your Name" onChange={handleFormData} />
        }

        {
          errors.email.errorState ?
            <CssTextField error name="email" sx={{ width: '100%' }} size='normal' label="Email Address" id="fullWidth" onClick={() => setErrors({ ...errors, email: { errorState: false, messages: [] } })} onChange={handleFormData} helperText={
              errors.email.messages.map((msg) => <p style={{ color: '#D32F2F' }}>{msg}</p>)
            } />
            :
            <CssTextField name="email" sx={{ width: '100%' }} size='normal' label="Email Address" id="fullWidth" onChange={handleFormData} />

        }

        {
          errors.userType.errorState ?
            <CssTextField error name="userType" value={formData.userType} select sx={{ width: '100%' }} size='normal' label="I would describe my user role as" id="fullWidth" onClick={() => setErrors({ ...errors, userType: { errorState: false, messages: [] } })} onChange={handleFormData} helperText={
              errors.userType.messages.map((msg) => <p style={{ color: '#D32F2F' }}>{msg}</p>)
            }>
              {
                userTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))
              }
            </CssTextField> :
            <CssTextField name="userType" value={formData.userType} select sx={{ width: '100%' }} size='normal' label="I would describe my user role as" id="fullWidth" onChange={handleFormData}>
              {
                userTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))
              }
            </CssTextField>

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
              <FormHelperText sx={{ mt: 1, ml: 0 }}>Minimum 8 characters</FormHelperText>
            </FormControl>
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
        <Typography sx={{ mt: 3, fontSize: '13px' }} variant='subtitle2'>By clicking on the "Next" button, you agree to creating a free account, and to <span className={styles.Highlighted}>Terms of Service</span> and <span className={styles.Highlighted}>Privacy Policy</span></Typography>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: 'center' }} id="modal-modal-title" variant="h5" component="h2">
            Account Created!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We are excited to have you onboard! Let's get started...
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default LoginForm