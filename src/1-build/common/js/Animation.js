import { Styles, Markup, Align, Effects } from 'ad-view'

export class Animation {
	static start() {
		console.log('Animation.start()')
		// show the main container
		global.removePreloader()
		Styles.setCss(View.main, { opacity: 1 })
		Animation.playIntro()
	}

	// IMPORTANT!!! Call this function when your animation is complete!
	static complete() {
		console.log('Animation.complete()')
	}

	static playIntro() {
		Animation.showEndFrame()
	}

	static showEndFrame() {
		console.log('Animation.showEndFrame()')

		if (View.intro) View.intro.hide()
		View.endFrame.show()

		const creative = new Creative()
		creative.play()
	}
}
