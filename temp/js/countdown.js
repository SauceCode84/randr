/*global jQuery:false */
(function($) {
   "use strict";
	$.fn.countdown = function(options, callback, interval) {

		//custom 'this' selector
		var thisEl = $(this);

		//array of custom settings
		var settings = { 
			'date': null,
			'format': null
		};

		//append the settings array to options
		if(options) {
			$.extend(settings, options);
		}
		
		//main countdown function
		function countdown_proc() {
			
			var moCurrent = moment();
			var moBigDay = moment(settings.date);
			var diff = moment.duration(moBigDay.diff(moCurrent));

			//console.log(moCurrent);
			//console.log(moBigDay);
			//console.log(diff);

			var eventDate = Date.parse(settings.date) / 1000;
			var currentDate = Math.floor($.now() / 1000);
			
			if(eventDate <= currentDate) {
                /*jshint validthis:true */
				callback.call(this);
				clearInterval(interval);
			}
			
			var seconds = diff.seconds();
			var minutes = diff.minutes();
			var hours = diff.hours();
			var days = diff.days();
			var months = diff.months();

			//conditional Ss
            /*jshint validthis:true */
			if (seconds === 1) { thisEl.find(".timeRefSeconds").text("second"); } else { thisEl.find(".timeRefSeconds").text("seconds"); }
			if (minutes === 1) { thisEl.find(".timeRefMinutes").text("minute"); } else { thisEl.find(".timeRefMinutes").text("minutes"); }
			if (hours === 1) { thisEl.find(".timeRefHours").text("hour"); } else { thisEl.find(".timeRefHours").text("hours"); }
			if (days === 1) { thisEl.find(".timeRefDays").text("day"); } else { thisEl.find(".timeRefDays").text("days"); }
			if (months === 1) { thisEl.find(".timeRefMonths").text("month"); } else { thisEl.find(".timeRefMonths").text("months"); }
						
			//logic for the two_digits ON setting
			if(settings.format === "on") {
				seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
				minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
				hours = (String(hours).length >= 2) ? hours : "0" + hours;
				days = (String(days).length >= 2) ? days : "0" + days;
				months = (String(months).length >= 2) ? months : "0" + months;
			}
			
			//update the countdown's html values.
			if(!isNaN(eventDate)) {
				thisEl.find(".seconds").text(seconds);
				thisEl.find(".minutes").text(minutes);
				thisEl.find(".hours").text(hours);
				thisEl.find(".days").text(days);
				thisEl.find(".months").text(months);
			} else { 
				clearInterval(interval); 
			}
		}
		
		//run the function
		countdown_proc();
		
		//loop the function
		interval = setInterval(countdown_proc, 1000);		
    };
}) (jQuery);