// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamDetails} = props
  const {name, id, teamImageUrl} = teamDetails
  return (
    <Link to={`/team-matches/${id}`} className="team-card-link">
      <li className="card-container">
        <div>
          <img src={teamImageUrl} alt={`${name}`} className="team-img" />
        </div>
        <h1 className="team-heading">{name}</h1>
      </li>
    </Link>
  )
}

export default TeamCard
