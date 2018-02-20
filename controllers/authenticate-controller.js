let connection = require('./../config');
module.exports.authenticate=function(req,res){
    let email=req.body.email;
    let password=req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'erreur dans la requete'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
              req.session.authenticated = true;
              req.session.results = results;
                res.json({
                    status:true,
                    message:'Connexion réusie',
                    username: results[0].username
                })
            }else{
                res.json({
                  status:false,
                  message:"Email ou password inconnu"
                 });
            }

        }
        else{
          res.json({
              status:false,
            message:"Email n'existe pas"
          });
        }
      }
    });
}
