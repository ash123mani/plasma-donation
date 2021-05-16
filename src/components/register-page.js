import React from 'react'

import { Input } from 'antd'
import { Button } from 'antd'
import { Select } from 'antd'

import 'antd/dist/antd.css'

import firebase from '../firebase'
import { uuidv4 } from '../utils/utils'
import list from '../utils/list'
import groups from '../utils/groups'
import Header from './header'

import './register-page.css'

const { Option } = Select

const firestoreDb = firebase.firestore()

class RegisterPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phoneNum: '',
      state: '',
      districts: [],
      email: '',
      dist: '',
      bg: '',
      city: '',
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { state } = this.state
    if (prevState.state !== state && state !== '') {
      const districts = (list.states.filter((item) => item.state === state)[0] || {}).districts
      this.setState({ districts })
    }
  }

  handleInputChange = ({ target: { value, id, name } }) => {
    this.setState({ [id || name]: value })
  }

  handleSubmit = () => {
    const { name, phoneNum, state, email, dist, bg, city } = this.state

    if (!name || !phoneNum || !state || !email || !dist || !bg || !city) {
      alert('All the fields are mandatory')
    }

    const data = {
      name,
      phoneNum,
      state,
      email,
      dist,
      bg,
      city,
    }
    const postId = uuidv4()

    const postsRef = firestoreDb.collection('donors').doc(postId)

    postsRef
      .set({
        ...data,
        createAt: new Date(),
        id: postId,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef)
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  }

  render() {
    const { name, phoneNum, state, email, dist, bg, city, districts } = this.state

    const isDisbaled = !name || !phoneNum || !state || !email || !dist || !bg || !city

    return (
      <div className="container">
        <div className="register-left"></div>
        <div className="register-right">
          <Header hideRegister />
          <div style={{ marginTop: '30px' }}>
            <p className="title">Name</p>
            <div className="input">
              <Input size="large" value={name} onChange={this.handleInputChange} id="name" />
            </div>

            <p className="title">Blood Group</p>
            <div className="input">
              <Select className="state-select" onChange={(value) => this.setState({ bg: value })} size="large" id="bg">
                {groups.groups.map((item) => {
                  return (
                    <Option value={item.code}>
                      {item.code} [{item.display}]
                    </Option>
                  )
                })}
              </Select>
            </div>

            <div className="address">
              <div className="flex1">
                <p className="title">State</p>
                <div className="input">
                  <Select
                    showSearch
                    className="state-select"
                    onChange={(value) => this.setState({ state: value, dist: '' })}
                    size="large"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {list.states.map((item) => {
                      return <Option value={item.state}>{item.state}</Option>
                    })}
                  </Select>
                </div>
              </div>

              <div className="flex1">
                <p className="title">District</p>
                <div className="input">
                  <Select
                    showSearch
                    className="state-select"
                    value={dist}
                    onChange={(value) => this.setState({ dist: value })}
                    size="large"
                    disabled={!state}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {districts.map((item) => {
                      return <Option value={item}>{item}</Option>
                    })}
                  </Select>
                  {!state && <div className="state-first">Select a state first.</div>}
                </div>
              </div>

              <div className="flex1">
                <p className="title">City</p>
                <div className="input">
                  <Input size="large" onChange={this.handleInputChange} id="city" />
                </div>
              </div>
            </div>

            <p className="title">Number</p>
            <div className="input">
              <Input
                size="large"
                onChange={this.handleInputChange}
                value={phoneNum}
                id="phoneNum"
                type="tel"
                maxLength={10}
                pattern="[0-9]{10}"
              />
            </div>

            <p className="title">Email</p>
            <div className="input">
              <Input size="large" onChange={this.handleInputChange} value={email} id="email" type="email" />
            </div>
          </div>

          <div className="submit-button mv10">
            <Button type="primary" size="large" onClick={this.handleSubmit} disabled={isDisbaled}>
              Register
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPage
