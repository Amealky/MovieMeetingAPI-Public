module.exports = (api) => {

    const Movie = api.models.Movie;
    const MovieGenre = api.models.MovieGenre;
    const Op = require('sequelize').Op

    function findMoviesWithQuery(query, res) {
        Movie.findAll(query)
        .then(function(movies) {
            if(movies[0] == null) {
                return res.status(204).send(movies)
            }
            return res.send(movies);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    // returns the pagination as [nb_movies, nb_skip]
    function givePagination(req) {
        let page_num = 1; // first page by default
        if (req.query.page != null) {
            page_num = parseInt(req.query.page);
        }
        let nb_movies = 10; // 10 movies per page by default
        if (req.query.nb != null) {
            nb_movies = parseInt(req.query.nb);
        }
        let nb_skip = (page_num - 1) * nb_movies;
        return [nb_movies, nb_skip];
    }

    function findAll(req, res, next) {
        let pagination = givePagination(req);
        let query = {
            limit: pagination[0],
            offset: pagination[1]
        };
        findMoviesWithQuery(query, res);
    }

    function findFuture(req, res, next) {
        let pagination = givePagination(req);
        let query = {
            where: {
                release_date: {
                    [Op.gt]: new Date()
                }
            },
            order: ['release_date'],
            limit: pagination[0],
            offset: pagination[1]
        };
        findMoviesWithQuery(query, res);
    }

    function findPlaying(req, res, next) {
        let pagination = givePagination(req);
        let today = new Date();
        let monthsAgo = new Date().setDate(today.getDate()-60); // approx. 2 months
        let query = {
            where: {
                release_date: {
                    [Op.lte]: today,
                    [Op.gte]: monthsAgo
                }
            },
            order: ['vote_average'],
            limit: pagination[0],
            offset: pagination[1]
        };
        findMoviesWithQuery(query, res);
    }

    function findMoviesWithRecentMeetings(req, res, next) {
        let pagination = givePagination(req);

        var sqlQuery = 
              "select * "
            + " from mydb.Movie"
            + " inner join ("
                + " select idMovie, max(creationDate) as lastMeetingCreationDate from mydb.Meeting"
                + " where meetingDate > now()"
                + " group by idMovie"
            + " ) recentMeetings"
            + " on recentMeetings.idMovie = mydb.Movie.idMovie"
            + " order by recentMeetings.lastMeetingCreationDate desc"
            + " limit " + pagination[1] + ", " + pagination[0];

        api.mysql.query(sqlQuery, { model: api.models.Movie })
        .then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(err) {
            return res.status(500).send(err)
        });
    }

    function findById(req, res, next) {
        var sqlQuery = "SELECT *" +
        "  FROM mydb.Movie" +
        "  WHERE idMovie = " + req.params.id;

        sqlQuery += checkFilter(req.query);
        

        sqlQuery += " ORDER BY idMovie DESC ";
        
        api.mysql.query(sqlQuery, { model: api.models.Movie })
        .then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(404).send()
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }



    function findByName(req, res, next) {
        //console.log(api.middlewares.tokenValidator);
        var sqlQuery = "SELECT *" +
        "  FROM mydb.Movie" +
        "  WHERE title LIKE '%" + req.params.name + "%'";

        sqlQuery += checkFilter(req.query);
      

        sqlQuery += " ORDER BY idMovie DESC ";
        
        api.mysql.query(sqlQuery,
         { model: api.models.Movie }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function checkFilter(query){
       
        var sqlQuery = "";

        if(query.adult){
            sqlQuery +=  " AND adult = " + query.adult;
        }
        if(query.original_language){
            sqlQuery += " AND original_language = '" + query.original_language + "'";
        }

        return sqlQuery;
    }

    function create(req, res, next) {

        console.log("start create movie");
        
        let movies  = req.body;
        if (movies.length < 1) {
            return res.send(412);
        }
            //sessions['id_user'] =  req.idUser;
            
            let movie = Movie.build(movies);
            movie
                .save()
                .then()
                .catch(function(error) {
                return res.status(500).send(error)
            });
            console.log("oklm");
        return res.send(201);
    }

    function createFromApi(data) {
        let movies = data;
        if(movies.length < 1){
            console.log("400");
            process.exit();
        }
        let movie = Movie.build(movies);
        //console.log(movie);
        movie
        .save()
        .then((createdMovie) => { // save film's genres
            let id = createdMovie.idDB;
            let genres = data.genres;
            console.log(id, ' has genres : ', genres);
            genres.forEach(function(genre) {
                MovieGenre.create({
                    idMovie: id,
                    idGenre: genre.id
                })
                .then(function(res) {
                    console.log(res);
                })
                .catch(function(error) {
                    console.log(error.name);
                });
            });
        })
        .catch(function(error) {
                console.log(error.name);
                //process.exit();
        });
    }

    function createManyFromApi(data){
        let movies = data;
        if(movies.length < 1){
            console.log("400");
            process.exit();
        }
        //console.log(data);
        movies.forEach(function(movie) {
            Movie.create(movie)
            .then((createdMovie) => { // save film's genres
                let id = createdMovie.idDB;
                let genres = data.genres;
                console.log(id, ' has genres : ', genres);
                genres.forEach(function(genre) {
                    MovieGenre.create({
                        idMovie: id,
                        idGenre: genre.id
                    })
                    .then(function(res) {
                        console.log(res);
                    })
                    .catch(function(error) {
                        console.log(error.name);
                    });
                });
            })
            .catch(function(error) {
                console.log(movie.title, ' : ', error.name);
            });
        });
    }

    function findAllWithRelation(req, res, next) {

        api.mysql.query("SELECT * " +
            "   FROM movie" +
            "   WHERE c.idProfile = m.idProfile ",
           /* "FROM missions m " +
            "  LEFT JOIN profiles as p ON p.id = m.idProfile " +
            "WHERE m.state = 'En Attente'" +
            " OR (m.updatedAt <= CURRENT_TIMESTAMP - INTERVAL 10 MINUTE and m.state = 'Valid')" +
            "ORDER BY m.severity DESC"*/
            { model: api.models.MissionCons }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    return {
        create,
        createFromApi,
        createManyFromApi,
        findAll,
        findById,
        findByName,
        findFuture,
        findPlaying,
        findMoviesWithRecentMeetings
    };
};