import { Styles, Markup, Align, Effects } from 'ad-view'

export class Animation {
	static start() {
		console.log('Animation.start()')
		// show the main container
		global.removePreloader()
		Styles.setCss(View.main, { opacity: 1 })

		if (View.ribbon) {
			View.ribbon.play()
		} else {
			Animation.playIntro()
		}
	}

	// IMPORTANT!!! Call this function when your animation is complete!
	static complete() {
		console.log('Animation.complete()')
	}

	static playIntro() {
		if (View.intro) {
			Styles.setCss(View.intro.netflixLogo, { opacity: 1 })
			View.intro.introVideoPlayer.play()

			TweenLite.delayedCall(2.5, function() {
				View.intro.netflixLogo.reverse()
			})
			TweenLite.delayedCall(6, function() {
				View.intro.netflixLogo.play()
			})
			TweenLite.to(View.intro.netflixLogo, 0.25, { delay: 8, alpha: 0 })
		} else {
			Animation.showEndFrame()
		}
	}

	static showEndFrame() {
		console.log('Animation.showEndFrame()')

		if (View.intro) View.intro.hide()
		View.endFrame.show()

		const creative = new Creative()
		creative.play()
	}
}
