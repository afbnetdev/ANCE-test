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
Vue.component('page-media', {
  template: '#page-media'
});
Vue.component('page-mediadetail', {
  template: '#page-mediadetail'
});
Vue.component('page-dossierdetail',{
  template: '#page-dossierdetail'
});
Vue.component('page-eventi', {
  template: '#page-eventi'
});
// Vue.component('page-eventidetail', {
//   template: '#page-eventidetail'
// });
Vue.component('page-newsdetail', {
  template: '#page-newsdetail'
});
Vue.component('page-per-le-imprese', {
  template: '#page-imprese'
});
Vue.component('page-settore', {
  template: '#page-settore'
});
Vue.component('page-analisidetail', {
  template: '#page-analisidetail'
});
Vue.component('page-posizionidetail', {
  template: '#page-posizionidetail'
});
Vue.component('page-guidedetail', {
  template: '#page-guidedetail'
});
Vue.component('page-not-found', {
  template: '#page-not-found'
});
Vue.component('page-settings', {
  template: '#page-settings'
});
Vue.component('page-settingsdata', {
  template: '#page-settingsdata'
});
Vue.component('page-home', {
  template: '#main-view'
});

var $$ = Dom7;
var endPointUrl = 'http://serviceappsvil.ance.it:26031/ServiceAppAnce.svc';
var fileSettings = 'notification-settings.txt';

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
          formAjaxSuccess: function(formEl, data, xhr){
            // console.log(data);
            // console.log(formEl);
            var a = QueryStringToJSON('?'+data);
            setPersistentFile('app-settings.txt', JSON.stringify(a));
          },
        },
        // App routes
        routes: [
          {
            path: '/home/',
            component: 'page-home',
          },
          {
            path: '/settings/',
            component: 'page-settings',
            on: {

              pageAfterIn: function(e,page){
                var fileContent = '';
                getPersistentFile('app-settings.txt', function(data){
                  fileContent = data;
                  // console.log(fileContent);
                  obj = JSON.parse(data);
                  var n_enable = page.app.toggle.get('#n_enable');
                  var n_vibrate = page.app.toggle.get('#n_vibrate');
                  var n_interval = page.app.smartSelect.get('#n_interval a');
                  var n_frequency = page.app.smartSelect.get('#n_frequency a');
                  var n_color = page.app.smartSelect.get('#n_color a');
                  if((!obj["n_enable[]"] && n_enable.checked) || (obj["n_enable[]"] && obj["n_enable[]"]=='on' && !n_enable.checked ) ){
                    n_enable.toggle();
                  }
                  if((!obj["n_vibrate[]"] && n_vibrate.checked) || (obj["n_vibrate[]"] && obj["n_vibrate[]"]=='on' && !n_vibrate.checked ) ){
                    n_vibrate.toggle();
                  }
                  //change smart select values
                  $$('select[name="n_interval"] option[value="'+obj["n_interval"]+'"]').prop('selected',true);
                  $$('select[name="n_frequency"] option[value="'+obj["n_frequency"]+'"]').prop('selected',true);
                  $$('select[name="n_color"] option[value="'+obj["n_color"]+'"]').prop('selected',true);
                  //change displayed value
                  n_interval.setValue(obj["n_interval"]);
                  n_frequency.setValue(obj["n_frequency"]);
                  n_color.setValue(obj["n_color"]);
                  //change radio button value on radio list popups
                  n_interval.on('open', function(){
                    var colorInput = $$('input[name="'+n_color.inputName+'"][value="'+obj["n_interval"]+'"]').prop('checked',true);
                  });
                  n_frequency.on('open', function(){
                    var colorInput = $$('input[name="'+n_color.inputName+'"][value="'+obj["n_frequency"]+'"]').prop('checked',true);
                  });
                  n_color.on('open', function(){
                    var colorInput = $$('input[name="'+n_color.inputName+'"][value="'+obj["n_color"]+'"]').prop('checked',true);
                  });

                });
              }
            },
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
                Framework7.request.json(endPointUrl+'/SistemaAnce/GetChiSiamo', {}, function (data) {
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
            path: '/per-le-imprese/',
            component: 'page-per-le-imprese',
            on: {
              pageAfterIn: function (e, page) {
                getGuide(e,page);
                getConvenzioni(e,page);
                getProdotti(e,page);
              },
            }
          },
          {
            path: '/guidedetail/guideid/:guideId',
            component: 'page-guidedetail',
            on: {
              pageAfterIn: function openGuidedetail (e, page) {
                var guideID = page.route.params.guideId;
                getGuideDetail(e,page,guideID);
              },
            }
          },
          {
            path: '/settore/',
            component: 'page-settore',
            on: {
              pageAfterIn: function (e, page) {
                getAnalisi(e,page);
                getPosizioni(e,page);
              },
            }
          },
          {
            path: '/posizionidetail/posizioniid/:posizioniId',
            component: 'page-posizionidetail',
            on: {
              pageAfterIn: function openAbout (e, page) {
                var posizioniID = page.route.params.posizioniId;
                getPosizioniDetail(e,page,posizioniID);
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
            path: '/media/',
            component: 'page-media',
            on: {
              pageAfterIn: function openRassegna (e, page) {
                getRassegna(e,page);
                getDossierList(e,page);
              },
            }
          },
          {
            path: '/mediadetail/mediaid/:mediaid',
            component: 'page-mediadetail',
            on: {
              pageAfterIn: function openRassegna (e, page) {
                var mediaid = page.route.params.mediaid;
                getMediaDetail(e,page,mediaid);
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
            path: '/eventi/',
            component: 'page-eventi',
            on: {
              pageAfterIn: function(e,page){
                getEventi (e, page);
              }
            },
          },
          {
            path: '/eventidetail/id/:id',
            component: 'page-eventidetail',
            on: {
              pageAfterIn: function(e,page){
                var eventId = page.route.params.id;
                getEventiDetail (e, page, eventId);
              }
            },
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


// var app = new Framework7();
// app.on('formAjaxSuccess', function (formEl, data, xhr) {
//   console.log(data);
// });
document.addEventListener('deviceready', function () {
    // cordova.plugins.notification.local is now available
    cordova.plugins.notification.local.hasPermission(function (granted) {
      //alert('Permission ' + granted);
      if(granted){
        alert('ok, grant');
        // cordova.plugins.notification.local.schedule({
        //     title: 'My first notification',
        //     text: 'Thats pretty easy...',
        //     foreground: true
        // });
        cordova.plugins.notification.local.schedule([
            { id: 1, title: 'My first notification' },
            { id: 2, title: 'My second notification' },
            { id: 1, title: 'My third notification with same id' }
        ]);

        setTimeout(function(){
          cordova.plugins.notification.local.schedule([
              { id: 1, title: 'My fourth notification with same id #1' }
          ]);
        },10000);
      }
  });
}, false);
