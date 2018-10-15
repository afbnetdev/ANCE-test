function getEventi(e,page){
  Framework7.request.json(endPointUrl+'/Eventi/GetEventi', {}, function (data) {
    var listitems="";
    // var url = '/eventidetail/eventiid/';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], '');
    }
    $$('#eventi-loader').remove();
    $$('#eventi-container').html(listitems);
  });
}
// function getEventiDetail(e,page,nid){
//   Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Eventi/GetEventi', {}, function (data) {
//     newsItem = newsDetail(data,nid);
//     $$('#eventidetail-loader').remove();
//     $$('#eventidetail-container').html(newsItem);
//   });
// }
