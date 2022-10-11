export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
  }

  get getUserInfo() {
    return { userName: this.name.textContent, userJob: this.job.textContent };
  }

  set setUserInfo(values) {
    const { userName, userJob } = values;

    this.name.textContent = userName;
    this.job.textContent = userJob;
  }
}
