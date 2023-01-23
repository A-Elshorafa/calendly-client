import React, { Component } from "react";
import {Input} from "../components/inputs";

export default class RegisterLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const {handleRegisteration} = this.props;
    if (typeof handleRegisteration === 'function') {
      handleRegisteration(event, this.state);
    }
  }

  render() {
    const {errors} = this.props;
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Create New Account</h2>
          </div>
          <div className="mt-8 space-y-6">
            <form className="space-y-6" onSubmit={this.handleSubmit}>
              <div className="space-y-6 rounded-md shadow-sm">
                <div>
                  <label htmlFor="user-name" className="text-black-100 font-m font-bold mb-2">Name</label>
                  <Input
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    type="text"
                    id="user-name"
                    placeholder="Name"
                    autoComplete="name"
                    value={this.state.name}
                    onChangeText={value => this.setState({name: value})}
                  />
                  {errors && errors.name && 
                    <div className="flex m-2 p-2">
                        <label className="text-red-400 text-sm">{errors.name[0]}</label>
                    </div>
                  }
                </div>
                <div>
                  <label htmlFor="email-address" className="text-black-100 font-m font-bold mb-2">Email address</label>
                  <Input
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    type="email" 
                    id="email-address"
                    autoComplete="email"
                    value={this.state.email}
                    placeholder="Email address"
                    onChangeText={value => this.setState({email: value})}
                  />
                  {errors && errors.email && 
                    <div className="flex m-2 p-2">
                        <label className="text-red-400 text-sm">{errors.email[0]}</label>
                    </div>
                  }
                </div>
                <div>
                  <label htmlFor="password" className="text-black-100 font-m font-bold mb-2">Password</label>
                  <Input
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                    id="password"
                    type="password" 
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={value => this.setState({password: value})}
                  />
                  {errors && errors.password && errors.password[0] && errors.password[0].indexOf("confirmation") === -1 &&
                    <div className="flex m-2 p-2">
                      <label className="text-red-400 text-sm">{errors.password[0]}</label>
                    </div>
                  }
                </div>
                <div>
                  <label htmlFor="password-confirmation" className="text-black-100 font-m font-bold mb-2">Password Confirmation</label>
                  <Input
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                    type="password"
                    id="password-confirmation"
                    placeholder="Password Confirmation"
                    value={this.state.passwordConfirmation}
                    onChangeText={value => this.setState({passwordConfirmation: value})}
                  />
                  {errors && errors.password && errors.password[0] && errors.password[0].indexOf("confirmation") !== -1 && 
                    <div className="flex m-2 p-2">
                        <label className="text-red-400 text-sm">{errors.password[0]}</label>
                    </div>
                  }
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}