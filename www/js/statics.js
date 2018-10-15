function openVertici (e, page) {
  Framework7.request.json(endPointUrl+'/SistemaAnce/GetVertici', {}, function (data) {
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
};
function openOrgani (e, page) {
  Framework7.request.json(endPointUrl+'/SistemaAnce/GetOrganiAnce', {}, function (data) {
    //$$('#story-container').html(data);
    //console.log(data[0]);
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
    console.log(commissioni);
    $$('#organi-container').remove();
    $$('#list-organi-governance').html(governance);
    $$('#list-organi-commissioni').html(commissioni);
    $$('#list-organi-comitati').html(comitati);
    $$('#list-organi-giovani').html(giovani);
    $$('#organi-accordion-container').show();
  });
};
function openStatuto (e, page) {
  Framework7.request.json(endPointUrl+'/SistemaAnce/GetLoStatuto', {}, function (data) {
    $$('#statuto-loader').remove();
    $$('#statuto-container').html('<a href="http://'+data+'" class="link external" target="_system"><img src="img/file-pdf-box.png" /></a><p>Visualizza lo statuto</p>');
    // $$('#statuto-container').html('<img src="img/file-pdf-box.png" /><p>Visualizza lo statuto</p>');
  });
};
function openStory (e, page) {
  Framework7.request.json(endPointUrl+'/SistemaAnce/GetStoria', {}, function (data) {    //$$('#story-container').html(data);
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
        presidenti += '<div class="timeline-item">';
        presidenti += '<div class="timeline-item-date">da '+dsMonth+' '+dsYear + ( data[i].DataFine != '' ? ' a '+deMonth+' '+deYear : ' ad oggi')+'</div>';
        presidenti += '<div class="timeline-item-divider"></div>';
        presidenti += '<div class="timeline-item-content">';
        presidenti += '<div class="timeline-item-inner">'
        presidenti += '<div class="timeline-item-title text-align-center"><img src="http://'+data[i].PathFoto+'" /></div>';
        presidenti += '<div class="timeline-item-subtitle text-align-center">'+data[i].Titolo+' '+data[i].Nome+' '+data[i].Cognome+'</div>';
        presidenti += '</div>';
        presidenti += '</div>';
        presidenti += '</div>';
      }
      else if (data[i].IdVerticeRaggruppamento == 7) {
        direttori += '<div class="timeline-item">';
        direttori += '<div class="timeline-item-date">da '+dsMonth+' '+dsYear + ( data[i].DataFine != '' ? ' a '+deMonth+' '+deYear : ' ad oggi')+'</div>';
        direttori += '<div class="timeline-item-divider"></div>';
        direttori += '<div class="timeline-item-content">';
        direttori += '<div class="timeline-item-inner">'
        direttori += '<div class="timeline-item-title text-align-center"><img src="http://'+data[i].PathFoto+'" /></div>';
        direttori += '<div class="timeline-item-subtitle text-align-center">'+data[i].Titolo+' '+data[i].Nome+' '+data[i].Cognome+'</div>';
        direttori += '</div>';
        direttori += '</div>';
        direttori += '</div>';
      }
    }
    //console.log(presidenti);
    $$('#presidenti-loader').remove();
    $$('#presidenti-timeline').html(presidenti);
    $$('#direttori-loader').remove();
    $$('#direttori-timeline').html(direttori);
  });
};
