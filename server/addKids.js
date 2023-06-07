const { createKid } = require('./mongooseUtils');

name = 'Petar';
age = 10;
isFemale = true;
description = 'TIJRTIOE';
location = 'Seria';
languages = [{ language: 'English', level: 'Native' }, { language: 'Hebrew', level: 'Native' }, { language: 'Russian', level: 'Native' }];
interests = ['test'];
studying = true;


createKid(name, age, isFemale, description, location, languages, interests, studying).then((kid) => {
    console.log(kid);
}).catch((error) => {
    console.error('Error creating kid:', error);
}
);