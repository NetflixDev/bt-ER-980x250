import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg, UIGroup } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import { titleTreatmentLayout } from './shared.js'

export default function stackedPostMarkup() {
	let T = View.endFrame

	// title treatment
	titleTreatmentLayout(T)

	// title treatment
	Align.set(T.tt, {
		x: Align.CENTER,
		y: Align.CENTER
	})

	Align.set(T.pedigree, {
		x: {
			type: Align.CENTER,
			against: T.tt
		},
		y: {
			type: Align.CENTER,
			against: 55
		}
	})

	/*-- Red.Component.cta_against_logo.start --*/
	// cta
	T.cta.resize()

	// logo
	Align.set(T.netflixLogo, {
		against: T.cta,
		x: {
			type: Align.CENTER
		},
		y: {
			type: Align.BOTTOM,
			outer: true,
			offset: 16
		}
	})

	/*-- Red.Component.cta_against_logo.end --*/
	if (adData.hasFTM) {
		// free trial messaging
		Styles.setCss(T.ftm, {
			color: '#fff',
			fontSize: 14,
			letterSpacing: 1,
			textAlign: 'center'
		})
		Align.set(T.ftm, {
			x: { type: Align.CENTER, against: T.cta },
			y: {
				type: Align.TOP,
				outer: true,
				against: T.cta,
				offset: -14
			}
		})
		T.removeChild(T.tuneIn)
	} else {
		// tune-in
		Styles.setCss(T.tuneIn, {
			color: '#fff',
			fontSize: 16,
			letterSpacing: 1,
			textAlign: 'center'
		})
		Align.set(T.tuneIn, {
			x: { type: Align.CENTER, against: T.cta },
			y: {
				type: Align.TOP,
				outer: true,
				against: T.cta,
				offset: -14
			}
		})
		T.removeChild(T.ftm)
	}

	// cta logo lockup
	const children = [T.cta, T.netflixLogo]

	if (adData.hasFTM) children.push(T.ftm)
	if (adData.hasTuneIn) children.push(T.tuneIn)

	T.ctaLogoLockup = new UIGroup({
		target: T,
		children
	})

	/*-- Red.Component.cta_logo_lockup_align.start --*/
	Align.set(T.ctaLogoLockup, {
		x: {
			type: Align.RIGHT,
			offset: -102
		},
		y: Align.CENTER
	})

	/*-- Red.Component.cta_logo_lockup_align.end --*/

	if (T.iris) {
		// ensure iris canvas drawer in front of everything
		T.appendChild(T.iris.canvas)
	}

	// ratings bug
	if (adData.hasRatings) {
		Align.set(T.ratingsBug, {
			x: {
				type: Align.RIGHT,
				offset: -5
			},
			y: {
				type: Align.BOTTOM,
				offset: -5
			}
		})
	} else {
		T.removeChild(T.ratingsBug)
	}
}
