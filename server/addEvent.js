const { addEvent } = require('./mongooseUtils.js');

eventName = 'Готвене на бисквитки';
date = new Date();
location = 'у нас';
description = 'Ще си изпечем бисквитки 🍪';

addEvent(eventName, description, location, date).then((event) => {
    console.log(event);
}
).catch((error) => {
    console.error('Error creating event:', error);
}
);
