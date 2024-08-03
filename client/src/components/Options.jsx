import React from 'react';
import { Link } from 'react-router-dom';

function Options() {
  return (
    <div>
      <h1>Assignment for Quadiro Technologies</h1>
      <div className="options">
        <Link to="/login">
          <button>User</button>
        </Link>
        <Link to="/login">
          <button>Admin</button>
        </Link>
      </div>
    </div>
  );
}

export default Options;