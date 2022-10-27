export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  get getUserInfo() {
    return { userName: this.name.textContent, userJob: this.job.textContent , urlAvatar:this.avatar.src, userId:this.userId};
  }

  set setUserInfo(values) {
    const { userName, userJob, userId} = values;

    this.name.textContent = userName;
    this.job.textContent = userJob;
    this.userId = userId;
  }

  setUserAvatar(url) {
    this.avatar.src = url;
  }

  }
