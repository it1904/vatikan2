$(document).ready(function () {
    let mista = [];
    let defBarva = $('#skupina').attr('fill');

    fetch('/api/places')
     .then(response => {
        return response.json();
     })
     .then(json =>{
        mista = json;
     })
     .catch(function(error){
        console.error('Chyba: \n', error);
     });

     $('circle').on('click', function(){
        let id = $(this).attr('id');
        $('circle').css({ 'fill': defBarva });
        $(this).css('fill', 'red');
        let misto = mista.find(item => {return item.id == id});
        console.log(misto);
        $('#informace').html(`
        <div class = "row">
            <div class = "col-12">
                <h2 class = "text-center py-2 text-white">${misto.name}</h2>
            </div>
        </div>
        <div class = "row">
            <div class = "col-8 pt-2">
                <p class = "text-justify">${misto.desc}</p>
            </div>
            <div class = "col-4">
                <figure class = "text-center">
                    <img src = "img/${misto.img}" class = "m-auto" style = "height:250px">
                    <figcaption class = "pt-1"><strong>Obrázek</strong></figcaption>
                </figure>
            </div>
        </div>
        `);
     });

});