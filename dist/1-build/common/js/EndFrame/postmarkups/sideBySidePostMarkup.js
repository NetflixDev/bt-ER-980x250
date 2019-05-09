import '@netflixadseng/wc-netflix-brand-logo'
import '@netflixadseng/wc-netflix-cta'
import '@netflixadseng/wc-netflix-text'
import '@netflixadseng/wc-netflix-img'
import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import '@netflixadseng/wc-netflix-flushed-ribbon'
import '@netflixadseng/wc-netflix-video'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg, UIGroup } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import { titleTreatmentLayout } from './shared.js'

export default function sideBySidePostMarkup({ ctaLogoPostMarkup = function(T) {} }) {
	let T = View.endFrame

	// title treatment
	titleTreatmentLayout(T)

	Align.set(T.pedigree, {
		x: {
			type: Align.CENTER,
			against: T.tt
		},
		y: {
			type: Align.CENTER,
			against: 65
		}
	})

	// cta
	var logoCtaY = adData.hasFTM || adData.hasTuneIn ? 45 : 32
	T.cta.resize()
	Align.set(T.cta, {
		x: {
			type: Align.RIGHT,
			offset: -20
		},
		y: {
			type: Align.TOP,
			offset: logoCtaY
		}
	})

	// logo
	Align.set(T.netflixLogo, {
		x: {
			type: Align.LEFT,
			outer: true,
			against: T.cta,
			offset: -14
		},
		y: {
			type: Align.TOP,
			offset: logoCtaY
		}
	})

	// lockup to position CTA and logo together
	T.ctaLogoLockup = new UIGroup({
		target: T,
		children: [T.cta, T.netflixLogo]
	})

	ctaLogoPostMarkup(T)

	if (adData.hasFTM) {
		// free trial messaging
		Styles.setCss(T.ftm, {
			color: '#fff',
			fontSize: 14,
			letterSpacing: 1,
			textAlign: 'center'
		})
		Align.set(T.ftm, {
			x: { type: Align.CENTER, against: T.ctaLogoLockup },
			y: {
				type: Align.TOP,
				outer: true,
				against: T.ctaLogoLockup,
				offset: -8
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
			x: { type: Align.CENTER, against: T.ctaLogoLockup },
			y: {
				type: Align.TOP,
				outer: true,
				against: T.ctaLogoLockup,
				offset: -8
			}
		})
		T.removeChild(T.ftm)
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
