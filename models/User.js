class User {
    constructor(id, name, lastName, username, email, password, userType) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }
}

module.exports = User;