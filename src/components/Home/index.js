// Write your code here

import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {teamDetails: [], isLoading: true}

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedTeamData = data.teams.map(eachteam => ({
      id: eachteam.id,
      name: eachteam.name,
      teamImageUrl: eachteam.team_image_url,
    }))

    this.setState({teamDetails: updatedTeamData, isLoading: false})
  }

  render() {
    const {teamDetails, isLoading} = this.state
    return (
      <div className="home-container">
        <div className="logo-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="logo"
            />
          </div>
          <h1 className="main-heading">IPL DASHBOARD</h1>
        </div>
        <div>
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} />
            </div>
          ) : (
            <ul className="list-team-container">
              {teamDetails.map(eachItem => (
                <TeamCard key={eachItem.id} teamDetails={eachItem} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
