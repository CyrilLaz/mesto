export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
  }

  get getUserInfo() {
    return { userName: this.name.textContent, userJob: this.job.textContent }; //некоторая связанность в именах получается, если name полей ввода будут другие то работать не будет...
  }

  set setUserInfo(values) {
    const { userName, userJob } = values;

    this.name.textContent = userName;
    this.job.textContent = userJob;
  }
}
