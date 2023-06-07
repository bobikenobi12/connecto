const { createKid } = require('./mongooseUtils');

name = 'Petar';
age = 10;
isFemale = true;
description = 'TIJRTIOE';
location = 'Seria';
languages = [["english", 5], ["hebrew", 5], ["russian", 5]];
interests = ['test'];
studying = true;


createKid(name, age, isFemale, description, location, languages, interests, studying).then((kid) => {
    console.log(kid);
}).catch((error) => {
    console.error('Error creating kid:', error);
}
);