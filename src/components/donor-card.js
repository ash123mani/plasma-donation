import React from 'react'

import {
  UserOutlined,
  HomeFilled,
  GlobalOutlined,
  CarFilled,
  PhoneFilled,
  MailOutlined,
  EyeFilled,
  SmileFilled,
} from '@ant-design/icons'

import './donor-card.css'

function DonorCard(props) {
  const { donor } = props
  const { name, phoneNum, bg, city, dist, state, email } = donor

  return (
    <div className="card">
      <div className="card-section flex-row">
        <SmileFilled style={{ fontSize: '18px', color: 'gray' }} />
        <div className="card-text">{name}</div>
      </div>

      <div className="card-section flex-row">
        <EyeFilled style={{ fontSize: '18px', color: 'red' }} />
        <div className="card-text">{bg}</div>
      </div>

      <div className="card-section flex-row">
        <GlobalOutlined style={{ fontSize: '18px', color: 'green' }} />
        <div className="card-text">{state}</div>
      </div>

      <div className="card-section flex-row">
        <CarFilled style={{ fontSize: '18px', color: '#1d1e1f8c' }} />
        <div className="card-text">{dist}</div>
      </div>

      <div className="card-section flex-row">
        <HomeFilled style={{ fontSize: '18px', color: 'orange' }} />
        <div className="card-text">{city}</div>
      </div>

      <div className="card-section flex-row">
        <PhoneFilled style={{ fontSize: '18px', color: 'black' }} />
        <div className="card-text">{phoneNum}</div>
      </div>

      <div className="card-section flex-row">
        <MailOutlined style={{ fontSize: '18px', color: '#ea4435' }} />
        <div className="card-text">{email}</div>
      </div>
    </div>
  )
}

export default DonorCard
