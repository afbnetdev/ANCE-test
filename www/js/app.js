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
Vue.component('page-dossierdetail',{
  template: '#page-dossierdetail'
});
Vue.component('page-agenda', {
  template: '#page-agenda'
});
// Vue.component('page-agendadetail', {
//   template: '#page-agendadetail'
// });
Vue.component('page-newsdetail', {
  template: '#page-newsdetail'
});
Vue.component('page-prodotti', {
  template: '#page-prodotti'
});
Vue.component('page-analisi', {
  template: '#page-analisi'
});
Vue.component('page-analisidetail', {
  template: '#page-analisidetail'
});
Vue.component('page-not-found', {
  template: '#page-not-found'
});
Vue.component('page-home', {
  template: '#main-view'
});

var $$ = Dom7;
// var app = new Framework7();
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
            getNews(e,page);
          },
        },
        // App routes
        routes: [
          {
            path: '/home/',
            component: 'page-home',
          },
          {
            path: '/newsdetail/newsid/:newsId',
            component: 'page-newsdetail',
            on: {
              pageAfterIn: function openAbout (e, page) {
                var newsID = page.route.params.newsId;
                getNewsDetail(e,page,newsID);
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
              pageAfterIn: function (e, page) {
                getAnalisi(e,page);
              },
            }
          },
          {
            path: '/analisidetail/analisiid/:analisiId',
            component: 'page-analisidetail',
            on: {
              pageAfterIn: function openAbout (e, page) {
                var analisiID = page.route.params.analisiId;
                getAnalisiDetail(e,page,analisiID);
              },
            }
          },
          {
            path: '/stampa/',
            component: 'page-stampa',
            on: {
              pageAfterIn: function openRassegna (e, page) {
                getRassegna(e,page);
                getDossierList(e,page);
              },
            }
          },
          {
            path: '/dossierdetail/dossierid/:dossierid',
            component: 'page-dossierdetail',
            on: {
              pageAfterIn: function openDossier (e, page) {
                var dossId = page.route.params.dossierid;
                console.log(dossId);
                getDossierDetail(e,page,dossId);
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
