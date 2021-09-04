class User {
    constructor(id, name, lastName, email, password, userType) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }
}

module.exports = User;