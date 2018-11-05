function getEventi(e,page){
  Framework7.request.json(endPointUrl+'/Eventi/GetEventi', {}, function (data) {
    var listitems="";
    var url = '/eventidetail/eventiid/';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], url+i);
    }
    $$('#eventi-loader').hide();
    $$('#eventi-container').html(listitems);
  });
}
function getEventiDetail(e,page,nid){
  Framework7.request.json(endPointUrl+'/Eventi/GetEventi', {}, function (data) {
    newsItem = newsDetail(data,nid);
    $$('#eventidetail-loader').remove();
    $$('#eventidetail-container').html(newsItem);
  });
}
