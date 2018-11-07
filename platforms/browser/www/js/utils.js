function newsBadge(data, url){
  // console.log(Date.now());
  var day = (data.DataDocumento) ? data.DataDocumento.substring(8,10) : '00';
  var month = (data.DataDocumento) ? getMonths(data.DataDocumento.substring(5,7),1) : '00';
  var year = (data.DataDocumento) ? data.DataDocumento.substring(0,4) : '0000';
  var compleDate = day+' '+month+' '+year;
  var item = '';
  if(data.LinkEsternoAnteprima && data.LinkEsternoAnteprima!=""){
    item += '<a href="'+data.LinkEsternoAnteprima+'" class="link external" target="_system">';
  }
  else if(url!=""){
    item += '<a href="'+url+'" class="link">';
  }
  item += '<div class="card demo-card-header-pic">';
  if(data.LinkImgAnteprima && data.LinkImgAnteprima !=""){
    item += '<div style="background-image:url('+data.LinkImgAnteprima.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end"></div>';
  }
  if(data.Titoletto && data.Titoletto!=''){
    item += '<div class="card-footer"><span class="text-align-right">'+data.Titoletto+'</span></div>';
  }

  item += '<div class="card-header text-align-left"><strong>'+data.TitoloAnteprima+'</strong></div>';

  if(data.Abstract && data.Abstract!=''){
    item += '<div class="card-content card-content-padding txt-black text-align-justify">';
    item += '<p class="txt-black">'+data.Abstract+'</p>';
    item += '</div>';
  }
  if(data.DataDocumento && data.DataDocumento != ''){
    item += '<div class="card-footer">'+ (compleDate != '00 00 0000' ? '<span class="text-align-left">'+compleDate+'</span>' : '' ) + '</div>';
  }
  item += '</div>';
  if((data.LinkEsternoAnteprima && data.LinkEsternoAnteprima!="") || url!=""){
    item += '</a>';
  }
  return item;
}
function newsDetail(data,guideID){
  // console.log(guideID);
  var newsItem = '';
  var intestazione = (data[guideID].LinkImgIntestazione && data[guideID].LinkImgIntestazione!="") ? data[guideID].LinkImgIntestazione : '';
  var day = (data[guideID].DataDocumento) ? data[guideID].DataDocumento.substring(8,10) : '00';
  var month = (data[guideID].DataDocumento) ? getMonths(data[guideID].DataDocumento.substring(5,7),1) : '00';
  var year = (data[guideID].DataDocumento) ? data[guideID].DataDocumento.substring(0,4) : '0000';
  var compleDate = day+' '+month+' '+year;
  var privacyflag = data[guideID].FlagPrivacy;
  var privacytxt = data[guideID].TestoPrivacy;
  var attachments = data[guideID].LinkAttachItems;
  //body construction
  if(data[guideID].Body){
    body = data[guideID].Body.replace(/<a href/gi, '<a class="link external" target="_system" href');
  }
  else if (data[guideID].Abstract) {
    body = data[guideID].Abstract;
  }
  else{
    body = '';
  }
  var body = (data[guideID].Body) ? data[guideID].Body.replace(/<a href/gi, '<a class="link external" target="_system" href') : '';

  newsItem += '<div class="card demo-card-header-pic">';
  if(intestazione !=""){
    // console.log(intestazione);
    newsItem += '<div style="background-image:url(http://'+intestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end">'+data[guideID].Titoletto+'</div>';
    // newsItem += '<div style="background-image:url('+intestazione.replace(/\\/gi,"/")+')" class="card-header card-header-pic align-items-flex-end">'+data[guideID].Titoletto+'</div>';
  }
  newsItem += '<div class="card-header text-align-left"><strong>'+data[guideID].Titolo+'</strong></div>';
  newsItem += '<div class="card-footer">'+ (compleDate != '00 00 0000' ? '<span class="text-align-left">'+compleDate+'</span>' : '' ) + ' <span class="text-align-right">'+data[guideID].Titoletto+'</span></div>';
  newsItem += '<div class="card-content card-content-padding text-align-justify">';
  newsItem += '<p>'+body+'</p>';
  if(privacyflag){
    newsItem += '<p>'+privacytxt+'</p>';
  }
  if(attachments && attachments.length > 0){
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
  return newsItem;
}
function inAppBrowser(url){
  var ref = window.open(url, '_blank', 'location=no');
}
/**
  2018-09-15
  Lorenzo Lombardi l.lombardi@afbnet.it
  Numeric months to Italian
  @integer num : numeric expression of the month
  @integer len: 0 (default) for short version, 1 for long, 2 return fullist
*/
function getMonths(num, len=0){
  //var month = ['','Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  var month = ['','Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'];
  var longmonth = ['','Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  var m = '';
  switch(len){
    case 0:
    m = month[Math.floor(num)];
    break;
    case 1:
    m = longmonth[Math.floor(num)];
    break;
    case 2:
    longmonth.shift();
    m = longmonth;
    break;
  }
  return m;
}
function QueryStringToJSON(query) {
	var pairs = query.slice(1).split('&');
	var result = {};
	pairs.forEach(function(pair) {
		pair = pair.split('=');
		result[pair[0]] = decodeURIComponent(pair[1] || '');
	});
	return JSON.parse(JSON.stringify(result));
}
