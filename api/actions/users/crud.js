module.exports = (api) => {

    const User = api.models.User;

    function findAll(req, res, next) {

        console.log("Start getting all movies");
        User.findAll().then(function(users) {
            if(users[0] == null) {
                return res.status(204).send(users)
            }
            return res.send(users);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findById(req, res, next) {
        console.log(req.user);
        User.findAll({
            where: {
                idUser: req.params.id
            },
            order: [['idUser', 'DESC']]
        }).then(function(anotherTask) {
            if(anotherTask[0] == null){
                return res.status(204).send(anotherTask)
            }
            return res.send(anotherTask);
        }).catch(function(error) {
            return res.status(500).send(error)
        });
    }

    function findBuddys(req, res, next) {
        console.log("start look for buddys");

        console.log(req.user.idUser);
       var sqlQuery = "SELECT DISTINCT mydb.User.* FROM mydb.User WHERE mydb.User.idUser IN (\
        SELECT DISTINCT mydb.UserMeeting.idUser FROM mydb.UserMeeting WHERE mydb.UserMeeting.idMeeting IN (\
        SELECT DISTINCT mydb.UserMeeting.idMeeting FROM mydb.UserMeeting WHERE mydb.UserMeeting.idUser = "  
         + req.user.idUser + " ) )";
       
       sqlQuery += " ORDER BY mydb.User.idUser DESC ";

       console.log(sqlQuery);

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



    function create(req, res) {
        if (!req.body.pseudo) {
            return res.status(412).send("You must provide a pseudo");
        }
        if (!req.body.password) {
            return res.status(412).send("You must provide a password");
        }
        
        req.body.encryptedPassword = req.body.password;
        let user = User.build(req.body);
        user
            .save()
            .then(function() {
                return res.send(201);
            })
            .catch(function(error) {
                if (error.name = "SequelizeUniqueConstraintError") {
                    return res.status(400).send(error)
                } else {
                    return res.status(500).send(error)
                }
            });
    }

    function createFromApi(data){
        let users = data;

        if(users.length < 1){
            //return res.send(412);
            console.log("400");
            process.exit();
        }

        let user = Movie.build(users);

        user
        .save()
        .then()
        .catch(function(error) {
                console.log(error);
                console.log("500");
                process.exit();
            
        });

        console.log("oklm");
        console.log("201");  
        
    }

    return {
        create,
        createFromApi,
        findAll,
        findBuddys,
        findById
    };
};