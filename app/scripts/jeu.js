(function init() {

    let url = 'http://localhost:9000/';
    $.ajax({
        url: url + 'api/game',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            alert('super');
            console.log(data);

        },
        error: function() {
            console.log('HTTP error');
        }
    });
})();
