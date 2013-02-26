$(document).ready(function(){   
        
(function( $ ) {
  $.fn.TheBestOfTheBestSlider = function() {
        
        var numberViewElements  = 1;
        var ViewElement         = 0;
        var moveCount           = 1;
        var autowidth           = true;
        var autoheight          = true;
        var vertical            = false;
        var circle              = true;
        var auto                = false;
        var time                = 2000;
        var speed               = 500;
        var idArrows            = "controls";
        var idButtons           = "buttons";
        var buttonPrev          = "<span class='prev'>prev</span>";
        var buttonNext          = "<span class='next'>next</span>";
        var button              = "<span>#</span>";


        var controls = $('<span>', {
            id: idArrows
        });

        this.after(controls);
        controls.append(buttonPrev,buttonNext);

        var prev = controls.children().eq(0); // button PREV
        var next = controls.children().eq(1); // button NEXT 

        var buttons = $('<span>', {
            id: idButtons
        });
        this.after(buttons);

        var box = this.children();  
        var widthElements = box.children().outerWidth(true);
        var numberElements = box.children().length;
        
        var n = numberElements - numberViewElements;

        if(autowidth) {this.css( "width", numberViewElements*widthElements) };
        drawArrows();
        drawButton();
        drawActivButton();

        box.children().each(function(i){
            $(this).css( "float", "left");
        });

        if (auto) {
            var myInterval = setInterval(function () {
                next.click();
            },time); 
        // clearInterval(myInterval);
        };
        

        next.click(function () {
            if(ViewElement < n){
                ViewElement += moveCount; 
                if (ViewElement > n) { ViewElement = n};
                setLeft()
            }else{
                if(circle){
                    ViewElement = 0;
                    setLeft()
                }
            }
        })

        prev.click(function () {
            if(ViewElement > 0){
                ViewElement -= moveCount ;
                if (ViewElement < 0) { ViewElement = 0};
                setLeft()
            }else{
                if(circle){
                    ViewElement = n;
                    setLeft()
                }
            }
        })

        buttons.children().each(function(i){
            $(this).click(function(){
                ViewElement = i;
                setLeft();
            });
        });

        function setLeft () {
            var p = ViewElement*widthElements;
            p*=-1;
            box.stop().animate({
                left: p +'px'
            }, speed, function() {
                drawArrows();
                drawActivButton();
            })
        }

        function drawArrows () {
            if(ViewElement == 0){
                prev.removeClass("active");
            }else{
                prev.addClass("active");
            }

            if(ViewElement == n){
                next.removeClass("active");
            }else{
                next.addClass("active");
            }
        }

        function drawButton () {
            for (var i = 0; i <= n; i++) {
                buttons.append(button);
            };
        }

         function drawActivButton () {
            buttons.children().each(function(i){
                if(i == ViewElement){
                    $(this).addClass("active");
                }else{
                    $(this).removeClass("active");
                }
            });
        }


  };
})( jQuery );


var s1 = $("#slider").TheBestOfTheBestSlider();


});