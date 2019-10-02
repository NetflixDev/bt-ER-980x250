import { ImageManager } from "ad-control";
import { MonetUtils } from "ad-utils";

export default function AdData() {
  var self = this;

  /**
		EXTRACT JSON DATA
		Prepare dynamic data here.
	 */

  /**
		DYNAMIC IMAGES
		Dynamically loaded images need to be in their own directory, like "dynamic_images/".

		Then, you need to add your dynamic image-paths to the load-queue, so that when
		the secondary preload happens, these assets will get loaded. For example:

		self.theImageName = ImageManager.addToLoad(adParams.imagesPath + 'sample.jpg');
	 */

  self.fonts = {
    primary: "template_font"
  };

  self.colors = {
    white: "#F5F5F1",
    grey: "#221F1F",
    red: "#E50914",
    black: "#000000"
  };

  // Store svg markup for use in all UISvg instances, reduces duplicate code across builds.  See UISvg.
  self.svg = {};

  // indicates whether previewing on C2.0 Builder
  const previewParam = window.getQueryParams().builder_preview;
  self.inBuilder = !!previewParam && previewParam !== "false";

  // treatment data
  self.useSupercut =
    MonetUtils.getDataByKey("Toggle_Supercut") &&
    MonetUtils.getDataByKey("Supercut_Video");
  self.isRTL = window.Monet && window.Monet.isRTL();
  self.hasTT = !!MonetUtils.getDataByKey("Title_Image");
  self.hasRatings =
    self.inBuilder || !!MonetUtils.getDataByKey("Ratings_Bug_Image");
  self.ratingsKey = self.inBuilder
    ? "treatment-assets/ratings_bug_fpo.png"
    : "Ratings_Bug";
  self.titleText = MonetUtils.getDataByKey("Title_Text");
  self.headlineText = MonetUtils.getDataByKey("Headline_Text");
  self.descriptionText = MonetUtils.getDataByKey("Description_Text");
  self.retinaTT = true;
}
