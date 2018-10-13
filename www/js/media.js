function getRassegna(e, page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Media/GetRassegna', {}, function (data) {
    var listitems = '';
    for(i=0;i<data.length;i++){
      var day = data[i].DataRassegna.substring(8,10);
      var month = getMonths(data[i].DataRassegna.substring(5,7),1);
      var year = data[i].DataRassegna.substring(0,4);
      listitems += '<li><div class="item-content"><div class="item-media"><i class="f7-icons">collection</i></div><div class="item-inner">';
      listitems += '<div class="item-title"><div class="item-header">'+day+' '+month+' '+year+'</div>'+data[i].DescRassegna+'</div>';
      listitems += '<div class="item-after"><a href="http://'+data[i].PathRassegna+'" target="_system" class="link external"><i class="f7-icons">info_fill</i></a></div>';
      listitems += '</div></div></li>';
    }
    $$('#rassegna-loader').remove();
    $$('#list-rassegna').html(listitems);
  });
}

function getDossierList(e, page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Media/GetDossier', {}, function (data) {
    var listitems="";
    var url = '/dossierdetail/dossierid/';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], url+i);
    }
    $$('#dossier-loader').remove();
    $$('#list-dossier').html(listitems);
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
    newsItem = newsDetail(data,nid);
    $$('#dossierdetail-loader').remove();
    $$('#dossierdetail-container').html(newsItem);
  });
}