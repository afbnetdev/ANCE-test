function getSettings(){
  var settings = '';
  getPersistentFile('app-settings.txt', function(data){
    settings = data;
  });
  return settings;
}

function getNewsStream(newsOutput){
  Framework7.request({
    url: endPointUrl+'/Contenuti/GetAll',
    async: true,
    method: 'GET',
    dataType: 'json',
    success: function (data, status, xhr){
      //output = data;
      var counter = 0;
      for(i=0;i<data.length;i++){
        //console.log(data[i]);
        // output[i] = data[i];
        if(data[i].FlagNotificaPush){
          newsOutput[counter] = data[i];
          counter++;
        }
      }
  	   // console.log(data);
    },
  });
  //console.log(newsOutput);
}

function setNotificationEngine(news,read){
  //get settings into variables
  var enable = window.sessionStorage.getItem('n_enable[]');
  if(!enable||enable!='on'){
    return false;
  }
  // var vibrate =  window.sessionStorage.getItem('n_vibrate[]');
  var frequency =  window.sessionStorage.getItem('n_frequency');
  // var color =  window.sessionStorage.getItem('n_color');
  var notifications = [];
  if(read && read.length>0){
    for (var k in news) {
      // console.log(k);
      //for(i=0;i<newsOutput.length;i++){
      var notifyMe = true;
      if (news.hasOwnProperty(k)) {
        // console.log(newsOutput[k]);
        for(j=0;j<read.length;j++){
          if( news[k].IdContentuno == read[j].newsId ){
            notifyMe = false;
          }
        }
      }
      if(!notifyMe){
        console.log('can can can');
        notifications.push(news[k]);
      }
    }
  }
  //no notification read has been set so I can parse the whole content
  else{
    notifications = news;
  }
  //setNotificationEngine(newsOutput,{});
  //console.log(notifications);
  //console.log(notifications[0].IdContentuno);
  //console.log('not: '+enable+' color: '+color + ' frequency: '+frequency);
  /*for (var key in notifications) {
    console.log('key: '+ key + ' => ' + notifications[key].IdContentuno);
  }*/
  var defNote = [];
  var threeHours = [8,13,18];
  var currentdate = new Date();
  var curYear = currentdate.getFullYear();
  var curMonth = currentdate.getMonth();
  var curDay = currentdate.getDay();
  var i = 0;
  for (var k in notifications) {
    var freqObj = {};
    var breakLoop = 0;
    switch(frequency){
      case "Ogni ora":
        freqObj = { in: i, unit: 'hour' };
        break;
      case "8:00 - 13:00 - 18:00":
        freqObj = { at: new Date(curYear, curYear, curDay ,threeHours[i]) };
        breakLoop = 3;
        break;
      case "Solo la mattina":
        freqObj = { at: new Date(curYear, curYear, curDay, 9) };
        breakLoop = 1;
        break;
      case "Solo la sera":
        freqObj = { at: new Date(curYear, curYear, curDay, 19) }
        breakLoop = 1;
        break;
    }
    defNote[i] = {
      id: notifications[k].IdContentuno,
      title: notifications[k].Titoletto,
      text: notifications[k].TitoloAnteprima,
      trigger: freqObj
    };
    i++;
    if(i==breakLoop){
      break;
    }
    //trigger: { in: 1, unit: 'hour' }
  }

  console.log(defNote);
  console.log(currentdate.getFullYear());
  cordova.plugins.notification.local.hasPermission(function (granted) {
    // console.log(notifications);
    // switch(color){
    //   case 'Rosso':
    //     setColor = '#ff0000';
    //     break;
    //   case 'Blu':
    //     setColor = '#0000ff';
    //     break;
    //   case 'Bianco':
    //     setColor = '#ffffff';
    //     break;
    //   case 'Verde':
    //     setColor = '#00ff00';
    //     break;
    // }
    // cordova.plugins.notification.local.setDefaults({
    //   led: { color: setColor, on: 500, off: 500},
    //   vibrate: (vibrate && vibrate=='on' ? true : false)
    // });
    //alert('Permission ' + granted);
    if(granted){
      //alert('ok, grant');
      cordova.plugins.notification.local.schedule(defNote);
      // setTimeout(function(){
      //   cordova.plugins.notification.local.schedule([
      //       { id: 1, title: 'My fourth notification with same id #1' }
      //   ]);
      // },10000);
    }
  });
}

function setSettingsMemory(sets){
  for (var key in sets) {
    if (sets.hasOwnProperty(key)) {
      // console.log(key + " -> " + sets[key]);
      window.sessionStorage.setItem(key, sets[key]);
    }
  }
}
function getDefaultSettings(){
  var a={};
  a["n_enable[]"] = 'on';
  a["n_vibrate[]"] = 'on';
  // a["n_frequency"] = 'Ogni ora';
  // a["n_color"] = 'Blu';
  return a;
}
