import React from "react";
import Image from 'next/image'
import {Input} from "../components";

export default class LoginLayout extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {email: "", password: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const {handleSubmit} = this.props;
    if (typeof handleSubmit === 'function') {
      const {email, password} = this.state;
      handleSubmit(event, {email: email, password: password});
    }
  }

  render() {
    const {errors} = this.props;
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
          </div>
          <div className="mt-8 space-y-6">
            <form className="space-y-6" onSubmit={this.handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="text-black-100 font-m font-bold mb-2">Email address</label>
                  <Input
                    styles="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    name="email"
                    type="email" 
                    id="email-address"
                    autoComplete="email"
                    value={this.state.email}
                    placeholder="Email address"
                    onChangeText={value => this.setState({email: value})}
                  />
                  {errors && errors.email && 
                    <div className="flex m-2 p-2">
                        <label className="text-red-400 text-sm">{errors.email}</label>
                    </div>
                  }
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="text-black-100 font-m font-bold mb-2">Password</label>
                  <Input
                    styles="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" 
                    id="password"
                    name="password"
                    type="password" 
                    placeholder="Password"
                    value={this.state.password}
                    autocomplete="current-password"
                    onChangeText={value => this.setState({password: value})}
                  />
                  {errors && errors.password && 
                    <div className="flex m-2 p-2">
                        <label className="text-red-400 text-sm">{errors.password}</label>
                    </div>
                  }
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Image
                      width={22}
                      height={22}
                      src="/lock.svg"
                    />
                  </span>
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}