const bcrypt = require('bcryptjs');
const db = require('../data/database')

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.addres = {
            street: street,
            postal: postal,
            city: city
        };
    }

    getUserWithSameEmail() {
        return db.getDb().collection('users').findOne({ email: this.email })
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12)
        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            adress: this.addres
        });
    }

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword)
    }

}

module.exports = User;