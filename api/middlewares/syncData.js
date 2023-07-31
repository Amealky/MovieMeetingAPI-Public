// ici on garde les fonctions créées pour récupérer les données, afin de les réutiliser quand on fera les
// jobs le faisant automatiquement
module.exports = (api) => {

    const http = require('http');

    var options = {
        host: "api.themoviedb.org",
        path: "",
        port: 80,
        method: 'GET',
        firstPage: 1,
        lastPage: 10
    };

    function syncLastestMovie(){
        options.path = latestMoviePath;
        http.request(options, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                var data = JSON.parse(body);
                api.actions.movies.createFromApi(data);
                //console.log(data);
            });
        }).end();
    }

    function syncCurrentMovies(){
        options.path = currentMoviesPath;
        http.request(options, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                var data = JSON.parse(body);
                api.actions.movies.createManyFromApi(data.results);
                //console.log(data);
            });
        }).end();
    }

    function syncUpcomingMovies(){
        options.path = upcomingMoviesPath;
        http.request(options, function(res){
            var body = '';

            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                var data = JSON.parse(body);
                api.actions.movies.createManyFromApi(data.results);
                //console.log(data);
            });
        }).end();
    }

    // sert à récupérer les films de themoviedb dans la base locale
    function syncGenres() {

        options.path = all_genres_path;
        http.request(options, function(res) {
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });

            res.on('end', function(){
                var data = JSON.parse(body);
                data.genres.forEach(function(genre){
                    console.log(genre);
                    if(genre.id){
                        api.actions.genres.createFromApi(genre);
                    }
                });
            });
        }).end();

        return;
    }
    return {
        syncLastestMovie,
        syncCurrentMovies,
        syncUpcomingMovies,
        syncGenres
    };
};