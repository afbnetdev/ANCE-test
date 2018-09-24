function openAgenda(e,page){
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
        url: '/agendadetail/id/'+i,
        start: data[i].Data+'T'+data[i].OraInizio+':00',
        end: data[i].Data+'T'+data[i].OraFine+':00',
      }
    }
    // console.log(eventsArray);
    $('#calendar-agenda').fullCalendar({
      eventClick: function(eventObj) {
        if (eventObj.url) {
          //window.location.href(eventObj.url);
          return false; // prevents browser from following link in current tab.
        }
        else {
          alert('Clicked ' + eventObj.title);
        }
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
function agendaDetail(e,page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Agenda/GetAgenda', {}, function (data) {
    var agendaItem = '';
    var eventID = page.route.params.id;
    var body = data[eventID].Body.replace(/<a href/gi, '<a class="link external" target="_system" href');
    var day = data[eventID].Data.substring(8,10);
    var month = getMonths(data[eventID].Data.substring(5,7),1);
    var year = data[eventID].Data.substring(0,4);
    var attachments = data[eventID].LinkAttachItems;

    agendaItem += '<div class="card demo-card-header-pic">';
    agendaItem += '<div class="card-header text-align-left"><strong>'+data[eventID].OggettoTitolo+'</strong></div>';
    agendaItem += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[eventID].Luogo+'</span></div>';
    agendaItem += '<div class="card-content card-content-padding text-align-justify">';
    agendaItem += '<p>'+body+'</p>';
    agendaItem += '<p><a href="" class="link external"><i class="f7-icons">calendar_fill</i>&nbsp;Aggiungi al calendario</a></p>';

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
    $$('#agendadetail-loader').remove();
    var news="";
    $$('#agendadetail-container').html(agendaItem);
  });
};
