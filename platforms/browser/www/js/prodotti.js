function getGuide(e,page){
  Framework7.request.json(endPointUrl+'/PerLeImprese/Get/Guide', {}, function (data) {
    var listitems = '';
    var url = '/guidedetail/guideid/';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], url+i);
    }
    $$('#guide-loader').remove();
    $$('#prodotti-guide').html(listitems);
  });
}
function getGuideDetail(e,page,iid){
  Framework7.request.json(endPointUrl+'PerLeImprese/Get/Guide', {}, function (data) {
    newsItem = newsDetail(data,iid);
    $$('#guidedetail-loader').remove();
    var news="";
    $$('#guidedetail-container').html(newsItem);
  });
}
function getConvenzioni(e,page){
  Framework7.request.json(endPointUrl+'/PerLeImprese/Get/Convenzioni', {}, function (data) {
    var listitems = '';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], '');
    }
    $$('#convenzioni-loader').remove();
    $$('#prodotti-convenzioni').html(listitems);
  });
}
function getProdotti(e,page){
  Framework7.request.json(endPointUrl+'/PerLeImprese/Get/Prodotti', {}, function (data) {
    var listitems = '';
    for(i=0;i<data.length;i++){
      listitems += newsBadge(data[i], '');
    }
    $$('#prodotti-loader').remove();
    $$('#prodotti-prodotti').html(listitems);
  });
}
