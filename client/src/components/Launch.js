import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import moment from 'moment';
import { Link } from 'react-router-dom';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_name
        rocket_id
        rocket_type
      }
    }
  }
`;

class Launch extends React.Component {
  render() {
    let flight_number = this.props.match.params.flight_number;
    flight_number = parseInt(flight_number, 10);
    return (
      <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);
          else {
            const {
              mission_name,
              launch_year,
              flight_number,
              launch_date_local,
              launch_success,
              rocket: { rocket_name, rocket_id, rocket_type },
            } = data.launch;
            const launchStatusMsg =
              launch_success === null ? 'N/A' : launch_success ? 'Yes' : 'No';
            const launchStatusColor =
              launch_success === null
                ? 'text-secondary'
                : launch_success
                ? 'text-success'
                : 'text-danger';
            return (
              <div>
                <h1 className="display-4 my-3">
                  <span className="text-dark">Mission:</span> {mission_name}
                </h1>
                <h4 className="mb-3">Launch Details:</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Flight Number: {flight_number}
                  </li>
                  <li className="list-group-item">
                    Launch Year: {launch_year}
                  </li>
                  <li className="list-group-item">
                    Launch Date:{' '}
                    {moment(launch_date_local).format('MMMM Do YYYY, h:mm a')}
                  </li>
                  <li className={`list-group-item`}>
                    Launch Successful:{' '}
                    <span className={launchStatusColor}>{launchStatusMsg}</span>
                  </li>
                </ul>
                <h4 className="my-3">Rocket Details:</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket ID: {rocket_id}</li>
                  <li className="list-group-item">
                    Rocket Name: {rocket_name}
                  </li>
                  <li className="list-group-item">
                    Rocket Type: {rocket_type}
                  </li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

export default Launch;
