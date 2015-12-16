/*===================================================================================================================
 * @name: bPopup
 * @type: jQuery
 * @author: (c) Bjoern Klinggaard - @bklinggaard
 * @github https://github.com/dinbror/bpopup/
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.11.0
 * @requires jQuery 1.4.3
 *==================================================================================================================*/
;(function($) {
	'use strict';
	
    $.hdfbPopup = function( options, element ) {
        this.$el = $( element );
        this.init( options );
    };

    $.hdfbPopup.nowTopZindex = 9997;

    $.hdfbPopup.prototype ={
        init: function (options) {

        // OPTIONS
        this.options               = $.extend({}, $.hdfbPopup.defaults, options);
        
        // HIDE SCROLLBAR?  
        if (!this.options.scrollBar)
            $('html').css('overflow', 'hidden');

        
        
        // VARIABLES    
           this.d               = $(document);
          this.$w              = $(window);
          this.prefix          = '__b-popup';
          //this.isIOS6X         = (/OS 6(_\d)+/i).test(navigator.userAgent) ;// Used for a temporary fix for ios6 timer bug when using zoom/scroll 
          this.buffer          = 200;
          this.popups          = 0;
        this.popups = (this.$w.data('hdfbPopup') || 0) + 1;
        this.popid = this.prefix + this.popups + '__';
        this.fixedVPos = this.options.position[1] !== 'auto';
        this.fixedHPos = this.options.position[0] !== 'auto';
        this.fixedPosStyle = this.options.positionStyle === 'fixed';
        this.height = this.$el.outerHeight(true);
        this.width = this.$el.outerWidth(true);

        if (this.options.modal) {
            $('<div class="b-modal '+this.popid+'modal"></div>')
            .css({backgroundColor: this.options.modalColor, display: 'none', position: 'fixed', top: 0, right:0, bottom:0, left: 0, opacity: this.options.opacity, zIndex: $.hdfbPopup.nowTopZindex + this.popups})
            .appendTo(this.options.appendTo);
        }

        this.bindEvents();
        //this.options.loadUrl ? this.createContent() : this.open();
        // MODAL OVERLAY
        
        },

        open: function (){
            var wH = this.windowHeight();
            var wW = this.windowWidth();
            var optionSappending = this.options.appending;
            var optionSappending = this.options.appendTo;
            
            if (this.options.modal) {
                $('.b-modal.'+this.popid+'modal').show(this.options.speed);
            }
            this.triggerCall(this.options.onOpen,this.$el);
            // POPUP
            this.calcPosition();
            this.$el
                .css({
                      'left': this.options.transition == 'slideIn' || this.options.transition == 'slideBack' ? (this.options.transition == 'slideBack' ? this.d.scrollLeft() + wW : (this.hPos + this.width) *-1) : this.getLeftPos(!(!this.options.follow[0] && this.fixedHPos || this.fixedPosStyle))
                    ,'position': this.options.positionStyle || 'absolute'
                    , 'top': this.options.transition == 'slideDown' || this.options.transition == 'slideUp' ? (this.options.transition == 'slideUp' ? this.d.scrollTop() + wH : this.vPos + this.height * -1) : this.getTopPos(!(!this.options.follow[1] && this.fixedVPos || this.fixedPosStyle))
                    , 'z-index': ++$.hdfbPopup.nowTopZindex + this.popups + 1 
                }).each(function() {
                    if(optionSappending) {
                        $(this).appendTo(optionSappending);
                    }
                });
            this.doTransition(true);
        },
        
        close: function () {
            if(!this.$el.is(":visible")){
                return;
            }
            //onclose callback
            this.triggerCall(this.options.onClose,this.$el);

            if (this.options.modal) {
                $('.b-modal.'+this.popid+'modal').hide();
            }

            if (!this.options.scrollBar) {
                $('html').css('overflow', 'auto');
            }
            // Clean up
            //this.unbindEvents();
            clearTimeout(this.autoCloseTO);
            // Close trasition
            this.doTransition();
            
            return false; // Prevent default
        },
        
        reposition: function (animateSpeed){
           this.inside = this.insideWindow();
           
            if(this.inside.x || this.inside.y){
                clearTimeout(this.debounce);
                this.debounce = setTimeout($.proxy(function(){
                    var $that = this;
                    this.calcPosition();
                    animateSpeed = animateSpeed || this.options.followSpeed;
                    var css = {};
                    if(this.inside.x)
                        css.left = this.options.follow[0] ? this.getLeftPos(true) : 'auto';
                    if(this.inside.y)
                        css.top = this.options.follow[1] ? this.getTopPos(true) : 'auto';
                    this.$el
                        .dequeue()
                        .each(function() {
                            if($that.fixedPosStyle) {
                                $(this).css({ 'left': $that.hPos, 'top': $that.vPos });
                            }
                            else {
                                $(this).animate(css, animateSpeed, $that.options.followEasing);
                            }
                        });
                },this), 50);
            }
        },
        
        bindEvents: function () {
            this.$w.data('bPopup', this.popups);
            this.$el.on( 'click','.bClose, .' + this.options.closeClass, $.proxy(this.close,this)); // legacy, still supporting the close class bClose
            var $that = this;
            if (this.options.modalClose) {
                if( !$('.b-modal.'+this.popid+'modal').data("click") ){
                    $('.b-modal.'+this.popid+'modal').data("click","bind");
                    $('.b-modal.'+this.popid+'modal').css('cursor', 'pointer').on('click', $.proxy(this.close,this));
                }
                
            }
            
            // Temporary disabling scroll/resize events on devices with IOS6+
            // due to a bug where events are dropped after pinch to zoom
            /*if (!this.isIOS6X && (this.options.follow[0] || this.options.follow[1])) {
               this.$w.on('scroll.'+this.popid, function() {
                    if($that.inside.x || $that.inside.y){
                        var css = {};
                        if($that.inside.x)
                            css.left =  $that.options.follow[0] ? $that.getLeftPos(!$that.fixedPosStyle) : 'auto';
                        if($that.inside.y)
                            css.top = $that.options.follow[1] ? $that.getTopPos(!$that.fixedPosStyle) : 'auto';
                        $that.$el
                            .dequeue()
                            .animate(css, $that.options.followSpeed, $that.options.followEasing);
                     }
                }).on('resize', function() {
                    $that.reposition();
                });
            }*/
            this.$w.on('resize', function() {
                    if($that.$el.is(":visible")){
                       $that.reposition(); 
                    }
                    
            });

            if (this.options.escClose) {
                this.d.on('keydown.'+$that.id, function(e) {
                    if (e.which == 27) {  //escape
                        $that.close();
                    }
                });
            }
        },
        
        unbindEvents: function () {
            if (!this.options.scrollBar) {
                $('html').css('overflow', 'auto');
            }
        },
        
        doTransition:function (open) {
            var wH = this.windowHeight();
            var wW = this.windowWidth();
            var $that = this;
            switch (open ? this.options.transition : this.options.transitionClose || this.options.transition) {
               case "slideIn":
                    this.animate({
                        left: open ? this.getLeftPos(!(!this.options.follow[0] && this.fixedHPos || this.fixedPosStyle)) : this.d.scrollLeft() - (this.width || this.$el.outerWidth(true)) - this.buffer
                    });
                    break;
               case "slideBack":
                    this.animate({
                        left: open ? this.getLeftPos(!(!this.options.follow[0] && this.fixedHPos || this.fixedPosStyle)) : this.d.scrollLeft() + wW + this.buffer
                    });
                    break;
               case "slideDown":
                    this.animate({
                        top: open ? this.getTopPos(!(!this.options.follow[1] && this.fixedVPos || this.fixedPosStyle)) : this.d.scrollTop() - (this.height || this.$el.outerHeight(true)) - this.buffer
                    });
                    break;
                case "slideUp":
                    this.animate({
                        top: open ? this.getTopPos(!(!this.options.follow[1] && this.fixedVPos || this.fixedPosStyle)) : this.d.scrollTop() + wH + this.buffer
                    });
                    break;
               default:
                    //Hardtyping 1 and 0 to ensure opacity 1 and not 0.9999998
                    this.$el.stop().show(this.options.speed, function(){$that.onCompleteCallback(open);});
            }
            
           
        },
        
        animate: function (css){
            this.$el
                .css({display: 'block',opacity: 1})
                .animate(css, this.options.speed, this.options.easing, function(){ this.onCompleteCallback(open); });
        },
        onCompleteCallback: function (open){
            if(open){
                //this.bindEvents();
                this.triggerCall(this.options.onCompleteCall);
                if(this.options.autoClose){
                    this.autoCloseTO = setTimeout($.proxy(this.close,this), this.options.autoClose);
                }
            } else {
                this.$el.hide();
                if (this.options.loadUrl) {
                    this.options.contentContainer.empty();
                    this.$el.css({height: 'auto', width: 'auto'});
                }
            }
        },
        
        getLeftPos: function (includeScroll){
            return includeScroll ? this.hPos + this.d.scrollLeft() : this.hPos;
        },
        
        getTopPos: function (includeScroll){
            return includeScroll ? this.vPos + this.d.scrollTop() : this.vPos;
        },
        
        triggerCall: function (func, arg) {
            $.isFunction(func) && func.call(this, arg);
        },
        
        calcPosition: function (){
            var wH = this.windowHeight();
            var wW = this.windowWidth();
            this.vPos        = this.fixedVPos ? this.options.position[1] : Math.max(0, ((wH- this.$el.outerHeight(true)) / 2) - this.options.amsl)
            ; this.hPos      = this.fixedHPos ? this.options.position[0] : (wW - this.$el.outerWidth(true)) / 2
            ; this.inside    = this.insideWindow();
        },
        
        insideWindow: function (){
            var wH = this.windowHeight();
            var wW = this.windowWidth();
            return {
                x: wW > this.$el.outerWidth(true),
                y: wH > this.$el.outerHeight(true)
            };
        },
        
        windowHeight: function (){
            return this.$w.height();
        },
        
        windowWidth: function (){
            return this.$w.width();
        }
    };

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DEFAULT VALUES
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $.hdfbPopup.defaults = {
          amsl: 			50
        , appending: 		true
        , appendTo: 		'body'
		, autoClose:		false
        , closeClass: 		'js-p-close'
        , content: 			'ajax' // ajax, iframe or image
        , contentContainer: false
		, easing: 			'swingfixed'        
        , escClose: 		true
        , follow: 			[true, true] // x, y
		, followEasing: 	'swing'
        , followSpeed: 		500
        , modal: 			false
        , modalClose: 		true
        , modalColor: 		'#000'
        , onClose: 			false
        , onOpen: 			false
        , opacity: 			0.5
        , position: 		['auto', 'auto'] // x, y,
        , positionStyle: 	'fixed'// absolute or fixed
        , scrollBar: 		true
		, speed: 			0 // open & close speed
		, transition:		'fadeIn' //transitions: fadeIn, slideDown, slideIn, slideBack
		, transitionClose:	false
        , onCompleteCall : false
    };

    $.fn.bPopup = function( options ) {
        if ( typeof options === 'string' ) {
            var args = Array.prototype.slice.call( arguments, 1 );
            this.each(function() {
                var instance = $.data( this, 'hdfbPopup' );
                if ( !instance ) {
                    logError( "cannot call methods on hdfbPopup prior to initialization; " +
                    "attempted to call method '" + options + "'" );
                    return;
                }
                if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
                    logError( "no such method '" + options + "' for hdfbPopup instance" );
                    return;
                }
                instance[ options ].apply( instance, args );
            });
        } 
        else {
            this.each(function() {  
                var instance = $.data( this, 'hdfbPopup' );
                if ( instance ) {
                    return this;
                }
                else {
                    instance = $.data( this, 'hdfbPopup', new $.hdfbPopup( options, this ) );
                }
            });
        }
        return this;
    };
})(jQuery);
