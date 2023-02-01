import { observable, makeObservable, action } from "mobx";

class UserStoreClass
{
  id = -1;
  name = "";

  updateUserInfo(info) {
    this.id = info.id;
    this.name = info.name;
  }

  clearData() {
    this.id = -1;
    this.name = "";
  }

  constructor() {
    makeObservable(this, {
      id: observable,
      name: observable,
      clearData: action,
      updateUserInfo: action
    });
  }
}
const UserStore = new UserStoreClass();
export default UserStore;