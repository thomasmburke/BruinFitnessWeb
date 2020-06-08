/*========== MAKE ALL ANIMATION "FADEINUP" ON MOBILE ==========*/
$(document).ready(function () {
  //when document(DOM) loads completely
  if ($(window).width() < 768) {
    //if the window is less than 768px
    $("div").attr("data-animation", "fadeInUp"); //any div with the "data-animation" attribute should have it's value (animation style) changed to "fadeInUp"
    $("div").attr("data-delay", "0s"); //remove data delay
  }
});

/*========== WAYPOINTS ANIMATION DELAY ==========*/
$(function () {
  // a self calling function
  function onScrollInit(items, trigger) {
    // a custom made function
    items.each(function () {
      //for every element in items run function
      var osElement = $(this), //set osElement to the current
        osAnimationClass = osElement.attr("data-animation"), //get value of attribute data-animation type
        osAnimationDelay = osElement.attr("data-delay"); //get value of attribute data-delay time

      osElement.css({
        //change css of element
        "-webkit-animation-delay": osAnimationDelay, //for safari browsers
        "-moz-animation-delay": osAnimationDelay, //for mozilla browsers
        "animation-delay": osAnimationDelay, //normal
      });

      var osTrigger = trigger ? trigger : osElement; //if trigger is present, set it to osTrigger. Else set osElement to osTrigger

      osTrigger.waypoint(
        function () {
          //scroll upwards and downwards
          osElement.addClass("animated").addClass(osAnimationClass); //add animated and the data-animation class to the element.
        },
        {
          triggerOnce: true, //only once this animation should happen
          offset: "70%", // animation should happen when the element is 70% below from the top of the browser window
        }
      );
    });
  }

  // onScrollInitCounterUp();
  onScrollInit($(".os-animation")); //function call with only items
  onScrollInit($(".staggered-animation"), $(".staggered-animation-container")); //function call with items and trigger
});
