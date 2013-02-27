(function($){

    var defaultSettings = {
        radius: 118,
        OnDrag: null,
        OnInit: null
    };
    var methods = {

        options: null,

        Init: function(option){

            methods.options = $.extend({}, defaultSettings, option);


            function UpdatePointer(event){

            }

            function PointerTransform(angle){

            }

            function AddBarGradient(){

            }

            return this.bind({

                'mousedown.SPlayer': function(event){

                },
                'mouseup.SPlayer': function(event){

                },
                'mouseenter.SPlayer': function(event){

                },
                'mouseleave.SPlayer': function(event){

                },
                'mousemove.SPlayer': function(event){

                }

            });

        },

        RotateTo: function(newPosition){

        },

        GetCurrentAngle: function(){


        },

        Destroy: function(){

            this.unbind('.SPlayer');

        }

    };

    $.fn.SPlayer = function(method){

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

})(jQuery);
$('.main').myPl('');