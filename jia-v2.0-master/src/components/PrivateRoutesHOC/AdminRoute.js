import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { type, user, getCurrentUser, getUserType } from '../AuthenticationService'

const AdminRoute = ({ component: Component, ...rest }) => {  
  const [isLoading, setIsLoading] = React.useState(true)

  const getData = async() => {
    if(!type) await getUserType()
    if(!user) await getCurrentUser()
    setIsLoading(false)
  }

  React.useEffect(() => {
    getData()
  },[])

  return (
    <>
     {isLoading
      ? <></>
      : 
      <Route
        {...rest}
        render={props =>
          user && type === 'admin' ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/intro', state: { from: props.location } }} />
          )
        }
      />
     }
    </>
  )
}

export default AdminRoute