$(document).ready(function() {
    var apiKey = 'AhVMQKxW8glNmq3gvTq0ng7v0dALwm7wgtsalgnO';
   
    var today =  new Date();
    var changeTimeZone = today.toLocaleDateString('en-US', { timeZone: 'America/New_York' })
  
    var todayArr = changeTimeZone.split('/');
    var yy = todayArr[2];
    var mm = (0+todayArr[0]).substr(-2);
    var dd = (0+todayArr[1]).substr(-2); 
    var url = 'https://api.nasa.gov/planetary/apod?api_key=' 
      + apiKey
      + '&date=' 
      + yy + '-' + mm + '-' + dd;
   
   
     var request = $.ajax({
      url: url,
      dataType: 'json',
    });
    
     request.done(function(data) {
        
        var date = data.date;
        var title = data.title;
        var imgUrl = data.url;
        var hdImgUrl = data.hdurl;
        var explanation = data.explanation;
        
        var dateTag = $('<div class="date">');
        dateTag.html(date);
        
        var titleTag = $('<h3 class="title">');
        titleTag.html(title);
        
        var imgTag = $('<img class="thumbnail">');
        imgTag.prop('src', imgUrl);
      
        var hdImgTag = $('<a class="hdurl">');
        hdImgTag.prop('href', hdImgUrl);
     
        
        var expTag = $('<p class="explanation">');
        expTag.html(explanation);
        
        var copyright = data.copyright;
        var copyrightTag = $('<span class="copyright">');
        if(copyright == undefined) {
          copyrightTag.html('NASA');
        } else {
          copyrightTag.html(copyright);
        }
        
        
   $('#picture').append(expTag);
                          $('.credit').before(dateTag).before(titleTag).before(hdImgTag).append(copyrightTag);   
   hdImgTag.append(imgTag);
     
        
      });
    
     request.fail(function(data) {
    
       $('.credit').text('Sorry! The Photo will be release soon. Please come back later.')
        $('.button').hide();
     });
    
    
    function addDate(date, add) {
      
      var newDate = new Date(date);
      newDate.setDate(newDate.getDate()+add);
      var date = newDate.getDate();
      var month = newDate.getMonth()+1;
      if(month<10) {
         month = '0' + month;
      }
      if(date<10) {
        date = '0' + date;
      }
  
      var year = newDate.getFullYear();
      return year + '-' + month + '-' +date
  }
    
  
    
    $('.button').click(function(e) { 
    
      
      if($(this).is('.yesterday')) {
        var displayDate = $('.date').text(); 
        var result = addDate(displayDate, -1);
        var url = 'https://api.nasa.gov/planetary/apod?api_key=' 
      + apiKey
      + '&date=' 
      + result;
      }
      if($(this).is('.tomorrow')) {
        var displayDate = $('.date').text(); 
        var result = addDate(displayDate, 1);
        var url = 'https://api.nasa.gov/planetary/apod?api_key=' 
      + apiKey
      + '&date=' 
      + result;
      }
      
      var request = $.ajax({
      url: url,
      dataType: 'json',
    });
      request.done(function(data) {
        
        var date = data.date;
        var title = data.title;
        var imgUrl = data.url;
        var hdImgUrl = data.hdurl;
        var explanation = data.explanation;
        
       
        $('.date').html(date);
        
        $('.title').html(title);
        
        $('.hdurl').prop('href', hdImgUrl);
       
        $('.thumbnail').prop('src', imgUrl);
        
        $('.explanation').html(explanation);
        
        var copyright = data.copyright;
        
        if(copyright == undefined) {
          $('.copyright').html('NASA');
        } else {
          $('.copyright').html(copyright);
        }
    
        
      });
      
       request.fail(function(xhr) {
 
        $('#error-msg').html('Photo will be release tomorrow!').stop().show(200).delay(3000).hide(300);
      });
    });
    
    
 
   $('#picture').on('click', '.hdurl', function(e) {
     e.preventDefault();
     
     var hdUrl = $(this).prop('href');
     var hdImg = $('<img>');
     hdImg.prop('src', hdUrl);
     $('.model').html(hdImg);
     
     $('#model-container').fadeIn();
     
     
   });
    
    $('#model-container').click(function(e) {
       $(this).fadeOut();
     });
  
   
  });