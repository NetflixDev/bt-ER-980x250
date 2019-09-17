import { Core } from "ad-control";
import { Preflight } from "@common/js/Preflight.js";
import {
  EndFrame,
  Main,
  Intro,
  NetflixRibbon,
  MainBorder
} from "@common/js/Build.js";
import { Animation } from "@common/js/Animation.js";
import { Control } from "@common/js/Control.js";
import { Device } from "ad-external";

export class Ad {
  // called from index.html onImpression()
  static launch(fbaContent) {
    console.log("Ad.launch()");
    Core.init(fbaContent)
      .then(() => Preflight.init())
      .then(() => Core.loadDynamic())
      .then(() => Ad.prepare())
      .catch(err => {
        throw err;
      });
  }

  static prepare() {
    console.log("Ad.prepare()");
    Control.preMarkup();

    View.main = new Main();
    View.endFrame = new EndFrame({
      target: View.main,
      layout: window.Creative && Creative.layout
    });

    View.ribbon = new NetflixRibbon();
    View.ribbon.addEventListener("coverComplete", function(event) {
      event.stopImmediatePropagation(); // this event was coming through twice
      Animation.playIntro();
    });

    View.ribbon.addEventListener("leftPillarComplete", function(event) {
      event.stopImmediatePropagation(); // this event was coming through twice
      if (!adData.useSupercut) {
        Animation.playCreative();
      }
    });

    if (adData.useSupercut && Device.type === "desktop") {
      View.intro = new Intro({ target: View.main });
    }

    View.mainBorder = new MainBorder();

    if (View.monetIntegrator.hasAttribute("allComponentsReady")) {
      Control.handleMonetLoadComplete(View.monetIntegrator);
    } else {
      View.monetIntegrator.addEventListener("allComponentsReady", function(
        event
      ) {
        Control.handleMonetLoadComplete(View.monetIntegrator);
      });
    }
  }
}
window.Ad = Ad;
