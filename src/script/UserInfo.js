export default class UserInfo {
  constructor({nameSelector,jobSelector}) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
  }

  get getUserInfo() {
    return [this.name.textContent, this.job.textContent];
  }

  set setUserInfo(values) {
    [this.name.textContent, this.job.textContent] = values;
  }
}
