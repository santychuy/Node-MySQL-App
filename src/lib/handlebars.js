const {format} = require('timeago.js');

const helpers = {};

//Creado por mi
helpers.timeago = (timestamp) =>{
    return format(timestamp);
}

module.exports = helpers;