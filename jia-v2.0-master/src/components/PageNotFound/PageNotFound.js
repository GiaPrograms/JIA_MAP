import React from "react";
import {Link} from "react-router-dom";

import './PageNotFound.css'

const NotFoundPage = () => {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <h1>PAGE NOT FOUND</h1>
      <p>
        <Link to="/intro">Home</Link>
      </p>
    </div>
  )
}

export default NotFoundPage
