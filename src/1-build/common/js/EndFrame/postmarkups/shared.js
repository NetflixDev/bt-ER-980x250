import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIImage, TextFormat, UITextField, UIGroup } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'

export function titleTreatmentLayout(T) {
	Align.set(T.tt, Align.CENTER)
}

export function sideBySideBrandingLockup(T, { ctaLogoOffset, tuneInFontSize, tuneInLockupOffset, brandingLockupAlign }) {
	// cta
	T.cta.resize()

	// logo
	Align.set(T.netflixLogo, {
		x: {
			type: Align.LEFT,
			outer: true,
			against: T.cta,
			offset: -ctaLogoOffset
		}
	})

	// lockup to position CTA and logo together
	T.brandingLockup = new UIGroup({
		target: T,
		children: [T.cta, T.netflixLogo]
	})

	if (adData.hasFTM) {
		// free trial messaging
		Styles.setCss(T.ftm, {
			color: '#fff',
			fontSize: tuneInFontSize - 2,
			letterSpacing: 1,
			textAlign: 'center'
		})
		Align.set(T.ftm, {
			x: { type: Align.CENTER, against: T.brandingLockup },
			y: {
				type: Align.TOP,
				outer: true,
				against: T.brandingLockup,
				offset: -tuneInLockupOffset
			}
		})
		T.removeChild(T.tuneIn)
	} else {
		// tune-in
		Styles.setCss(T.tuneIn, {
			color: '#fff',
			fontSize: tuneInFontSize,
			letterSpacing: 1,
			textAlign: 'center'
		})
		Align.set(T.tuneIn, {
			x: { type: Align.CENTER, against: T.brandingLockup },
			y: {
				type: Align.TOP,
				outer: true,
				against: T.brandingLockup,
				offset: -tuneInLockupOffset
			}
		})
		T.removeChild(T.ftm)
	}

	// add tune-in/ftm to lockup if exists
	if (adData.hasTuneIn || adData.hasFTM) {
		const children = [T.brandingLockup]
		children.push(adData.hasTuneIn ? T.tuneIn : T.ftm)

		T.brandingLockup = new UIGroup({
			target: T,
			children
		})
	}

	Align.set(T.brandingLockup, brandingLockupAlign)
}

export function stackedBrandingLockup(
	T,
	{
		// offset between elements in branding lockup
		brandingLockupOffset,
		// describe how to align branding lockup elems against each other
		brandingLockupElemXAlign,
		// Align value for entire branding lockup
		brandingLockupAlign,
		tuneInFontSize
	}
) {
	// positioning CTA atop logo
	T.cta.resize()
	Align.set(T.cta, {
		against: T.netflixLogo,
		x: brandingLockupElemXAlign,
		y: {
			type: Align.TOP,
			outer: true,
			offset: -brandingLockupOffset
		}
	})

	const xAlignMatch = /((?:left)|(?:center)|(?:right))/i.exec(brandingLockupElemXAlign)
	const textAlign = xAlignMatch && xAlignMatch[1].toLowerCase()

	// positioning tune-in/FTM atop CTA
	if (adData.hasFTM) {
		// free trial messaging
		Styles.setCss(T.ftm, {
			color: '#fff',
			fontSize: tuneInFontSize - 2,
			letterSpacing: 1,
			textAlign
		})
		Align.set(T.ftm, {
			x: { type: brandingLockupElemXAlign, against: T.cta },
			y: {
				type: Align.TOP,
				outer: true,
				against: T.cta,
				offset: -(brandingLockupOffset - 4)
			}
		})
		T.removeChild(T.tuneIn)
	} else {
		// tune-in
		Styles.setCss(T.tuneIn, {
			color: '#fff',
			fontSize: tuneInFontSize,
			letterSpacing: 1,
			textAlign
		})
		Align.set(T.tuneIn, {
			x: { type: brandingLockupElemXAlign, against: T.cta },
			y: {
				type: Align.TOP,
				outer: true,
				against: T.cta,
				offset: -(brandingLockupOffset - 4)
			}
		})
		T.removeChild(T.ftm)
	}

	// lockup to position branding elems together
	const children = [T.cta, T.netflixLogo]

	if (adData.hasFTM) children.push(T.ftm)
	if (adData.hasTuneIn) children.push(T.tuneIn)

	T.brandingLockup = new UIGroup({
		target: T,
		children,
		align: brandingLockupAlign
	})
}
