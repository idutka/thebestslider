$(document).ready(function(){   
(function( $ ) {

var defaultSettings = {
        numberviewelements  : 1,
        viewelement         : 0,
        moveCount           : 1,
        autowidth           : true,
        autoheight          : true,
        vertical            : false,
        circle              : false,
        auto                : false,
        time                : 2000,
        speed               : 500,
        viewarrows          : true,
        viewbuttons         : true,
        idArrows            : "controls",
        idButtons           : "buttons",
        buttonPrev          : "<span class='prev'></span>",
        buttonNext          : "<span class='next'></span>",
        button              : "<span></span>",
        before              : null,
        after               : null,
        onInit              : null,
        onDestroy           : null
    };

    var methods = {

        Init: function(option){

            var op = $.extend({}, defaultSettings, option);

            var _this  = this;

            var box = this.children();  

            var widthElements = box.children().outerWidth(true);
            var heightElements = box.children().outerHeight(true);

            var numberElements = box.children().length;
        
            var n = numberElements - op.numberviewelements;

        if(typeof op.onInit == 'function') {
            op.onInit();
        }

        if(op.viewarrows){
        var controls = $('<span>', {
            id: op.idArrows
        });
        this.after(controls);
        controls.append(op.buttonPrev,op.buttonNext);

        var prev = controls.children().eq(0); // button PREV
        var next = controls.children().eq(1); // button NEXT 

        next.click(function () {
            moveNext();
        })

        prev.click(function () {
            movePrev();
        })

        }

        if(op.viewbuttons){
        var buttons = $('<span>', {
            id: op.idButtons
        });
        this.after(buttons);
        drawButton();

        buttons.children().each(function(i){
            $(this).click(function(){
                op.viewelement = i;
                moveBox();
            });
        });

        }

        if(op.autowidth) {
            if (op.vertical) {
                setWidth(1);
            }else{
                setWidth(op.numberviewelements);
            };
        };

        if(op.autoheight) {
            if (op.vertical) {
                setHeight(op.numberviewelements);
            }else{
                setHeight(1);
            };
        };

        redrawControls();
        setStyle();
        
        if (op.auto) {
            op.circle = true;
            var myInterval = setInterval(function () {
                moveNext();
            },op.time); 
        // clearInterval(myInterval);
        };


        function setStyle() {
            _this.css( "overflow", "hidden");
            box.css( "position", "relative");
            if (!op.vertical) {
                box.children().each(function(i){
                    $(this).css( "float", "left");
                });
                box.css( "width", "900000px")
            };


        }

        function moveNext () {
            if(op.viewelement < n){
                op.viewelement += op.moveCount; 
                if (op.viewelement > n) { op.viewelement = n};
                moveBox();
            }else{
                if(op.circle){
                    op.viewelement = 0;
                    moveBox();
                }
            }            
        }

        function movePrev () {
            if(op.viewelement > 0){
                op.viewelement -= op.moveCount ;
                if (op.viewelement < 0) { op.viewelement = 0};
                moveBox();
            }else{
                if(op.circle){
                    op.viewelement = n;
                    moveBox();
                }
            }
        }
    
        function moveBox () {
            if(typeof op.before == 'function') {
                op.before();
            }

            op.vertical ? setTop() : setLeft();
        }

        function setLeft () {
            var p = op.viewelement*widthElements;
            p*=-1;
            box.stop().animate({
                left: p +'px'
            }, op.speed, function() {
                redrawControls();
            })
        }

        function setTop () {
            var p = op.viewelement*heightElements;
            p*=-1;
            box.stop().animate({
                top: p +'px'
            }, op.speed, function() {
                redrawControls();
            })
        }

        function redrawControls() {
            if(op.viewarrows){ drawArrows();}
            if(op.viewbuttons){drawActivButton();}

            if(typeof op.after == 'function') {
                op.after();
            }
        }

        function setWidth (w) {
            _this.css( "width", w*widthElements) 
        }

        function setHeight (h) {
            _this.css( "height", h*heightElements)
        }

        function drawArrows () {
            op.viewelement == 0 ? prev.removeClass("active") : prev.addClass("active");
            op.viewelement == n ? next.removeClass("active") : next.addClass("active");
        }

        function drawButton () {
            for (var i = 0; i <= n; i++) {
                buttons.append(op.button);
            };
        }

         function drawActivButton () {
            buttons.children().each(function(i){
                if(i == op.viewelement){
                    $(this).addClass("active");
                }else{
                    $(this).removeClass("active");
                }
            });
        }

            return this.bind({

                'mousedown.TheBestOfTheBestSlider': function(event){
                    console.log('down');
                },
                'mouseup.TheBestOfTheBestSlider': function(event){
                        console.log('up');
                }
            });
        },

        Destroy: function(){

            this.unbind('.TheBestOfTheBestSlider');
        }
    };

    $.fn.TheBestOfTheBestSlider = function(method){

        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof method === 'object' || ! method){
            return methods.Init.apply(this, arguments);
        }
        else{
            $.error('Method "' +  method + '" not exist in plugin jQuery.Player');
        }

    };

})( jQuery );

var s1 = $("#slider").TheBestOfTheBestSlider({
      numberviewelements  :2,
      moveCount           :2
    });

var s2 = $("#slider2").TheBestOfTheBestSlider({
      'numberviewelements' :1,
      'vertical'           :true,
      'viewarrows'         :false,
      auto                 :true,
      onInit               :function() {
          console.log('start')
      },
      before               :function() {
          console.log('before')
      },
      after                :function() {
          console.log('after')
      }

    });

//s2.TheBestOfTheBestSlider('Destroy');




      // 'numberviewelements'  : 1,
      // 'viewelement'         : 0,
      // 'moveCount'           : 1,
      // 'autowidth'           : true,
      // 'autoheight'          : true,
      // 'vertical'            : false,
      // 'circle'              : false,
      // 'auto'                : false,
      // 'time'                : 2000,
      // 'speed'               : 500,
      // 'viewarrows'          : true,
      // 'viewbuttons'         : true,
      // 'idArrows'            : "controls",
      // 'idButtons'           : "buttons",
      // 'buttonPrev'          : "<span class='prev'>prev</span>",
      // 'buttonNext'          : "<span class='next'>next</span>",
      // 'button'              : "<span>#</span>"

});