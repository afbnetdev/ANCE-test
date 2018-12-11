function getNewsHome(e,page){
  Framework7.request.json(endPointUrl+'/Notizie/GetContenutiHome', {}, function (data) {
    var listitems="";
    var newsitems="";
    var url = '/homepagenewsdetail/newsid/';
    var loopCtrl = false;
    for(i=0;i<data.length;i++){
      if(data[i].IdTipoContentuno != 9){
        listitems += newsBadgeHomeOnly(data[i], url+i);
      }
      if(data[i].IdTipoContentuno == 9 && !loopCtrl){
        //console.log(data[i].Titoletto);
        newsitems = data[i].Titoletto;
        loopCtrl = true;
      }
    }
    listitems += '<a class="link text-align-right ance-link txt-bold" href="/newsstream/"><i class="icon"></i><span>Visualizza tutte le notizie &raquo;</span></a>';
    $$('#home-list-container').html(listitems);
    $$('.ance-home-newsbox').html(newsitems);
    $$('#home-loader').remove();
  });
}
function getNews(e,page){
  Framework7.request.json(endPointUrl+'/Notizie/GetNotizie', {}, function (data) {
    var listitems="";
    var url = '/newsdetail/newsid/';
    for(i=0;i<data.length;i++){
      // listitems += newsBadge(data[i], url+i);
      listitems += newsBadgeHomeOnly(data[i], url+i);
    }
    $$('#newsstream-loader').remove();
    $$('#newsstream-container').html(listitems);
  });
}
function getNewsDetail(e,page,nid){
  Framework7.request.json(endPointUrl+'/Notizie/GetNotizie', {}, function (data) {
    newsItem = newsDetail(data,nid);
    $$('#newsdetail-loader').remove();
    $$('#newsdetail-container').html(newsItem);
  });
}
function getHomepageNewsDetail(e,page,nid){
  Framework7.request.json(endPointUrl+'/Notizie/GetContenutiHome', {}, function (data) {
    newsItem = newsDetail(data,nid);
    $$('#homepage-newsdetail-loader').remove();
    $$('#homepage-newsdetail-container').html(newsItem);
  });
}
function getFirstPage(){
  Framework7.request.json(endPointUrl+'/Telpress/GetTelpress', {}, function (data) {
    var listitems="";
    // var defList = "";
    for(i=0;i<data.length;i++){
        listitems += telpressBadgeHomeOnly(data[i]);
    }
    $$('#primapagina-loader').remove();
    $$('#primapagina-container').html(listitems);
  });
}
