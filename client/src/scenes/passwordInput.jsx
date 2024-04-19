import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

const PasswordInput = ({stt,values,handleChange}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
  return (
    <TextField
      label="Password"
      type={showPassword ? "text" : "password"}
      value={values.password}
      sx={stt}
      onChange={handleChange("password")}
      InputProps={{
        endAdornment: (
          <InputAdornment >
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <Visibility />
              ) : (
                <VisibilityOff />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordInput