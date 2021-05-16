import React, { Component } from 'react'

import { Alert } from 'antd'

import 'antd/dist/antd.css'

import Header from './header'
import middle from '../assets/middle.png'
import bottom from '../assets/bottom.png'

import './homepage.css'

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-left"></div>
        <div className="home-right">
          <div className="header-wrapper">
            <Header hideHome />
          </div>
          <div className="middle">
            <img src={middle} className="middle-image" alt="Corona War Image" />
          </div>

          <Alert
            message="Informational Notes"
            description="Currently we are running short of donors, requesting more volunters to join the cause."
            type="success"
            showIcon
            // banner
          />
          <div className="bottom">
            <img src={bottom} className="bottom-image" alt="Corona War Image" />
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
