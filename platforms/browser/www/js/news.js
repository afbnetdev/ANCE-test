function getNews(e,page){
  Framework7.request.json(endPointUrl+'/Notizie/GetNotizie', {}, function (data) {
    var listitems="";
    var url = '/newsdetail/newsid/';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], url+i);
    }
    $$('#home-loader').remove();
    $$('#home-container').html(listitems);
  });
}
function getNewsDetail(e,page,nid){
  Framework7.request.json(endPointUrl+'/Notizie/GetNotizie', {}, function (data) {
    newsItem = newsDetail(data,nid);
    $$('#newsdetail-loader').remove();
    $$('#newsdetail-container').html(newsItem);
  });
}
