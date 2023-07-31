const express = require('express');
const api = express();
var cron = require('node-cron');


require("./api/middlewares")(api);
require("./api/settings")(api);
require("./api/models")(api);
require("./api/actions")(api);
require("./api/routes")(api);

api.listen(80);

cron.schedule('*/10 * * * * *', () => {
    api.middlewares.syncData.syncLastestMovie();
});
/*
cron.schedule('/1 * * * *', () => {
    api.middlewares.syncData.syncCurrentMovies();
});

cron.schedule('/1 * * * *', () => {
    api.middlewares.syncData.syncUpcomingMovies();
});*/
