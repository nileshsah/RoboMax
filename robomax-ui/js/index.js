var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});


function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  
  $('<div class="message loading new"><figure class="avatar"><img src="https://www.shareicon.net/data/128x128/2016/07/29/803598_user_512x512.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  $.getJSON( "http://localhost:8990/ask?q=" + encodeURIComponent(msg), function( data ) {
    $('.message.loading').remove();
    var out = data['response'].replace("\n", "<br\>");
    if (data['polarity'] != null) {
      out += "<br/> &#9786; <sub> " + parseFloat(data['polarity']).toFixed(2) + " </sub>";
    }
    if (data['subjectivity'] != null) {
      out += "&#9892; <sub> " + parseFloat(data['subjectivity']).toFixed(2) + " </sub>";
    }
    $('<div class="message new"><figure class="avatar"><img src="https://www.shareicon.net/data/128x128/2016/07/29/803598_user_512x512.png" /></figure>' + out + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  });
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

var Fake = [
  'Hi there, I\'m Robo Max! Ask me anything you like about the US elections :)',
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://www.shareicon.net/data/128x128/2016/07/29/803598_user_512x512.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://www.shareicon.net/data/128x128/2016/07/29/803598_user_512x512.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}

$('.button').click(function(){
  $('.menu .items span').toggleClass('active');
   $('.menu .button').toggleClass('active');
});