var Creative = function() {
  this.play = function() {
    console.log("Creative.play()");
    var delay = 0;
    TweenLite.from(View.endFrame.background, 1.5, { alpha: 0, delay: delay });
    TweenLite.from(View.endFrame.tuneIn, 1.5, { alpha: 0, delay: delay });
    TweenLite.from(View.endFrame.ftm, 1.5, { alpha: 0, delay: delay });
    TweenLite.from(View.endFrame.netflixLogo, 1.5, { alpha: 0, delay: delay });
    TweenLite.from(View.endFrame.cta, 1.5, { alpha: 0, delay: delay });

    TweenLite.delayedCall(delay, function() {
      View.endFrame.netflixLogo.play();
    });
  };
};
