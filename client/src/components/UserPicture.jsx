import { Avatar } from '@mui/material'
import React from 'react'

const UserPicture = ({ name, picturePath, sx }) => {
  return (
    <Avatar sx={sx} alt={name} src={process.env.REACT_APP_BASE_URL + "/assets/" + picturePath} />
  )
}

export default UserPicture
