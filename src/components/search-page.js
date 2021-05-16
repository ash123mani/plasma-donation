import React from 'react'
import { Select } from 'antd'
import { Button } from 'antd'
import { Spin } from 'antd'
import { Empty } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons'

import './search-page.css'
import list from '../utils/list'
import firebase from '../firebase'

import Header from './header'
import DonorCard from './donor-card'

import 'antd/dist/antd.css'

const { Option } = Select
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const firestoreDb = firebase.firestore()

class SearchPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      districts: [],
      dist: '',
      state: '',
      donors: [],
      filteredList: [],
    }
  }

  componentDidMount() {
    this.getDonors()
  }

  componentDidUpdate(prevProps, prevState) {
    const { state } = this.state
    if (prevState.state !== state) {
      const districts = list.states.filter((item) => item.state === state)[0].districts
      this.setState({ districts })
    }
  }

  getDonors = async () => {
    this.setState({ isFetchingDonors: true })
    await firestoreDb.collection('donors').onSnapshot((querySnapshot) => {
      let donors = []
      querySnapshot.forEach((doc) => {
        donors.push(doc.data())
      })
      this.setState({ isFetchingDonors: false, donors })
    })
  }

  handleSearch = () => {
    const { state, dist, donors } = this.state
    let filteredList = []

    filteredList = donors.filter((donor) => donor.state === state)

    if (dist && !!filteredList.length) {
      filteredList = filteredList.filter((stateMatched) => stateMatched.dist === dist)
    }

    this.setState({ filteredList })
  }

  renderDonors = () => {
    const { filteredList = [], state } = this.state

    if (state === '') {
      return null
    }

    // if (state !== '' && !filteredList.length) {
    //   return <Empty />
    // }

    return filteredList.map((donor) => <DonorCard donor={donor} key={donor.id} />)
  }

  render() {
    const { districts, dist, state, isFetchingDonors } = this.state

    return (
      <div className="search">
        <div className="search-left"></div>
        <div className="search-right">
          <Header hideSearch />
          <div className="flex-row register-form">
            <div className="flex1">
              <p className="title">State</p>
              <div className="input">
                <Select
                  showSearch
                  className="select-section"
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
                  className="select-section"
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
          </div>

          <div className="submit-button mv10">
            <Button type="primary" icon={<SearchOutlined />} size="large" disabled={!state} onClick={this.handleSearch}>
              Search Donor
            </Button>
          </div>

          <div className="right-bottom flex-row">
            {isFetchingDonors ? <Spin indicator={antIcon} /> : this.renderDonors()}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPage
