function getGuide(e,page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Prodotti/GetProdotti/Guide', {}, function (data) {
    var listitems = '';
    for(i=0;i<data.length;i++){
      var day = (data[i].DataDocumento) ? data[i].DataDocumento.substring(8,10) : '00';
      var month = (data[i].DataDocumento) ? getMonths(data[i].DataDocumento.substring(5,7),1) : '00';
      var year = (data[i].DataDocumento) ? data[i].DataDocumento.substring(0,4) : '0000';
      listitems += '';
      listitems += '<div class="card demo-card-header-pic">';
      if(data[i].LinkImgIntestazione !=""){
        listitems += '<div style="background-image:url(http://'+data[i].LinkImgIntestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end"></div>';
      }
      listitems += '<div class="card-header text-align-left"><a href="/guidedetail/guideid/'+i+'" class="link"><strong>'+data[i].TitoloAnteprima+'</strong></a></div>';
      listitems += '<div class="card-content card-content-padding  text-align-justify">';
      listitems += '<p>'+data[i].Abstract+'</p>';
      listitems += '</div>';
      listitems += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[i].Titoletto+'</span></div>';
      listitems += '</div>';
    }
    $$('#guide-loader').remove();
    $$('#prodotti-guide').html(listitems);
  });
}
function getGuideDetail(e,page,iid){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Prodotti/GetProdotti/Guide', {}, function (data) {
    var newsItem = '';
    var guideID = iid;
    var body = data[guideID].Body.replace(/<a href/gi, '<a class="link external" target="_system" href');
    var intestazione = data[guideID].LinkImgIntestazione;
    var day = (data[guideID].DataDocumento) ? data[guideID].DataDocumento.substring(8,10) : '00';
    var month = (data[guideID].DataDocumento) ? getMonths(data[guideID].DataDocumento.substring(5,7),1) : '00';
    var year = (data[guideID].DataDocumento) ? data[guideID].DataDocumento.substring(0,4) : '0000';
    var privacyflag = data[guideID].FlagPrivacy;
    var privacytxt = data[guideID].TestoPrivacy;
    var attachments = data[guideID].LinkAttachItems;

    newsItem += '<div class="card demo-card-header-pic">';
    if(intestazione !=""){
      newsItem += '<div style="background-image:url(http://'+intestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end">'+data[guideID].Titoletto+'</div>';
    }
    newsItem += '<div class="card-header text-align-left"><strong>'+data[guideID].Titolo+'</strong></div>';
    newsItem += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[guideID].Titoletto+'</span></div>';
    newsItem += '<div class="card-content card-content-padding text-align-justify">';
    newsItem += '<p>'+body+'</p>';
    if(privacyflag){
      newsItem += '<p>'+privacytxt+'</p>';
    }
    if(attachments.length > 0){
      newsItem += '<div class="block-title">Allegati</div>';
      newsItem += '<div class="list links-list"><ul>';
      for(i=0;i<attachments.length;i++){
        item = attachments[i];
        newsItem += '<li><a href="http://'+item.LinkAttach.replace(/\\/gi,"/")+'" class="link external" target="_system">'+item.AttachName+'</a></li>';
      }
      newsItem += '</ul></div>';
    }
    newsItem += '</div>';
    newsItem += '</div>';
    $$('#guidedetail-loader').remove();
    var news="";
    $$('#guidedetail-container').html(newsItem);
  });
}
function getConvenzioni(e,page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Prodotti/GetProdotti/Convenzioni', {}, function (data) {
    var listitems = '';
    for(i=0;i<data.length;i++){
      var day = (data[i].DataDocumento) ? data[i].DataDocumento.substring(8,10) : '00';
      var month = (data[i].DataDocumento) ? getMonths(data[i].DataDocumento.substring(5,7),1) : '00';
      var year = (data[i].DataDocumento) ? data[i].DataDocumento.substring(0,4) : '0000';
      var compleDate = day+' '+month+' '+year;
      listitems += '';
      listitems += '<div class="card demo-card-header-pic">';
      if(data[i].LinkImgIntestazione !=""){
        listitems += '<div style="background-image:url(http://'+data[i].LinkImgIntestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end"></div>';
      }
      // listitems += '<div class="card-header text-align-left"><a href="/guidedetail/guideid/'+i+'" class="link"><strong>'+data[i].TitoloAnteprima+'</strong></a></div>';
      listitems += '<div class="card-header text-align-left"><strong>'+data[i].TitoloAnteprima+'</strong></div>';
      listitems += '<div class="card-content card-content-padding  text-align-justify">';
      if(data[i].Abstract){
        listitems += '<p>'+data[i].Abstract+'</p>';
      }
      if(data[i].LinkEsternoAnteprima){
        listitems += '<p><a href="'+data[i].LinkEsternoAnteprima+'" class="link external" target="_system">Anteprima</a></p>';
      }
      listitems += '</div>';
      listitems += '<div class="card-footer">'+ (compleDate != '00 00 0000' ? '<span class="text-align-left">'+compleDate+'</span>' : '' ) + '<span class="text-align-right">'+data[i].Titoletto+'</span></div>';
      listitems += '</div>';
    }
    $$('#convenzioni-loader').remove();
    $$('#prodotti-convenzioni').html(listitems);
  });
}
function getServizi(e,page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Prodotti/GetProdotti/Servizi', {}, function (data) {
    var listitems = '';
    for(i=0;i<data.length;i++){
      var day = (data[i].DataDocumento) ? data[i].DataDocumento.substring(8,10) : '00';
      var month = (data[i].DataDocumento) ? getMonths(data[i].DataDocumento.substring(5,7),1) : '00';
      var year = (data[i].DataDocumento) ? data[i].DataDocumento.substring(0,4) : '0000';
      var body = data[i].Body.replace(/<a href/gi, '<a class="link external" target="_system" href');
      var compleDate = day+' '+month+' '+year;
      listitems += '';
      listitems += '<div class="card demo-card-header-pic">';
      if(data[i].LinkImgIntestazione !=""){
        listitems += '<div style="background-image:url(http://'+data[i].LinkImgIntestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end"></div>';
      }
      // listitems += '<div class="card-header text-align-left"><a href="/guidedetail/guideid/'+i+'" class="link"><strong>'+data[i].TitoloAnteprima+'</strong></a></div>';
      listitems += '<div class="card-header text-align-left"><strong>'+data[i].TitoloAnteprima+'</strong></div>';
      listitems += '<div class="card-content card-content-padding  text-align-justify">';
      if(data[i].Abstract){
        listitems += '<p>'+data[i].Abstract+'</p>';
      }
      else if(data[i].Body){
        listitems += '<p>'+body+'</p>';
      }
      if(data[i].LinkEsternoAnteprima){
        listitems += '<p><a href="'+data[i].LinkEsternoAnteprima+'" class="link external" target="_system">Anteprima</a></p>';
      }
      listitems += '</div>';
      listitems += '<div class="card-footer">'+ (compleDate != '00 00 0000' ? '<span class="text-align-left">'+compleDate+'</span>' : '' ) + '<span class="text-align-right">'+data[i].Titoletto+'</span></div>';
      listitems += '</div>';
    }
    $$('#servizi-loader').remove();
    $$('#prodotti-servizi').html(listitems);
  });
}
