// Swagghetty code FTW :/ (copy pasta)
(function($) {
  "use strict";

  /*-------------------------------------------------------------------------------
    Dialog
  -------------------------------------------------------------------------------*/
  const dialog = new A11yDialog(document.getElementById("auth-dialog"));

  /*-------------------------------------------------------------------------------
    Auth
  -------------------------------------------------------------------------------*/
  const authController = new Auth({ dialog });

  /*-------------------------------------------------------------------------------
    Download
  -------------------------------------------------------------------------------*/
  const handleDownloadRequests = () => {
    console.log("handle DL request");
    if (authController.isLoggedIn) console.log("download the app!");
    else {
      dialog.show();
      authController.node.showregister = "true";
    }
  };

  document
    .querySelectorAll(".js-button-download")
    .forEach(dl =>
      dl.addEventListener("click", () => handleDownloadRequests())
    );

  /*-------------------------------------------------------------------------------
  Navbar 
  -------------------------------------------------------------------------------*/
  var nav_offset_top = $("header").height() + 50;

  //* Navbar Fixed
  function navbarFixed() {
    if ($(".header_area").length) {
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= nav_offset_top) {
          $(".header_area").addClass("navbar_fixed");
        } else {
          $(".header_area").removeClass("navbar_fixed");
        }
      });
    }
  }
  navbarFixed();

  /*----------------------------------------------------*/
  /*  Parallax Effect js
  /*----------------------------------------------------*/
  // function parallaxEffect() {
  //   $('.bg-parallax').parallax();
  // }
  // parallaxEffect();

  /*----------------------------------------------------*/
  /*  Clients Slider
  /*----------------------------------------------------*/
  function clients_slider() {
    if ($(".clients_slider").length) {
      $(".clients_slider").owlCarousel({
        loop: true,
        margin: 30,
        items: 5,
        nav: false,
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          575: {
            items: 3
          },
          768: {
            items: 4
          },
          992: {
            items: 5
          }
        }
      });
    }
  }
  clients_slider();
  /*----------------------------------------------------*/
  /*  MailChimp Slider
  /*----------------------------------------------------*/
  function mailChimp() {
    $("#mc_embed_signup")
      .find("form")
      .ajaxChimp();
  }
  mailChimp();

  $("select").niceSelect();

  /*----------------------------------------------------*/
  /*  Simple LightBox js
  /*----------------------------------------------------*/
  $(".imageGallery1 .light").simpleLightbox();

  $(".counter").counterUp({
    delay: 10,
    time: 1000
  });

  $(".skill_main").each(function() {
    $(this).waypoint(
      function() {
        var progressBar = $(".progress-bar");
        progressBar.each(function(indx) {
          $(this).css("width", $(this).attr("aria-valuenow") + "%");
        });
      },
      {
        triggerOnce: true,
        offset: "bottom-in-view"
      }
    );
  });

  /*----------------------------------------------------*/
  /*  Isotope Fillter js
  /*----------------------------------------------------*/
  function projects_isotope() {
    if ($(".projects_area").length) {
      // Activate isotope in container
      $(".projects_inner").imagesLoaded(function() {
        $(".projects_inner").isotope({
          layoutMode: "fitRows",
          animationOptions: {
            duration: 750,
            easing: "linear"
          }
        });
      });

      // Add isotope click function
      $(".filter li").on("click", function() {
        $(".filter li").removeClass("active");
        $(this).addClass("active");

        var selector = $(this).attr("data-filter");
        $(".projects_inner").isotope({
          filter: selector,
          animationOptions: {
            duration: 450,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }
  }
  projects_isotope();

  /*----------------------------------------------------*/
  /*  Testimonials Slider
  /*----------------------------------------------------*/
  function testimonials_slider() {
    if ($(".testi_slider").length) {
      $(".testi_slider").owlCarousel({
        loop: true,
        margin: 30,
        items: 2,
        nav: false,
        autoplay: true,
        smartSpeed: 1500,
        dots: false,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          }
        }
      });
    }
  }
  testimonials_slider();
})(jQuery);
