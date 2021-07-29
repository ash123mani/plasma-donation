import React from 'react'

import NavBar from '../nav-bar'
import Explore from '../explore'

class PNKHome extends React.Component {
  render() {
    return(
      <div className="home">
        <NavBar />
        <Explore />
      </div>
    )
  }
}

export default PNKHome