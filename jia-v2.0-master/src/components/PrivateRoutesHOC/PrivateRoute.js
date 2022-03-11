import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { type, user, getCurrentUser, getUserType } from '../AuthenticationService'

const PrivateRoute = ({ component: Component, ...rest }) => {
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
            user && type ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
          }
        />
      }
    </>
  )
}

export default PrivateRoute