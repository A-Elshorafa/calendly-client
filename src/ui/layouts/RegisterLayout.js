import Image from "next/image";
import React, { Component } from "react";
import { CardTitle } from "../components/label";
import { FormInput } from "../components/inputs";
import { AuthNavigator } from "../components/navigation";

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
      <AuthNavigator>
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-auto h-calc-vh-76">
          <div className="w-full max-w-md">
            <div className="flex flex-col">
              <Image
                width={100}
                height={40}
                alt="Calendly Demo"
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              />
              <CardTitle className="mt-6" title="Create New Account" />
            </div>
            <div className="mt-8 space-y-6">
              <form className="space-y-6" onSubmit={this.handleSubmit}>
                <div className="space-y-6 rounded-md shadow-sm">
                  <div>
                    <FormInput
                      title="Name"
                      inputName="name"
                      inputType="text"
                      htmlFor="user-name"
                      inputId="user-name"
                      inputPlaceholder="Name"
                      inputAutoComplete="name"
                      inputValue={this.state.name}
                      onChangeInput={value => this.setState({name: value})}
                      errorText={Array.isArray(errors?.name)? errors.name[0] : ''} 
                    />
                  </div>
                  <div>
                    <FormInput
                      inputType="email"
                      title="Email address"
                      htmlFor="email-address"
                      inputId="email-address"
                      inputAutoComplete="email"
                      inputValue={this.state.email}
                      inputPlaceholder="Email address"
                      onChangeInput={value => this.setState({email: value})}
                      errorText={Array.isArray(errors?.email)? errors.email[0] : ''} 
                    />
                  </div>
                  <div>
                    <FormInput
                      title="Password"
                      htmlFor="password"
                      inputId="password"
                      inputType="password"
                      inputPlaceholder="Password"
                      inputValue={this.state.password}
                      onChangeInput={value => this.setState({password: value})}
                      errorText={Array.isArray(errors?.password)? errors.password[0] : ''} 
                      showErrorText={Array.isArray(errors?.password)? errors.password[0]?.indexOf("confirmation") === -1 : false}
                    />
                  </div>
                  <div>
                    <FormInput
                      title="Password Confirmation"
                      htmlFor="password-confirmation"
                      inputId="password-confirmation"
                      inputType="password"
                      inputPlaceholder="Password Confirmation"
                      inputValue={this.state.passwordConfirmation}
                      onChangeInput={value => this.setState({passwordConfirmation: value})}
                      errorText={Array.isArray(errors?.password)? errors.password[0] : ''} 
                      showErrorText={Array.isArray(errors?.password)? errors.password[0]?.indexOf("confirmation") !== -1 : false}
                    />
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
      </AuthNavigator>
    );
  };
}