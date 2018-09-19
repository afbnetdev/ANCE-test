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
Vue.component('page-rassegna', {
  template: '#page-rassegna'
});
// Vue.component('page-agenda', {
//   template: '#page-agenda'
// });
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
        root: '#app', // App root element
        id: 'io.framework7.testapp', // App bundle ID
        name: 'ANCE beta', // App name
        theme: 'md', // Automatic theme detection
        // App routes
        routes: [
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
              pageAfterIn: function openStory (e, page) {
                Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetStoria', {}, function (data) {
                  //$$('#story-container').html(data);
                  // console.log(data[0]);
                  var presidenti='';
                  var direttori='';
                  for(i=0;i<data.length;i++){
                    var dsDay = data[i].DataInizio.substring(3,5);
                    var dsMonth = getMonths(data[i].DataInizio.substring(0,2),0);
                    var dsYear = data[i].DataInizio.substring(6,10);
                    var deDay = data[i].DataFine.substring(3,5);
                    var deMonth = getMonths(data[i].DataFine.substring(0,2),0);
                    var deYear = data[i].DataFine.substring(6,10);
                    if(data[i].IdVerticeRaggruppamento == 6){
                      // console.log(data[i].IdVerticeRaggruppamento);
                      presidenti += '<div class="timeline-item">'
                      //presidenti += '<div class="timeline-item-date"></div>';
                      presidenti += '<div class="timeline-item-date">da '+dsMonth+' '+dsYear + ( data[i].DataFine != '' ? ' a '+deMonth+' '+deYear : ' ad oggi')+'</div>';
                      presidenti += '<div class="timeline-item-divider"></div>';
                      presidenti += '<div class="timeline-item-content">';
                      presidenti += '<div class="timeline-item-inner">'
                      presidenti += '<div class="timeline-item-title text-align-center"><img src="http://'+data[i].PathFoto+'" /></div>';
                      presidenti += '<div class="timeline-item-subtitle">'+data[i].Titolo+' '+data[i].Nome+' '+data[i].Cognome+'</div>';
                      presidenti += '</div>';
                      presidenti += '</div>';
                      presidenti += '</div>';
                    }
                    else if (data[i].IdVerticeRaggruppamento == 7) {
                      direttori += '<div class="timeline-item-date">da '+dsMonth+' '+dsYear + ( data[i].DataFine != '' ? ' a '+deMonth+' '+deYear : ' ad oggi')+'</div>';
                      direttori += '<div class="timeline-item-divider"></div>';
                      direttori += '<div class="timeline-item-content">';
                      direttori += '<div class="timeline-item-inner">'
                      direttori += '<div class="timeline-item-title text-align-center"><img src="http://'+data[i].PathFoto+'" /></div>';
                      direttori += '<div class="timeline-item-subtitle">'+data[i].Titolo+' '+data[i].Nome+' '+data[i].Cognome+'</div>';
                      direttori += '</div>';
                      direttori += '</div>';
                      direttori += '</div>';
                    }
                  }
                  //console.log(presidenti);
                  $$('#presidenti-loader').remove();
                  $$('#presidenti-timeline').html(presidenti);
                  $$('#direttori-loader').remove();
                  $$('#direttori-timeline').html(presidenti);
                });
              },
            }
          },
          {
            path: '/statuto/',
            component: 'page-statuto',
            on: {
              pageAfterIn: function openStatuto (e, page) {
                Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetLoStatuto', {}, function (data) {
                  $$('#statuto-loader').remove();
                  $$('#statuto-container').html('<a href="http://'+data+'" class="link external" target="_blank"><img src="img/file-pdf-box.png" /></a><p>Visualizza lo statuto</p>');
                  // $$('#statuto-container').html('<img src="img/file-pdf-box.png" /><p>Visualizza lo statuto</p>');
                });
              },
            }
          },
          {
            path: '/vertici/',
            component: 'page-vertici',
            on: {
              pageAfterIn: function openVertici (e, page) {
                Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetVertici', {}, function (data) {
                  var dir = '';
                  var vdir1 = '';
                  var vdir2 = '';
                  var altro = '';
                  for(i=0;i<data.length;i++){
                    switch(data[i].IdVertice){
                      case 2:
                        dir += '<f7-list-item title="">';
                        dir += '<div class="card">';
                        dir += '<div class="card-header bg-color-blue text-color-white">'+data[i].Nome+' '+data[i].Cognome+'</div>';
                        dir += '<div class="card-content text-align-center"><img src="'+data[i].PathFoto+'" /></div>';
                        dir += '<div class="card-footer">'+data[i].Carica+'</div>';
                        dir += '</div>';
                        dir += '</f7-list-item>';
                      break;
                      case 3:
                        vdir1 += '<f7-list-item title="">';
                        vdir1 += '<div class="card">';
                        vdir1 += '<div class="card-header bg-color-blue text-color-white">'+data[i].Nome+' '+data[i].Cognome+'</div>';
                        vdir1 += '<div class="card-content text-align-center"><img src="'+data[i].PathFoto+'" /></div>';
                        vdir1 += '<div class="card-footer">'+data[i].Carica+'</div>';
                        vdir1 += '</div>';
                        vdir1 += '</f7-list-item>';
                      break;
                      case 4:
                        vdir2 += '<f7-list-item title="">';
                        vdir2 += '<div class="card">';
                        vdir2 += '<div class="card-header bg-color-blue text-color-white">'+data[i].Nome+' '+data[i].Cognome+'</div>';
                        vdir2 += '<div class="card-content text-align-center"><img src="'+data[i].PathFoto+'" /></div>';
                        vdir2 += '<div class="card-footer">'+data[i].Carica+'</div>';
                        vdir2 += '</div>';
                        vdir2 += '</f7-list-item>';
                      break;
                      case 5:
                        altro += '<f7-list-item title="">';
                        altro += '<div class="card">';
                        altro += '<div class="card-header bg-color-blue text-color-white">'+data[i].Nome+' '+data[i].Cognome+'</div>';
                        altro += '<div class="card-content text-align-center"><img src="'+data[i].PathFoto+'" /></div>';
                        altro += '<div class="card-footer">'+data[i].Carica+'</div>';
                        altro += '</div>';
                        altro += '</f7-list-item>';
                      break;
                    }

                  }
                  $$('#list-vertici-presidente').html(dir);
                  $$('#list-vertici-vicepresidente1').html(vdir1);
                  $$('#list-vertici-vicepresidente2').html(vdir2);
                  $$('#list-vertici-altre').html(altro);
                  $$('#vertici-container').remove();
                  $$('#vertici-accordion-container').show();
                });
              },
            }
          },
          {
            path: '/organi/',
            component: 'page-organi',
            on: {
              pageAfterIn: function openOrgani (e, page) {
                Framework7.request.json('http://serviceapp.ance.it:26031/ServiceAppAnce.svc/SistemaAnce/GetOrganiAnce', {}, function (data) {
                  //$$('#story-container').html(data);
                  console.log(data[0]);
                  var governance='';
                  var commissioni='';
                  var comitati='';
                  var giovani='';
                  for(i=0;i<data.length;i++){
                    switch(data[i].IdOrganoRaggruppamento){
                      //console.log(data[i].IdVerticeRaggruppamento);
                      case 51:
                      governance += '<li><div class="item-content"><div class="item-media"><i class="f7-icons">right</i></div><div class="item-inner"><div class="item-text">'+data[i].DescOrgano+'</div></div></div></li>';
                      break;
                      case 52:
                      commissioni += '<li><div class="item-content"><div class="item-media"><i class="f7-icons">right</i></div><div class="item-inner"><div class="item-text">'+data[i].DescOrgano+'</div></div></div></li>';
                      break;
                      case 53:
                      comitati += '<li><div class="item-content"><div class="item-media"><i class="f7-icons">right</i></div><div class="item-inner"><div class="item-text">'+data[i].DescOrgano+'</div></div></div></li>';
                      break;
                      case 54:
                      giovani += '<li><div class="item-content"><div class="item-media"><i class="f7-icons">right</i></div><div class="item-inner"><div class="item-text">'+data[i].DescOrgano+'</div></div></div></li>';
                      break;
                    }
                  }
                  //console.log(presidenti);
                  $$('#organi-container').remove();
                  $$('#list-organi-governance').html(governance);
                  $$('#list-organi-commissioni').html(commissioni);
                  $$('#list-organi-comitati').html(comitati);
                  $$('#list-organi-giovani').html(giovani);
                  $$('#organi-accordion-container').show();
                });
              },
            }
          },
          {
            path: '/rassegna/',
            component: 'page-rassegna',
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
                    listitems += '<div class="item-after"><a href="http://'+data[i].PathRassegna+'" target="_system"><i class="f7-icons">info_fill</i></a></div>';
                    listitems += '</div></div></li>';
                    //listitems += '</a>';
                  }
                  $$('#rassegna-loader').remove();
                  $$('#list-rassegna').html(listitems);
                });
              },
            }
          },
          // {
          //   path: '/agenda/',
          //   component: 'page-agenda',
          //   on: {
          //     pageAfterIn: function openAgenda (e, page) {
          //       var monthNames = getMonths(0,2);
          //       console.log(monthNames);
          //       var app = new Framework7({ /*...*/ });
          //       var calendarInline = app.calendar.create({
          //         containerEl: '#demo-calendar-inline-container',
          //         routableModals: false,
          //         value: [new Date()],
          //         weekHeader: true,
          //         dayNamesShort	: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
          //         renderToolbar: function () {
          //           return '<div class="toolbar calendar-custom-toolbar no-shadow">' +
          //             '<div class="toolbar-inner">' +
          //               '<div class="left">' +
          //                 '<a href="#" class="link icon-only"><i class="icon icon-back ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
          //               '</div>' +
          //               '<div class="center"></div>' +
          //               '<div class="right">' +
          //                 '<a href="#" class="link icon-only"><i class="icon icon-forward ' + (app.theme === 'md' ? 'color-black' : '') + '"></i></a>' +
          //               '</div>' +
          //             '</div>' +
          //           '</div>';
          //         },
          //         on: {
          //           init: function (c) {
          //             $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
          //             $$('.calendar-custom-toolbar .left .link').on('click', function () {
          //               calendarInline.prevMonth();
          //             });
          //             $$('.calendar-custom-toolbar .right .link').on('click', function () {
          //               calendarInline.nextMonth();
          //             });
          //           },
          //           monthYearChangeStart: function (c) {
          //             $$('.calendar-custom-toolbar .center').text(monthNames[c.currentMonth] +', ' + c.currentYear);
          //           }
          //         }
          //       });
          //     }
          //   },
          // },
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
