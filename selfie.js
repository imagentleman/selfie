(function() {
  tinymce.create('tinymce.plugins.Selfie', {
    init : function(ed, url) {
      ed.onPostRender.add(function(ed, cm) {
        var c = document.getElementById('content_ifr');
        var b = c.contentDocument.getElementById('tinymce');
        var i = document.createElement('iframe');
        i.src = Selfie.site_url + '/?p=' + Selfie.id + '&preview=true';
        i.style = 'display:none;';
        i.id = 'myi';
        i.onload = function() {
          var myi = document.getElementById('myi');
          var cssText = '';
          ['p', 'h1', 'p > a'].forEach(function(tag) {
            var el = myi.contentDocument.querySelectorAll(tag)[0];
            if ( el !== undefined ) {
              var s = myi.contentWindow.getComputedStyle(el);
              cssText += tag + '{font-family:' + s.fontFamily + ';';
              cssText += 'font-size:' + s.fontSize + ';';
              cssText += 'font-weight:' + s.fontWeight + ';';
              cssText += 'line-height:' + s.lineHeight + ';';
              cssText += 'color:' + s.color + '}';
            }

          });

          var links = myi.contentDocument.querySelectorAll("link[rel=stylesheet]");
          for (var j=0; j<links.length; j++) {
            if (links[j].href.match("fonts.googleapis.com")) {
              c.contentDocument.head.appendChild(links[j]);
            }
          }

          var style = document.createElement('style');
          style.innerHTML = cssText;
          b.appendChild(style);
        }
        document.body.appendChild(i);
      });
    }
  });

  tinymce.PluginManager.add( 'selfie', tinymce.plugins.Selfie );

})();
