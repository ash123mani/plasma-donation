import React from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons'

import './header.css'

function Header(props) {
  const { hideRegister, hideHome, hideSearch } = props
  return (
    <div className="flex-row header">
      {!hideHome && (
        <div className="register-button">
          <Link to="/">
            <HomeOutlined style={{ fontSize: '18px', color: 'white', marginRight: '4px' }} />
            Home
          </Link>
        </div>
      )}

      {!hideSearch && (
        <div className="register-button search-donor">
          <Link to="/search">
            <SearchOutlined style={{ fontSize: '18px', color: 'white', marginRight: '4px' }} />
            Search for a donor
          </Link>
        </div>
      )}

      {!hideRegister && (
        <div className="register-button search-donor">
          <Link to="/register">
            <LoginOutlined style={{ fontSize: '18px', color: 'white', marginRight: '4px' }} />
            Register as a donor
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
