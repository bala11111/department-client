import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login,clearAuthState} from '../actions/auth';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          department: '',
          password: '',
        };
      }

      componentWillUnmount() {
        this.props.dispatch(clearAuthState());
      }

      handleInputChange = (field, value) => {
        console.log('change stae',this.state)
        this.setState({
          [field]: value,
        });
      };

      handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('this.state', this.state);
        const { name, password,department } = this.state;
    
        if (name && password && department) {
          this.props.dispatch(login(name, password,department));
        }
      };

    render() {
        return (
            <div>
                <form>
                    <label for="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={(e) => this.handleInputChange('name', e.target.value)}></input>
                    <br></br><br></br>
                    <label for="dept">Department</label>
                    <select id="dept" name="department" onChange={(e) => this.handleInputChange('department', e.target.value)}>
                    <option value="dept1" selected>dept1</option>
                    <option value="dept2">dep2</option>
                    </select>
                    <br></br><br></br>
                    <label for="pass">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="pass"
                        onChange={(e) => this.handleInputChange('password', e.target.value)}></input>
                    <br></br><br></br>
                    <br></br>
                    <button type="submit" onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Login);