
$(function(){

  $('h2').on('click', function(){
     $(this).parentsUntil('row').next().slideToggle(1000);
  

     });
     function eventsBlock(events){
      events.forEach((event)=>{
         console.log(event.year);
         $('#udalosti tbody').append(`<tr>
         <td class="event-year">${event.year}</td>
         <td>
         <p class="event-name"><i class="fa fa-chevron-down" aria-hidden="true"></i> <a
         href="${event.url}" target="_new" class="linkkk">${event.event}</a></p>
         <p class="event-detail" style="">
            ${event.detail}
            </p>
         </td>
         </tr>`);
      });

      $('.event-detail').hide();

      $('.event-name i').on('click',function(){
         
         $('#udalosti tr').removeClass('bg-secondary text-white');

         $(this).parents('tr').addClass('bg-secondary text-white');

         $('#udalosti .event-detail').hide(500);

         $(this).parent().next().slideToggle(1000);

      });
     }

     function heroesBlock(heroes){
      heroes.forEach((hero)=>{
         $('#postavy .list-group').append(`<li class="list-group-item list-group-item-action list-group-item-primary">${hero.name}</li>`);
      });
        function fillPerson(person){
           let hero = heroes.find(item => {return item.name === person});
 
           $('#portret .card-header').html(`${hero.birth} - ${hero.death} `);
           $('#portret .card-title').text(hero.name);
           $('#portret .card-text').text(hero.biography);
           $('#portret .card-footer').html(`<a href = "${hero.online}">${hero.online}</a>`);
 
            $('#portret .gallery').empty();
           hero.portraits.forEach(portrait =>{
               $('#portret .gallery').append(`<div class = "col-sm-4"><img src = "img/${portrait}" alt = "${hero.name}" class = "img-fluid"></div>`);
           });
        }
        $('#postavy li:first').addClass('active');
        fillPerson(heroes[0].name);
        $('#postavy .list-group li').on('click', function(){
         fillPerson($(this).text());
 
         $('#postavy .list-group li').removeClass('active');
         $(this).addClass('active');
 
         let person =  $(this).text();
 
         $('#portret').slideUp(1000, function(){
            fillPerson(person);
         });
 
         $('#portret').slideDown(1000);
      });
     }    
     
     fetch('../historie/data/events.json')
     .then(response => {
        return response.json();
     })
     .then(json =>{
         eventsBlock(json);
     })
     .catch(function(error){
        console.error('Chyba: \n', error);
     });

     fetch('../historie/data/heroes.json')
     .then(response => {
        return response.json();
     })
     .then(json =>{
         heroesBlock(json);
     })
     .catch(function(error){
        console.error('Chyba: \n', error);
     });
})