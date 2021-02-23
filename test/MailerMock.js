module.exports = class MailerMock {
    constructor() {
        this.currentMail = {};
        this.history = [];
    }

    setFrom(from) {
        this.currentMail.from = from;
        return this;
    }

    addRecipient(to) {
        this.currentMail.to = to;
        return this;
    }

    setSubject(subject) {
        this.currentMail.subject = subject;
        return this;
    }

    setContent(content, encoding) {
        this.currentMail.content = content;
        this.currentMail.encoding = encoding;
        return this;
    }

    send(host) {
        this.currentMail.host = host;
        return Promise.resolve(true).then(() => {
            this.history.push({ ...this.currentMail });
            this.currentMail = {};
        });
    }

    resetHistory() {
        this.history = [];
    }

    getLastSentItem() {
        return this.history[this.history.length - 1];
    }
}