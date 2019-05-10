import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function LaunchItem({
  launch: { flight_number, mission_name, launch_date_local, launch_success },
}) {
  const launchStatus =
    launch_success === null
      ? 'text-secondary'
      : launch_success
      ? 'text-success'
      : 'text-danger';
  return (
    <div className="card card-body mb-3">
      <div className="col-md-9">
        <h4 className={launchStatus}>Mission: {mission_name}</h4>
        <p>Date: {moment(launch_date_local).format('MMMM Do YYYY, h:mm a')}</p>
      </div>
      <div className="col-md-3">
        <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
          Launch Details
        </Link>
      </div>
    </div>
  );
}
