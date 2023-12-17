class UserRes {
  constructor(displayName, email, isVerified, phone, accessToken) {
    this.displayName = displayName;
    this.email = email;
    this.phoneNumber = phone;
    this.isVerified = isVerified;
    this.accessToken = accessToken;
  }
}

module.exports = UserRes;
