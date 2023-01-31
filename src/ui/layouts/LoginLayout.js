import React from "react";
import Image from 'next/image';
import { CardTitle } from "../components/label";
import { FormInput } from "../components/inputs";
import { AuthNavigator } from "../components/navigation";

export default class LoginLayout extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
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
    <AuthNavigator>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-calc-vh-76">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center">
            <Image
              width={100}
              height={40}
              alt="Calendly"
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            />
            <CardTitle className="mt-6" title="Sign in to your account" />
          </div>
          <div className="mt-8 space-y-6">
            <form className="space-y-6" onSubmit={this.handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div>
                  <FormInput
                    inputName="email"
                    inputType="email"
                    title="Email address" 
                    htmlFor="email-address"
                    inputId="email-address"
                    inputAutoComplete="email"
                    errorText={errors?.email} 
                    inputValue={this.state.email}
                    inputPlaceholder="Email address"
                    onChangeInput={value => this.setState({email: value})}
                  />
                </div>
                <div className="mt-4">
                  <FormInput
                    title="Password" 
                    htmlFor="password"
                    inputId="password"
                    inputName="password"
                    inputType="password"
                    inputPlaceholder="Password"
                    errorText={errors?.password} 
                    inputValue={this.state.password}
                    inputAutoComplete="current-password"
                    onChangeInput={value => this.setState({password: value})}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Image
                      alt=""
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
    </AuthNavigator>
    );
  };
}