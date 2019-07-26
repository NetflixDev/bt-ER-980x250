import { Styles, Markup, Align, Effects } from "ad-view";

export class Animation {
  static start() {
    console.log("Animation.start()");
    // show the main container
    TweenLite.delayedCall(0.1, () => {
      global.removePreloader();
    });
    TweenLite.set(View.main, { opacity: 1 });

    const RIBBON_ANIM_TIME = 0.6;
    const RIBBON_START = 0.75;
    const INIT_ZOOM_START = 0;
    const INIT_ZOOM_SCALE = 5;
    const INIT_ZOOM_DURATION = RIBBON_START + RIBBON_ANIM_TIME;

    if (adData.useSupercut) {
      if (View.endFrame.iris) {
        TweenLite.set(View.endFrame.iris.canvas, { opacity: 0 });
      }
      View.endFrame.show();
      // have Netflix logo already fully in
      View.endFrame.netflixLogo.progress(1);

      const _subScale = 1 + (INIT_ZOOM_SCALE - 1) * 0.03;
      const _timeOffset = INIT_ZOOM_DURATION * 0.3;
      TweenLite.to(View.endFrame, INIT_ZOOM_DURATION, {
        delay: INIT_ZOOM_START,
        scale: _subScale,
        ease: Linear.easeNone
      });
      TweenLite.to(View.endFrame.subLayer, INIT_ZOOM_DURATION - _timeOffset, {
        delay: INIT_ZOOM_START + _timeOffset,
        scale: INIT_ZOOM_SCALE - _subScale,
        ease: Expo.easeIn
      });

      TweenLite.delayedCall(RIBBON_START, () => {
        View.ribbon.play();
      });
    } else {
      View.ribbon.play();
    }
  }

  // IMPORTANT!!! Call this function when your animation is complete!
  static complete() {
    console.log("Animation.complete()");
  }

  static playIntro() {
    if (View.intro) {
      Styles.setCss(View.intro.netflixLogo, { opacity: 1 });
      View.intro.introVideoPlayer.play();

      TweenLite.delayedCall(2.5, function() {
        View.intro.netflixLogo.reverse();
      });
      TweenLite.delayedCall(6, function() {
        View.intro.netflixLogo.play();
      });
      TweenLite.to(View.intro.netflixLogo, 0.25, { delay: 8, alpha: 0 });
    } else {
      Animation.showEndFrame();
    }
  }

  static showEndFrame() {
    console.log("Animation.showEndFrame()");
    if (adData.useSupercut) {
      // reset endframe after ribbon and supercut
      View.endFrame.netflixLogo.progress(0);
      if (View.endFrame.iris) {
        TweenLite.set(View.endFrame.iris.canvas, { opacity: 1 });
      }
      TweenLite.set([View.endFrame, View.endFrame.subLayer], { scale: 1 });
    }

    if (View.intro) View.intro.hide();
    View.endFrame.show();

    const creative = new Creative();
    if (creative.init) {
      creative.init();
    }

    if (adData.useSupercut) {
      creative.play();
    }
  }

  static playCreative() {
    console.log("Animation.playCreative()");
    const creative = new Creative();
    creative.play();
  }
}
