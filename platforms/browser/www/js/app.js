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
Vue.component('page-eventidetail', {
  template: '#page-eventidetail'
});
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
var fileSettings = 'app-settings.txt';
var fileNewsQueue = 'app-news.txt';

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
            // console.log(e);
            getNews(e,page);
            var ptrhome = e.app.ptr.get(".home-page-ptr > .ptr-content");
            // console.log(ptrhome);
            if(ptrhome){
              ptrhome.on('refresh', function (e) {
                getNews(e, page);
                ptrhome.done();
              });
            }
          },
          pageAfterIn: function (e,page){
          },
          formAjaxSuccess: function(formEl, data, xhr){
            // console.log(data);
            // console.log(formEl);
            var a = QueryStringToJSON('?'+data);
            //write settigns to a file
            setPersistentFile(fileSettings, JSON.stringify(a));
            //reset session items
            setSettingsMemory(a);
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
                getPersistentFile(fileSettings, function(data){
                  fileContent = data;
                  // console.log(fileContent);
                  if(data==''){
                    obj = getDefaultSettings();
                  }
                  else{
                    obj = JSON.parse(data);
                  }
                  var n_enable = page.app.toggle.get('#n_enable');
                  // var n_vibrate = page.app.toggle.get('#n_vibrate');
                  var n_frequency = page.app.smartSelect.get('#n_frequency a');
                  // var n_color = page.app.smartSelect.get('#n_color a');
                  if((!obj["n_enable[]"] && n_enable.checked) || (obj["n_enable[]"] && obj["n_enable[]"]=='on' && !n_enable.checked ) ){
                    n_enable.toggle();
                  }
                  // if((!obj["n_vibrate[]"] && n_vibrate.checked) || (obj["n_vibrate[]"] && obj["n_vibrate[]"]=='on' && !n_vibrate.checked ) ){
                  //   n_vibrate.toggle();
                  // }
                  //change smart select values
                  $$('select[name="n_frequency"] option[value="'+obj["n_frequency"]+'"]').prop('selected',true);
                  // $$('select[name="n_color"] option[value="'+obj["n_color"]+'"]').prop('selected',true);
                  //change displayed value
                  n_frequency.setValue(obj["n_frequency"]);
                  // n_color.setValue(obj["n_color"]);
                  //change radio button value on radio list popups
                  n_frequency.on('open', function(){
                    var colorInput = $$('input[name="'+n_frequency.inputName+'"][value="'+obj["n_frequency"]+'"]').prop('checked',true);
                  });
                  // n_color.on('open', function(){
                  //   var colorInput = $$('input[name="'+n_color.inputName+'"][value="'+obj["n_color"]+'"]').prop('checked',true);
                  // });

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
                var ptr1 = page.app.ptr.get(".guide-ptr > .ptr-content");
                if(ptr1){
                  ptr1.on('refresh', function (e) {
                    getGuide(e,page);
                    ptr1.done();
                  });
                }
                var ptr2 = page.app.ptr.get(".convenzioni-ptr > .ptr-content");
                if(ptr2){
                  ptr2.on('refresh', function (e) {
                    getConvenzioni (e, page);
                    ptr2.done();
                  });
                }
                var ptr3 = page.app.ptr.get(".prodotti-ptr > .ptr-content");
                if(ptr3){
                  ptr3.on('refresh', function (e) {
                    getProdotti (e, page);
                    ptr3.done();
                  });
                }
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

                var ptrset1 = page.app.ptr.get(".posizioni-ptr > .ptr-content");
                ptrset1.on('refresh', function (e) {
                  getPosizioni (e, page);
                  ptrset1.done();
                });
                var ptrset2 = page.app.ptr.get(".analisi-ptr > .ptr-content");
                ptrset2.on('refresh', function (e) {
                  getAnalisi (e, page);
                  ptrset2.done();
                });
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
                var ptrmedia = page.app.ptr.get(".dossier-ptr .ptr-content");
                if(ptrmedia){
                  ptrmedia.on('refresh', function (e) {
                    getDossierList (e, page);
                    ptrmedia.done();
                  });
                }
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
                var ptrevent = page.app.ptr.get(".eventi-page-ptr > .ptr-content");
                if(ptrevent){
                  ptrevent.on('refresh', function (e) {
                    // console.log(page.app.ptr);
                    getEventi (e, page);
                    ptrevent.done();
                  });
                }
              }
            },
          },
          {
            path: '/eventidetail/eventiid/:eventiid',
            component: 'page-eventidetail',
            on: {
              pageAfterIn: function(e,page){
                var eventId = page.route.params.eventiid;
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

  //get app settings and set them to session
  //if nothing has been written before I get the default settings
  getPersistentFile(fileSettings, function(data){
    var sets;
    if(data==''){
      sets = getDefaultSettings();
    }
    else{
      sets = JSON.parse(data);
    }
    // console.log(sets);
    //define session variable
    setSettingsMemory(sets);
    // b = window.sessionStorage.getItem('n_color');
    // console.log(b);
  });
  //notification scheduler
  var readNews;
  getPersistentFile(fileNewsQueue, function(data){
    //get app settings
    var readNews;
    // console.log('News already read');
    // console.log(data);
    if(data!=''){
      readNews = JSON.parse(data);
    }
    var newsOutput={};
    Framework7.request({
      url: endPointUrl+'/Contenuti/GetAll',
      async: true,
      method: 'GET',
      dataType: 'json',
      success: function (data, status, xhr){
        //output = data;
        var counter = 0;
        for(i=0;i<data.length;i++){
          // console.log(data[i].FlagNotificaPush);
          // output[i] = data[i];
          if(!data[i].FlagNotificaPush){
            newsOutput[counter] = data[i];
            counter = counter+1;
          }
        }
  	    // console.log(data);
        // console.log("News to be notified:");
        // console.log(newsOutput);
        var notifications = [];
        //cheks wheter we have an array of read news since now
        setNotificationEngine(newsOutput,readNews);
        //set loop over 1 day
        setTimeout(function(){
          setNotificationEngine(newsOutput,readNews);
        }, 24*3600*1000 );
      },
    });
    // console.log(newsOutput);
    //getTimeOut(newsOutput,readNews);
    // console.log(newsOutput);
    // console.log(newsOutput);
    // console.log(Object.getOwnPropertyNames(newsOutput));
    // console.log(Object.keys(newsOutput));
    //alert(newsOutput);
    // var notifications = [];
    // for (var k in newsOutput) {
    //   console.log(k);
    // //for(i=0;i<newsOutput.length;i++){
    //   var notifyMe = true;
    //   if (newsOutput.hasOwnProperty(k)) {
    //     console.log(newsOutput[k]);
    //     for(j=0;j<readNews.length;j++){
    //       if( newsOutput[k].IdContentuno == readNews[j].newsId ){
    //         notifyMe = false;
    //       }
    //     }
    //   }
    //   if(!notifyMe){
    //     console.log('can can can');
    //     notifications.push(newsOutput[k]);
    //   }
    // }
  });
  // cordova.plugins.notification.local is now available



}, false);
