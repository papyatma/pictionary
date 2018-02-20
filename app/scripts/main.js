'use strict';


$( function(){
   
   $('#idBtn').on('click', function(){
 
      console.log('le bouton fonctione');

 $.ajax({
       method: 'get',
       url:'/players',
       contentType:'application/json; charset=utf-8',
       success: function(reponse){
              
              // console.log(example);
              console.log(reponse);

              var tbodyEl = $('tbody');

                tbodyEl.html('');

                reponse.forEach(function(players)
                {
                    tbodyEl.append('\
                        <tr>\
                            <td class="username">' + players.username + '</td>\
                            <td class="email"> ' + players.email + '</td>\
                            \
                        </tr>\
                    ');

                });
       }

      });
   });
});