function openAgenda(e,page){
  // var app = new Framework7();
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Agenda/GetAgenda', {}, function (data) {
    // console.log($$);
    $$('#agenda-loader').remove();
    var eventsArray = [];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    for(i=0;i<data.length;i++){
      eventsArray[i] = {
        title: data[i].OggettoTitolo,
        // url: '/agendadetail/id/'+data[i].AgendaId,
        // url: '/agendadetail/id/'+i,
        //url: '#',
        id: i,
        start: data[i].Data+'T'+data[i].OraInizio+':00',
        end: data[i].Data+'T'+data[i].OraFine+':00',
        eventAttachments: data[i].LinkAttachItems,
        eventBody: data[i].Body,
        eventTitle: data[i].OggettoTitolo,
        eventPlace: data[i].Luogo,
        eventDate: data[i].Data,
      }
    }
    // console.log(eventsArray);
    $('#calendar-agenda').fullCalendar({
      eventClick: function(eventObj) {
        //if (eventObj.url) {
          //window.location.href(eventObj.url);
          // console.log(app);
          //console.log(eventObj);
          // var app = new Framework7();
          var agendaItem = '';
          var eventID = eventObj.id;
          var body = eventObj.eventBody.replace(/<a href/gi, '<a class="link external" target="_system" href').replace(/\\/gi, '/');
          var day = eventObj.eventDate.substring(8,10);
          var month = getMonths(eventObj.eventDate.substring(5,7),1);
          var year = eventObj.eventDate.substring(0,4);
          var attachments = eventObj.eventAttachments;
          agendaItem += '<div class="card demo-card-header-pic">';
          agendaItem += '<div class="card-header text-align-left"><strong>'+eventObj.title+'</strong></div>';
          agendaItem += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+eventObj.eventPlace+'</span></div>';
          agendaItem += '<div class="card-footer"><a href="" class="link external"><i class="f7-icons">calendar_fill</i>&nbsp;Aggiungi al calendario</a></div>';
          agendaItem += '<div class="card-content card-content-padding text-align-justify">';
          agendaItem += '<p>'+body+'</p>';

          if(attachments.length > 0){
            agendaItem += '<div class="block-title">Allegati</div>';
            agendaItem += '<div class="list links-list"><ul>';
            for(i=0;i<attachments.length;i++){
              item = attachments[i];
              agendaItem += '<li><a href="http://'+item.LinkAttach.replace(/\\/gi,"/")+'" class="link external" target="_system">'+item.AttachName+'</a></li>';
            }
            agendaItem += '</ul></div>';
          }
          agendaItem += '</div>';
          agendaItem += '</div>';
          var dynamicPopup = page.app.popup.create({
            content: '<div class="popup">'+
                        '<div class="navbar">'+
                          '<div class="navbar-inner">'+
                            '<div class="title">Evento</div>'+
                            '<div class="right">'+
                              '<a class="link popup-close"><i class="f7-icons">close_round</i></a>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                        '<div class="block">'+
                        '<div strong class="text-align-justify" id="agendadetail-container"><div>'+agendaItem+'</div></div>'+
                        '</div>'+
                      '</div>',
          });
          // Open dynamic popup
          dynamicPopup.open();
          // $$('#agendadetail-block').html(agendaItem);
          // var pop = $$('#agenda-detail');
          // pop.open();
          return false; // prevents browser from following link in current tab.

        // }
        // else {
        //   alert('Clicked ' + eventObj.title);
        // }
      },
      defaultDate: yyyy+'-'+mm+'-'+dd,
      events: eventsArray,
      height: 'parent',
      footer: {
        left: 'today',
        center: '',
        right: 'month,agendaWeek,listMonth'
      },
      header: {
        left: 'prev ',
        center: 'title',
        right: 'next',
      },
    });
  });
};
// function agendaDetail(e,page){
//   Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Agenda/GetAgenda', {}, function (data) {
//     var agendaItem = '';
//     var eventID = page.route.params.id;
//     var body = data[eventID].Body.replace(/<a href/gi, '<a class="link external" target="_system" href');
//     var day = data[eventID].Data.substring(8,10);
//     var month = getMonths(data[eventID].Data.substring(5,7),1);
//     var year = data[eventID].Data.substring(0,4);
//     var attachments = data[eventID].LinkAttachItems;
//
//     agendaItem += '<div class="card demo-card-header-pic">';
//     agendaItem += '<div class="card-header text-align-left"><strong>'+data[eventID].OggettoTitolo+'</strong></div>';
//     agendaItem += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[eventID].Luogo+'</span></div>';
//     agendaItem += '<div class="card-content card-content-padding text-align-justify">';
//     agendaItem += '<p>'+body+'</p>';
//     agendaItem += '<p><a href="" class="link external"><i class="f7-icons">calendar_fill</i>&nbsp;Aggiungi al calendario</a></p>';
//
//     if(attachments.length > 0){
//       agendaItem += '<div class="block-title">Allegati</div>';
//       agendaItem += '<div class="list links-list"><ul>';
//       for(i=0;i<attachments.length;i++){
//         item = attachments[i];
//         agendaItem += '<li><a href="http://'+item.LinkAttach.replace(/\\/gi,"/")+'" class="link external" target="_system">'+item.AttachName+'</a></li>';
//       }
//       agendaItem += '</ul></div>';
//     }
//     agendaItem += '</div>';
//     agendaItem += '</div>';
//     $$('#agendadetail-loader').remove();
//     var news="";
//     $$('#agendadetail-container').html(agendaItem);
//   });
// };
