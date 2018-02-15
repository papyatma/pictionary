let connection = require('./../config');
module.exports.register=function(req,res){
    let today = new Date();
    let users={
        "name":req.body.name,
        "username":req.body.username,
        "email":req.body.email,
        "password":req.body.password
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'erreur dans la requete'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'Connexion réussi'
        })
      }
    });
}
