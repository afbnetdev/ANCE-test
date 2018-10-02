function getNews(e,page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Notizie/GetNotizie', {}, function (data) {
    var news="";
    for(i=0;i<data.length;i++){
      var day = (data[i].DataDocumento) ? data[i].DataDocumento.substring(8,10) : '00';
      var month = (data[i].DataDocumento) ? getMonths(data[i].DataDocumento.substring(5,7),1) : '00';
      var year = (data[i].DataDocumento) ? data[i].DataDocumento.substring(0,4) : '00';
      news += '';
      news += '<div class="card demo-card-header-pic">';
      if(data[i].LinkImgIntestazione !=""){
        news += '<div style="background-image:url(http://'+data[i].LinkImgIntestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end"></div>';
      }
      news += '<div class="card-header text-align-left"><a href="/newsdetail/newsid/'+i+'" class="link"><strong>'+data[i].TitoloAnteprima+'</strong></a></div>';
      news += '<div class="card-content card-content-padding  text-align-justify">';
      news += '<p>'+data[i].Abstract+'</p>';
      news += '</div>';
      news += '<div class="card-footer"><span class="text-align-left">'+day+' '+month+' '+year+'</span> <span class="text-align-right">'+data[i].Titoletto+'</span></div>';
      news += '</div>';
    }
    $$('#home-loader').remove();
    $$('#home-container').html(news);
  });
}
function getNewsDetail(e,page,nid){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Notizie/GetNotizie', {}, function (data) {
    var newsItem = '';
    var newsID = nid;
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
    $$('#newsdetail-loader').remove();
    $$('#newsdetail-container').html(newsItem);
  });
}
