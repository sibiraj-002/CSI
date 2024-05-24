  /********* On scroll heder Sticky *********/
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $("header").addClass("head-sticky");
    } else {
        $("header").removeClass("head-sticky");
    }
});

var a = 0;

$(window).scroll(function () {
  var counterBox = $("#counter-box");
  
  // Check if the #counter-box element exists
  if (counterBox.length === 0) {
    return;
  }

  var oTop = counterBox.offset().top - window.innerHeight;

  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".counter").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-number");

      $({ countNum: $this.text() }).animate(
        {
          countNum: countTo
        },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.ceil(this.countNum).toLocaleString("en"));
          },
          complete: function () {
            $this.text(Math.ceil(this.countNum).toLocaleString("en"));
          }
        }
      );
    });

    a = 1;

    // Stop listening to the scroll event once animation is triggered
    $(window).off("scroll");
  }
});


$(document).ready(function () {
  $('[data-bs-toggle="tooltip"]').tooltip();
  // worker-slider
  $('.worker-slider').slick({
    dots: true,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 1500,
    arrows: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  // stories-slider
  $('.stories-slider').slick({
    dots: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 1500,
    arrows: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  // gallery-carousel
  $('.gallery-carousel').slick({
    dots: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 1500,
    arrows: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  // worker-slider-2
  $('.worker-slider-2').slick({
    dots: true,
    autoplay: false,
    infinite: true,
    autoplaySpeed: 1500,
    arrows: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  $(".more-menu").click(function () {
    $(".sliding-menu").toggleClass("active");
    $("body").toggleClass("lock-scroll");
  });
  $(".close-menu").click(function () {
    $(".sliding-menu").removeClass("active");
    $("body").removeClass("lock-scroll");
  });
  $(".menu-toggle").click(function () {
    $(".sliding-menu").toggleClass("active");
    $("body").toggleClass("lock-scroll");
  });
  $('.modal').on('show.bs.modal', function (event) {
    var iframeUrl = $(event.relatedTarget).data('url');
    if (iframeUrl) {
      $(this).find('iframe').attr("src", iframeUrl);
    }
  });

  // Hidden modal event
  $('.modal').on('hidden.bs.modal', function (e) {
    $(this).find('iframe').attr("src", "");
  });


 /********* Mobile Filter Popup ********/
 $('.side-fillter').on('click',function(e){
  e.preventDefault();
  setTimeout(function(){
      $('body').addClass('no-scroll filter-open');
      $('.overlay').addClass('active');
  }, 50);
}); 
$('body').on('click','.overlay.active, .close-filter', function(e){
  e.preventDefault(); 
  $('.overlay').removeClass('active');
  $('body').removeClass('no-scroll filter-open');
}); 

});


var modalBody = $(".modal-body");
var currentMediaOpen;
var currentVideoElement; // Track the current video element

// $(".play-btn").click(function() {
//   var mediaSrc = $(this).attr('data-url');
//   var mediaTitle = $(this).find("a").attr('title');

//   if (isVideo(mediaSrc)) {
//     // If it's a video, create a video tag
//     modalBody.html('<video controls style="width: 100%; height: auto;"><source src="' + mediaSrc + '" type="video/mp4"></video>');
//     currentVideoElement = modalBody.find('video')[0]; // Get the video element
//   } else {
//     // If it's an image, create an image tag
//     modalBody.html('<img src="' + mediaSrc + '" style="width: 100%; height: auto;">');
//     currentVideoElement = null; // Reset current video element
//   }

//   $(".modal-title").html(mediaTitle);
//   currentMediaOpen = $(this);
// });

$(".icon-right-open").click(function() {
  var nextThumb = currentMediaOpen.next(".thumb");
  if (nextThumb.length === 0) {
    nextThumb = $(".thumb").first();
  }
  var nextTitle = nextThumb.find("a").attr('title');
  var nextMediaSrc = nextThumb.attr('data-src');

  if (isVideo(nextMediaSrc)) {
    modalBody.html('<video controls style="width: 100%; height: auto;"><source src="' + nextMediaSrc + '" type="video/mp4"></video>');
  } else {
    modalBody.html('<img src="' + nextMediaSrc + '" style="width: 100%; height: auto;">');
  }

  $(".modal-title").html(nextTitle);
  currentMediaOpen = nextThumb;
});

$(".icon-left-open").click(function() {
  var prevThumb = currentMediaOpen.prev(".thumb");
  if (prevThumb.length === 0) {
    prevThumb = $(".thumb").last();
  }
  var prevTitle = prevThumb.find("a").attr('title');
  var prevMediaSrc = prevThumb.attr('data-src');

  if (isVideo(prevMediaSrc)) {
    modalBody.html('<video controls style="width: 100%; height: auto;"><source src="' + prevMediaSrc + '" type="video/mp4"></video>');
  } else {
    modalBody.html('<img src="' + prevMediaSrc + '" style="width: 100%; height: auto;">');
  }

  $(".modal-title").html(prevTitle);
  currentMediaOpen = prevThumb;
});
// Add this event listener to pause the video when the modal is hidden
$('#galleryModal').on('hidden.bs.modal', function () {
  if (currentVideoElement) {
    currentVideoElement.pause(); // Pause the video
  }
});
// Function to check if the given file path is a video
function isVideo(fileSrc) {
  return fileSrc.toLowerCase().endsWith('.mp4') || fileSrc.toLowerCase().endsWith('.webm') || fileSrc.toLowerCase().endsWith('.ogg');
}

var current = 0;
var tabs = $(".tab");
var tabs_pill = $(".tab-pills");

loadFormData(current);

function loadFormData(n) {
  $(tabs_pill[n]).addClass("active");
  $(tabs[n]).removeClass("d-none");
  $("#back_button").attr("disabled", n == 0 ? true : false);
  n == tabs.length - 1
    ? $("#next_button").text("Submit").removeAttr("onclick")
    : $("#next_button")
        .attr("type", "button")
        .text("Next")
        .attr("onclick", "next()");
}

function next() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");

  current++;
  loadFormData(current);
}

function back() {
  $(tabs[current]).addClass("d-none");
  $(tabs_pill[current]).removeClass("active");

  current--;
  loadFormData(current);
}

const videoCloseBtn = document.querySelector('#bannerVideoModal .btn-close');
const videoBanner = document.querySelector('.banner-video');

if (videoBanner) {
  videoCloseBtn.addEventListener('click', () => {
    videoBanner.pause();
  });
}

// Function to set the src attribute of the video tag in the modal
function setVideoSource(url) {
  $('#videoIframe source').attr('src', url);
  // Reload the video element to apply the new source
  $('#videoIframe')[0].load();
}

// Event listener for modal show to autoplay the video
$('#csivideoModal').on('show.bs.modal', function (event) {
  // Get the data-url attribute from the button that triggered the modal
  var button = $(event.relatedTarget);
  var videoUrl = button.data('url');
  setVideoSource(videoUrl);
  $('#videoIframe')[0].play();
});

// Event listener for modal close to stop video playback
$('#csivideoModal').on('hidden.bs.modal', function () {
  setVideoSource('');
  $('#videoIframe')[0].pause();
});


$('.banner-slider').slick({
  autoplay: true,
  autoplaySpeed: 2000,
  arrows:false,
  dots:false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
});