import { observable, makeObservable, action } from "mobx";

class UserStoreClass
{
  id = "";
  name = "";

  updateUserInfo(info) {
    this.id = info.id;
    this.name = info.name;
  }

  constructor() {
    makeObservable(this, {
      id: observable,
      name: observable,
      updateUserInfo: action
    });
  }
}
const UserStore = new UserStoreClass();
export default UserStore;