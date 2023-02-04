import { observable, makeObservable, action } from "mobx";

class UserStoreClass
{
  id = -1;
  name = "";
  token = "";
  authorizationLink = "";

  setUserToken(token) {
    this.token = token;
  }

  updateUserInfo(info) {
    this.id = info.id;
    this.name = info.name;
    this.authorizationLink = info.authorization_link;//.concat(info.id);
  }

  clearData() {
    this.id = -1;
    this.name = "";
    this.token = "";
    this.authorizationLink = "";
  }

  clearAuthorizationLink() {
    this.authorizationLink = "";
  }

  constructor() {
    makeObservable(this, {
      id: observable,
      name: observable,
      token: observable,
      authorizationLink: observable,
      clearData: action,
      setUserToken: action,
      updateUserInfo: action
    });
  }
}
const UserStore = new UserStoreClass();
export default UserStore;