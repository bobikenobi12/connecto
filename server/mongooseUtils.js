const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    languages: [{ language: String, level: String }],
    interests: [String],
    studying: Boolean,
    imageURL: String,
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

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
            password: encryptedPassword,
            email,
            isVolunteer,
        });

        await user.save();
        console.log('User saved successfully');
        return user;
    } catch (error) {
        console.error('Error saving user:', error);
        return null;
    } finally {
        // Disconnect from the MongoDB database
        mongoose.disconnect();
    }
};

const createKid = async (name, age, isFemale, description, location, languages, interests, studying, imageURL) => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        const kid = new KidModel({
            name,
            age,
            isFemale,
            description,
            location,
            languages,
            interests,
            studying,
            imageURL,
        });

        await kid.save();
        console.log('Kid saved successfully');
        return kid;
    } catch (error) {
        console.error('Error saving kid:', error);
        return null;
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

        console.log(kids);

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

module.exports = { readUser, createUser, readAllKids, createKid };
