
    var rAF = function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();
    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();
    var loop = function () {
        var now = Date.now();
        var fs = (now - lastFameTime);
        var fps = Math.round(1000 / fs);

        lastFameTime = now;
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
            var fps = Math.round((frame * 1000) / (now - lastTime));
            $("#fabtn_blog_fps span").html("<sup>FPS: </sup>"+fps);
            if(fps >= 100){fps=100;$("#fabtn_fps_progress_bar").width("100%");}else{$("#fabtn_fps_progress_bar").width(fps + "%");}
            frame = 0;
            lastTime = now;
        };

        rAF(loop);
    }

    loop();