const { addEvent } = require('./mongooseUtils.js');

eventName = 'test';
date = new Date();
location = 'test';
description = 'test';

addEvent(eventName, date, location, description).then((event) => {
    console.log(event);
}
).catch((error) => {
    console.error('Error creating event:', error);
}
);
