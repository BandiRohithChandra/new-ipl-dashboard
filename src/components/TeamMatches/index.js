// Write your code here
import {withRouter} from 'react-router-dom'
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts'
import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    latestMatchDetails: [],
    isLoading: true,
    teamBannerUrl: '',
    recentMatches: [],
    matchStats: {
      won: 0,
      lost: 0,
      drawn: 0,
    },
  }

  componentDidMount() {
    this.getLatestMatchData()
  }

  getLatestMatchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedLatestMatchData = {
      id: data.latest_match_details.id,
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
    }

    const updatedRecentMatches = data.recent_matches.map(eachMatch => ({
      umpires: eachMatch.umpires,
      result: eachMatch.result,
      manOfTheMatch: eachMatch.man_of_the_match,
      id: eachMatch.id,
      date: eachMatch.date,
      venue: eachMatch.venue,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      firstInnings: eachMatch.first_innings,
      secondInnings: eachMatch.second_innings,
      matchStatus: eachMatch.match_status,
    }))

    const won = updatedRecentMatches.filter(matches => matches.result === 'Won')
      .length

    const lost = updatedRecentMatches.filter(
      matches => matches.result === 'Lost',
    ).length

    const drawn = updatedRecentMatches.filter(
      matches => matches.result === 'Drawn',
    ).length

    this.setState({
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: updatedLatestMatchData,
      recentMatches: updatedRecentMatches,
      matchStats: {won, lost, drawn},
      isLoading: false,
    })
  }

  onClickBackButton = () => {
    const {history} = this.props
    history.push('/')
  }

  renderPieChart = () => {
    const {matchStats} = this.state
    const data = [
      {name: 'Won', value: matchStats.won},
      {name: 'Lost', value: matchStats.lost},
      {name: 'Drawn', value: matchStats.drawn},
    ]

    const COLORS = ['#0088FE', '#FF8042', '#FFBB28']

    return (
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    )
  }

  render() {
    const {
      latestMatchDetails,
      teamBannerUrl,
      isLoading,
      recentMatches,
    } = this.state
    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          <div>
            <p>Latest Matches</p>
            <div>
              <img
                src={teamBannerUrl}
                alt="team banner"
                className="team-banner"
              />
            </div>
            <li>
              <LatestMatch latestMatchDetails={latestMatchDetails} />
            </li>

            <button
              type="button"
              className="back-button"
              onClick={this.onClickBackButton}
            >
              Back
            </button>

            <li className="recent-match-container">
              {recentMatches.map(eachMatch => (
                <MatchCard key={eachMatch.id} recentMatches={eachMatch} />
              ))}
            </li>

            <div className="pie-chart-container">
              <h1>Match Statistics</h1>
              {this.renderPieChart()}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(TeamMatches)
