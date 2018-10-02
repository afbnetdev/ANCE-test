function getRassegna(e, page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Rassegna/GetRassegna', {}, function (data) {
    var listitems = '';
    // console.log(data);
    for(i=0;i<data.length;i++){
      var day = data[i].DataRassegna.substring(8,10);
      var month = getMonths(data[i].DataRassegna.substring(5,7),1);
      var year = data[i].DataRassegna.substring(0,4);
      //listitems += '';
      listitems += '<li><div class="item-content"><div class="item-media"><i class="f7-icons">collection</i></div><div class="item-inner">';
      listitems += '<div class="item-title"><div class="item-header">'+day+' '+month+' '+year+'</div>'+data[i].DescRassegna+'</div>';
      // listitems += '<div class="item-after"><a href="javascript:void(0);" onclick="window.open(\'http://'+data[i].PathRassegna.replace(/\\/gi,"/")+'\', \'_system\');"><i class="f7-icons">info_fill</i></a></div>';
      listitems += '<div class="item-after"><a href="http://'+data[i].PathRassegna+'" target="_system" class="link external"><i class="f7-icons">info_fill</i></a></div>';
      listitems += '</div></div></li>';
      //listitems += '</a>';
    }
    $$('#rassegna-loader').remove();
    $$('#list-rassegna').html(listitems);
    //return listitems;
  });
}

function getDossierList(e, page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Stampa/GetDossier', {}, function (data) {
    var listitems = '';
    // console.log(data);
    for(i=0;i<data.length;i++){
      var day = data[i].DataDocumento.substring(8,10);
      var month = getMonths(data[i].DataDocumento.substring(5,7),1);
      var year = data[i].DataDocumento.substring(0,4);
      listitems += '';
      listitems += '<div class="card demo-card-header-pic">';
      if(data[i].LinkImgIntestazione !=""){
        listitems += '<div style="background-image:url(http://'+data[i].LinkImgIntestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end"></div>';
      }
      listitems += '<div class="card-header text-align-left"><a href="/dossierdetail/dossierid/'+i+'" class="link"><strong>'+data[i].TitoloAnteprima+'</strong></a></div>';
      listitems += '<div class="card-content card-content-padding  text-align-justify">';
      listitems += '<p>'+data[i].Abstract+'</p>';
      listitems += '</div>';
      listitems += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[i].Titoletto+'</span></div>';
      listitems += '</div>';
      //listitems += '</a>';
    }
    $$('#dossier-loader').remove();
    $$('#list-dossier').html(listitems);
    //return listitems;

  });
  // var output = [];
  // Framework7.request({
  //   url: 'http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Stampa/GetDossier',
  //   async: true,
  //   method: 'GET',
  //   dataType: 'json',
  //   success: function (data, status, xhr){
  //     //output = data;
  //     for(i=0;i<data.length;i++){
  //       // console.log(data[i].DataDocumento);
  //       output[i] = data[i];
  //     }
  //     //output.push(data);
  // 	   // console.log(data);
  //   },
  // });
  // console.log(output);
}
function getDossierDetail(e,page,id){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Stampa/GetDossier', {}, function (data) {
    var newsItem = '';
    var newsID = id;
    console.log(newsID);
    var body = data[newsID].Body.replace(/<a href/gi, '<a class="link external" target="_system" href');
    var intestazione = data[newsID].LinkImgIntestazione;
    var day = data[newsID].DataDocumento.substring(8,10);
    var month = getMonths(data[newsID].DataDocumento.substring(5,7),1);
    var year = data[newsID].DataDocumento.substring(0,4);
    var privacyflag = data[newsID].FlagPrivacy;
    var privacytxt = data[newsID].TestoPrivacy;
    var attachments = data[newsID].LinkAttachItems;

    newsItem += '<div class="card demo-card-header-pic">';
    if(intestazione !=""){
      newsItem += '<div style="background-image:url(http://'+intestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end">'+data[newsID].Titoletto+'</div>';
    }
    newsItem += '<div class="card-header text-align-left"><strong>'+data[newsID].Titolo+'</strong></div>';
    newsItem += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[newsID].Titoletto+'</span></div>';
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
    $$('#dossierdetail-loader').remove();
    var news="";
    $$('#dossierdetail-container').html(newsItem);
  });
}
