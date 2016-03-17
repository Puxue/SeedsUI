(function(){
    window.Clock=function(container,params){
        /*================
        Module
        =================*/
        var defaults={
            "time":"00:00",
            "hourClass":"hour",
            "minuteClass":"minute"
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        var s=this;
        //Params
        s.params = params;
        //Container
        s.container=typeof container === "string"?document.querySelector(container):container;
        //Container-Hour|Minute
        s.hour=s.container.querySelector("."+s.params.hourClass);
        s.minute=s.container.querySelector("."+s.params.minuteClass);

        /*================
        Method
        =================*/
        s.updateClock=function(time){
            if(time)s.params.time=time;
            if(!/\d{1,2}:\d{1,2}/.test(s.params.time)){
                console.log("时间格式应为xx:xx");
                return;
            }
            var hourMinute=s.params.time.split(":");
            var hourDeg=s.getHourDeg(hourMinute[0]);
            var minuteDeg=s.getMinuteDeg(hourMinute[1]);
            s.hour.style.WebkitTransform="rotate("+hourDeg+"deg)";
            s.minute.style.WebkitTransform="rotate("+minuteDeg+"deg)";
        }
        s.getHourDeg=function(hour){
            return hour*30;
        }
        s.getMinuteDeg=function(minute){
            return minute*6;
        }

        /*================
        Entry
        =================*/
        s.init=function(){
            s.updateClock();
        }
        s.init();
        //Return Clock instance
        return s;
    }
    window.DataClock=function(){
        var clocks=document.querySelectorAll("[data-clock]");
        clocks.containers=[];
        for(var i=0,clock;clock=clocks[i++];){
            clocks.containers[i]=new Clock(clock,{
                "time":clock.getAttribute("data-clock")
            })
        }
        return clocks;
    }
})();