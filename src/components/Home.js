import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <Link to="/login">Log in</Link><br/>
                <Link to="/signup">Register</Link>
            </div>
        );
    }
}

export default Home;