function getAnalisi(e,page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/PerIlSettore/Get/Analisi', {}, function (data) {
    var listitems="";
    var url = '/analisidetail/analisiid/';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], url+i);
    }
    $$('#analisi-loader').remove();
    $$('#settore-analisi').html(listitems);
  });
}
function getPosizioni(e,page){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/PerIlSettore/Get/Posizioni', {}, function (data) {
    var listitems="";
    var url = '/posizionidetail/posizioniid/';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], url+i);
    }
    $$('#posizioni-loader').remove();
    $$('#settore-posizioni').html(listitems);
  });
}
function getAnalisiDetail(e,page,nid){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/PerIlSettore/Get/Analisi', {}, function (data) {
    newsItem = newsDetail(data,nid);
    $$('#analisidetail-loader').remove();
    $$('#analisidetail-container').html(newsItem);
  });
}
function getPosizioniDetail(e,page,nid){
  Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/PerIlSettore/Get/Posizioni', {}, function (data) {
    newsItem = newsDetail(data,nid);
    $$('#posizionidetail-loader').remove();
    $$('#posizionidetail-container').html(newsItem);
  });
}
