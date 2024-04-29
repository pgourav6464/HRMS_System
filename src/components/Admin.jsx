import React from 'react'
import LoginFirst from './LoginFirst'

const Admin = ({admin}) => {
  return (
  <>
  {!admin && <LoginFirst/>}
  </>
  )
}

export default Admin