module.exports = class Mailer {
  constructor(mailer) {
    this.to = "abcd@gmail.com";
    this.from = "web@gmail.com";
    this.host = "localhost";
    this.mailer = mailer;
  }

  async send(subject, data) {
    return this.mailer
      .setFrom(this.from)
      .addRecipient(this.to)
      .setSubject(subject)
      .setContent(data, "text/html; charset=utf-8")
      .send(this.host);
  }
};
