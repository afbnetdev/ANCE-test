function setTemporaryFile(fileName){
  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {
    // console.log('file system open: ' + fs.name);
    createFile(fs.root, fileName, false);
  }, onErrorReader);
}
function setPersistentFile(fileName, fileContent){
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      // console.log('file system write: ' + fs.name);
      fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
          //console.log("fileEntry is file? => " + fileEntry.isFile.toString());
          //console.log(fileEntry);
          writeFile(fileEntry, fileContent, false);
      }, onErrorReader);
  }, onErrorReader);
}
function getPersistentFile(fileName,localFn){
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      // console.log('file system open: ' +fileName+' -> '+ fs.name);
      fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
          readFile(fileEntry, localFn);
      }, onErrorReader);
  }, onErrorReader);
}
function deleteFile(fileName) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getFile(fileName, {create: false}, function (fileEntry) {
            fileEntry.remove(function (file) {
                console.log(fileName + " deleted");
            }, function () {
                onErrorReader(error);
            }, function () {
                console.log(fileName + " doesn\'t exist");
            });
        });
    });
}

/*--------------------------------------------------------------------------*/
function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {
        writeFile(fileEntry, null, isAppend);
    }, onErrorReader);
}

function writeFile(fileEntry, dataObj, isAppend) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = function() {
            //truncate file only in case the content is shorter
            var len = dataObj.length;
            var fContent = fileWriter.length;
            if(len<fContent){
              fileWriter.truncate(len);
            }
        };
        fileWriter.onwritestart = function(){
          //fileWriter.truncate(fileWriter.length);
        };
        fileWriter.onerror = function (e) {
            console.log("Failed file read: " + e.toString());
        };
        // If we are appending data to file, go to the end of the file.
        if (isAppend) {
            try {
                fileWriter.seek(fileWriter.length);
            }
            catch (e) {
                console.log("file doesn't exist!");
            }
        }
        // console.log(dataObj.length);
        fileWriter.write(dataObj);
    });
}

function getSampleFile(dirEntry) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://cordova.apache.org/static/img/cordova_bot.png', true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (this.status == 200) {
            var blob = new Blob([this.response], { type: 'image/png' });
            saveFile(dirEntry, blob, "downloadedImage.png");
        }
    };
    xhr.send();
}

function readFile(fileEntry, localFn) {
    fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = function() {
            localFn(this.result);
            fileContent = this.result;
        };
        reader.readAsText(file);
    }, onErrorReader);
}

//ERROR HANDLING
function onErrorReader(e) {
  var msg = 'File Error handling: ';
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg += 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg += 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg += 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg += 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg += 'INVALID_STATE_ERR';
      break;
    default:
      if(e){
          msg += 'Uncommon error: '+e;
      }
      else{
        msg += 'Unknown Error';
      }
      break;
  };
  console.log('Error: ' + msg);
  alert('Error: ' + msg);
}
