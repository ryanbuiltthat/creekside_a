// Setup some variables for facebook
var pageid = 109937259077580;
var ver = 'v2.3';
var token = 'access_token=851442538283779|45fb2c9ebb8c17c7c6ecf628efd26491';
var pgAlbums = [];
albumPhotos = [];
// There's a lot of copies of their logo
// in their albums. If we find them, let's exclude them.
var exludePhotos = [
  "300959126642058",
  "339451622792808",
  "486996104705025",
  "300981703306467",
  "300960723308565",
  "109937612410878",
  "486994234705212",
  "300960406641930",
  "339878639416773",
  "299946743409963",
  "299949080076396",
  "300961273308510"
];
$(document).on('ready',function(){
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '851442538283779',
      xfbml      : true,
      version    : ver
  });
  // Get page album ids
  FB.api(
    "/"+pageid+"/albums?"+token,
    function (response) {
      if (response && !response.error) {
        var album = response.data;
        for(p in response.data){
          // push album pics to array
          getAlbumPics(response.data[p].id);
        }
      }else{
        console.log(response.error);
      }
      // Add a little delay to ensure we have our ducks in a row
      setTimeout(makePhotoStrip, 750);


    }
  );

  // Get photos from album
  // @picture returns the 100px wide version
  // TODO: push source version as well for modal opening....
  getAlbumPics = function(album){
    FB.api(
      "/"+album+"/photos?fields=id,name,picture,source,width,height&"+token,
      function (response) {
        if (response && !response.error) {
          var photos = response.data;
          //console.log(response);
          for(p in photos){
            //check if the photo is already in the array
            if(albumPhotos.indexOf(photos[p].id) >= 0){
              // do nothing
            }else {
              //console.log(photos[p]);
              var thumbnail = {
                id:       photos[p].id,
                thumb:    photos[p].picture,
                lgsrc:    photos[p].source,
                caption:  photos[p].name
              };
              albumPhotos.push(thumbnail);
            }
          }
        }else{
          console.log(response.error);
        }
      }
      );
    };

    // Append pictures to phohtostrip
    makePhotoStrip = function(){
      var photostrip = ".container.photostrip";
      var strip  = photostrip+" ul";
      // This get's re-run on resize so empty any existing images
      var photoCount = Math.ceil(($(window).width()/100));
      $(strip).css("width",(photoCount*100));
      //for (i = 0; i < albumPhotos.length; i++) {
        for (i = 0; i < photoCount; i++) {
          // Get random photo from array
          var pic = albumPhotos[Math.floor(Math.random() * albumPhotos.length)];
          var caption = "";
          if(!typeof pic.caption === "undefined"){caption=pic.caption}else{caption="Creekside Gardens"};
          if(exludePhotos.indexOf(pic.id) >= 0){
            i--;
          }else{
            $(strip).append('<li data-photo-id="'+pic.id+'" style="left:'+(120*i)+'px;background-image:url(\''+pic.thumb+'\')" />')
            .fadeIn(1000);
          }
          pic ="";
        }

    }

};
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
});
