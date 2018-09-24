// Init F7 Vue Plugin
Framework7.use(Framework7Vue);

// Init Page Components
Vue.component('page-about', {
  template: '#page-about'
});
Vue.component('page-storia', {
  template: '#page-storia'
});
Vue.component('page-statuto', {
  template: '#page-statuto'
});
Vue.component('page-vertici', {
  template: '#page-vertici'
});
Vue.component('page-organi', {
  template: '#page-organi'
});
Vue.component('page-stampa', {
  template: '#page-stampa'
});
Vue.component('page-agenda', {
  template: '#page-agenda'
});
Vue.component('page-agendadetail', {
  template: '#page-agendadetail'
});
Vue.component('page-newsdetail', {
  template: '#page-newsdetail'
});
Vue.component('page-prodotti', {
  template: '#page-prodotti'
});
Vue.component('page-analisi', {
  template: '#page-analisi'
});
Vue.component('page-not-found', {
  template: '#page-not-found'
});

var $$ = Dom7;

// Init App
new Vue({
  el: '#app',
  data: function () {
    return {
      // Framework7 parameters here
      f7params: {
        root: '#app',
        id: 'io.framework7.testapp',
        name: 'ANCE beta',
        theme: 'md',
        removeElements: true,
        on: {
          pageInit: function (e,page){
            // console.log('home init');
            // console.log(page.route);
            Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Notizie/GetNotizie', {}, function (data) {
              var news="";
              for(i=0;i<data.length;i++){
                var day = data[i].DataDocumento.substring(8,10);
                var month = getMonths(data[i].DataDocumento.substring(5,7),1);
                var year = data[i].DataDocumento.substring(0,4);
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
                //news += '<div class="card-footer"><a href="/newsdetail/newsid/'+i+'" class="link">Approfondisci</a></div>';
                news += '</div>';
              }
              $$('#home-loader').remove();
              $$('#home-container').html(news);
            });
          },
        },
        // App routes
        routes: [
          {
            path: '/',
            component: 'home',
          },
          {
            path: '/newsdetail/newsid/:newsId',
            component: 'page-newsdetail',
            on: {
              pageAfterIn: function openAbout (e, page) {
                Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Notizie/GetNotizie', {}, function (data) {
                  var newsItem = '';
                  var newsID = page.route.params.newsId;
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
                  var news="";
                  $$('#newsdetail-container').html(newsItem);
                });
              },
            }
          },
          {
            path: '/about/',
            component: 'page-about',
            on: {
              pageAfterIn: function openAbout (e, page) {
                // Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetChiSiamo', { foo:'bar', id:5 }, function (data) {
                Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetChiSiamo', {}, function (data) {
                  $$('#about-container').html(data.Abstract);
                });
              },
            }
          },
          {
            path: '/storia/',
            component: 'page-storia',
            on: {
              pageAfterIn: function(e,page){
                openStory(e,page);
              }
            }
          },
          {
            path: '/statuto/',
            component: 'page-statuto',
            on: {
              pageAfterIn: function(e,page){
                openStatuto (e, page);
              }
            }
          },
          {
            path: '/vertici/',
            component: 'page-vertici',
            on: {
              pageAfterIn: function(e,page){
                openVertici (e, page);
              }
            }
          },
          {
            path: '/organi/',
            component: 'page-organi',
            on: {
              pageAfterIn: function(e,page){
                openOrgani (e, page);
              }
            }
          },
          {
            path: '/prodotti/',
            component: 'page-prodotti',
            on: {
              pageAfterIn: function openProdotti (e, page) {
                // Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetChiSiamo', { foo:'bar', id:5 }, function (data) {
                // Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetChiSiamo', {}, function (data) {
                //   $$('#prodotti-container').html(data.Abstract);
                // });

                console.log('Prodotti');
              },
            }
          },
          {
            path: '/analisi/',
            component: 'page-analisi',
            on: {
              pageAfterIn: function openAnalisi (e, page) {
                // Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetChiSiamo', { foo:'bar', id:5 }, function (data) {
                // Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetChiSiamo', {}, function (data) {
                //   $$('#prodotti-container').html(data.Abstract);
                // });

                console.log('Analisi');
              },
            }
          },
          {
            path: '/stampa/',
            component: 'page-stampa',
            on: {
              pageAfterIn: function openRassegna (e, page) {
                Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/Rassegna/GetRassegna', {}, function (data) {
                  var listitems = '';
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
                });
              },
            }
          },
          {
            path: '/agenda/',
            component: 'page-agenda',
            on: {
              pageAfterIn: function(e,page){
                openAgenda (e, page);
              }
            },
          },
          {
            path: '/agendadetail/id/:id',
            component: 'page-agendadetail',
            on: {
              pageAfterIn: function(e,page){
                agendaDetail (e, page);
              }
            },
          },
          {
            path: '/dynamic-route/blog/:blogId/post/:postId/',
            component: 'page-dynamic-routing'
          },
          {
            path: '(.*)',
            component: 'page-not-found',
          },
        ],
      }
    }
  },
});
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
