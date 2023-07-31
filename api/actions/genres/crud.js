module.exports = (api) => {
    
    const Genre = api.models.Genre;

    function findAll(req, res, next) {

        console.log("Start getting all genres");
        Genre.findAll().then(function(genres) {
            if(genres[0] == null) {
                return res.status(204).send(genres)
            }
            return res.send(genres);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findById(req, res, next) {

        Genre.findAll({
            where: {
                idGenre: req.params.id
            },
            order: [['idGenre', 'DESC']]
        }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(404).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });

    }

    function create(req, res, next) {

        console.log("start create movie");
        
        let genres  = req.body;
        if (genres.length < 1) {
            return res.send(412);
        }
            //sessions['id_user'] =  req.idUser;
            
            let genre = Genre.build(genres);
            genre
                .save()
                .then()
                .catch(function(error) {
                return res.status(500).send(error)
            });
            console.log("oklm");
        return res.send(201);
    }

    function createFromApi(data){
        if(data.length < 1){
            console.log("400");
            process.exit();
        }

        let genre = Genre.build(data);
        genre.save().then()
        .catch(function(error) {
            console.log(error);
            process.exit();
        })
    }

    return {
        createFromApi,
        findAll,
        findById,
        create
    };
};