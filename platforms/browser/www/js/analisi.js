function getAnalisi(e,page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Analisi/GetAnalisi', {}, function (data) {
    var analisi="";
    for(i=0;i<data.length;i++){
      var day = (data[i].DataDocumento) ? data[i].DataDocumento.substring(8,10) : '00';
      var month = (data[i].DataDocumento) ? getMonths(data[i].DataDocumento.substring(5,7),1) : '00';
      var year = (data[i].DataDocumento) ? data[i].DataDocumento.substring(0,4) : '00';
      analisi += '';
      analisi += '<div class="card demo-card-header-pic">';
      if(data[i].LinkImgIntestazione !=""){
        analisi += '<div style="background-image:url(http://'+data[i].LinkImgIntestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end"></div>';
      }
      analisi += '<div class="card-header text-align-left"><a href="/analisidetail/analisiid/'+i+'" class="link"><strong>'+data[i].TitoloAnteprima+'</strong></a></div>';
      analisi += '<div class="card-content card-content-padding  text-align-justify">';
      analisi += '<p>'+data[i].Abstract+'</p>';
      analisi += '</div>';
      analisi += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[i].Titoletto+'</span></div>';
      analisi += '</div>';
    }
    $$('#analisi-loader').remove();
    $$('#analisi-container').html(analisi);
  });
}
function getAnalisiDetail(e,page,nid){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Analisi/GetAnalisi', {}, function (data) {
    var analisiItem = '';
    var analisiID = nid;
    if(!data[analisiID].Body){
      var body = data[analisiID].Abstract.replace(/<a href/gi, '<a class="link external" target="_system" href')
    }
    // var body = (!data[analisiID].Body) ? data[analisiID].Abstract.replace(/<a href/gi, '<a class="link external" target="_system" href') : data[analisiID].Body.replace(/<a href/gi, '<a class="link external" target="_system" href');
    var intestazione = data[analisiID].LinkImgIntestazione;
    var day = (data[analisiID].DataDocumento) ? data[analisiID].DataDocumento.substring(8,10) : '00';
    var month = (data[analisiID].DataDocumento) ? getMonths(data[analisiID].DataDocumento.substring(5,7),1) : '00';
    var year = (data[analisiID].DataDocumento) ? data[analisiID].DataDocumento.substring(0,4) : '00';
    var privacyflag = data[analisiID].FlagPrivacy;
    var privacytxt = data[analisiID].TestoPrivacy;
    var attachments = data[analisiID].LinkAttachItems;

    analisiItem += '<div class="card demo-card-header-pic">';
    if(intestazione !=""){
      analisiItem += '<div style="background-image:url(http://'+intestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end">'+data[analisiID].Titoletto+'</div>';
    }
    analisiItem += '<div class="card-header text-align-left"><strong>'+data[analisiID].Titolo+'</strong></div>';
    analisiItem += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[analisiID].Titoletto+'</span></div>';
    analisiItem += '<div class="card-content card-content-padding text-align-justify">';
    analisiItem += '<p>'+body+'</p>';
    if(privacyflag){
      analisiItem += '<p>'+privacytxt+'</p>';
    }
    if(attachments.length > 0){
      analisiItem += '<div class="block-title">Allegati</div>';
      analisiItem += '<div class="list links-list"><ul>';
      for(i=0;i<attachments.length;i++){
        item = attachments[i];
        analisiItem += '<li><a href="http://'+item.LinkAttach.replace(/\\/gi,"/")+'" class="link external" target="_system">'+item.AttachName+'</a></li>';
      }
      analisiItem += '</ul></div>';
    }
    analisiItem += '</div>';
    analisiItem += '</div>';
    $$('#analisidetail-loader').remove();
    $$('#analisidetail-container').html(analisiItem);
  });
}
