import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startSingup, signup} from '../actions/auth';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: '',
          department: '',
          password: '',
          confirm_password: ''
        };
      }

      handleInputChange = (field, value) => {
        this.setState({
          [field]: value,
        });
      };

      onFormSubmit = (e) => {
        e.preventDefault();
        console.log('submit state',this.state);
        const { name,department,password,confirm_password } = this.state;
    
        if (name && department && password && confirm_password) {
          this.props.dispatch(startSingup());
          this.props.dispatch(signup(name,department,password,confirm_password));
        }
      };

    render() {
        console.log('this.state',this.state);
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
                    <label for="c_pass">Confirm Password</label>
                    <input 
                        type="password" 
                        name="confirm_password" 
                        id="c_pass"
                        onChange={(e) => this.handleInputChange('confirm_password', e.target.value)}></input>
                    <br></br>
                    <br></br>
                    <button type="submit" onClick={this.onFormSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(SignUp);