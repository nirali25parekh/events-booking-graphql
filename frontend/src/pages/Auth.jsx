import React from "react";
import "./Auth.css"
import AuthContext from '../context/AuthContext'

class Auth extends React.Component {
  state = {
    isLogin: true,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  toggleIsLogin = () => {
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = async (event) => {
    event.preventDefault(); // default behaviour is sending request to our development server
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim() === 0) {
      return;
    }

    let requestBody = {};

    // for login
    requestBody = {
      query: `
      query {
            login( authInput: {email: "${email}", password: "${password}"} ) {
              userId
              tokenExpiration
              token
            }
          }
          `,
    };

    if (!this.state.isLogin) {
      // for signup
      requestBody = {
        query: `
          mutation {
              createUser(userInput: {email: "${email}", password: "${password}"}) {
                  _id
                email
              }
            }
          `,
      };
    }

    try {
      const res = await fetch("http://localhost:8000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      const resData = await res.json();
      console.log('resData', resData)

      // incase of a login
      if (resData.data.login.token) {
        this.context.login(
          resData.data.login.token,
          resData.data.login.userId,
          resData.data.login.tokenExpiration
        );
      }
    } catch (err) {
      console.log(err);
    }
    // request to backend
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <h1>{this.state.isLogin ? "Login" : "Signup"}</h1>
        <div className="form-control">
          <label htmlFor="email"> Email</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password"> Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>

        <div className="form-actions">
          <button type="submit"> Submit </button>
          <button type="button" onClick={this.toggleIsLogin}>
            {this.state.isLogin ? "SignUp" : "Login"} instead
          </button>
        </div>
      </form>
    );
  }
}

export default Auth;
