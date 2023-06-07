const mongoose = require('mongoose');

const uri = "mongodb+srv://borislavehubav:obichammuje@emfinder.jp3yf7f.mongodb.net/?retryWrites=true&w=majority";

const userSchema = new mongoose.Schema({
    id: String,
    password: String,
    email: String,
    name: String,
    isVolunteer: Boolean,
});

const kidSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    isFemale: Boolean,
    description: String,
    location: String,
    languages: [[String, Number]],
    interests: [String],
    stydying: Boolean,
});

const UserModel = mongoose.model('User', userSchema);
const KidModel = mongoose.model('Kid', kidSchema);

const readUser = async (email) => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find the user based on the provided name
        const user = await UserModel.findOne({ email });

        if (user) {
            // User found
            console.log(user);
            return user;
        } else {
            // User not found
            return null;
        }
    } catch (error) {
        console.error('Error reading user:', error);
        return null;
    } finally {
        // Disconnect from the MongoDB database
        mongoose.disconnect();
    }
};

const createUser = async (name, password, email, isVolunteer) => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const user = new UserModel({
            name,
            password,
            email,
            isVolunteer,
        });

        await user.save();
        console.log('User saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving user:', error);
        return false;
    } finally {
        // Disconnect from the MongoDB database
        mongoose.disconnect();
    }
};

const readAllKids = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const kids = await KidModel.find();

        if (kids) {
            // Kids found
            console.log(kids);
            return kids;
        } else {
            // Kids not found
            return null;
        }
    } catch (error) {
        console.error('Error reading kids:', error);
        return null;
    } finally {
        // Disconnect from the MongoDB database
        mongoose.disconnect();
    }
};

module.exports = { readUser, createUser, readAllKids };
