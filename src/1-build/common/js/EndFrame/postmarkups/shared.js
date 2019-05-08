import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'

export function titleTreatmentLayout(T) {
	// title treatment:
	// no TT url provided
	// so using default TT for given layout
	if (!adData.hasTT) {
		// removing empty netflix-img element before using default TT
		T.removeChild(T.tt)
		T.tt = new UIImage({
			target: T,
			source: adData.ttSrc
		})
	}

	// use UIImage or (netflix-img > img) element to get TT's dimensions
	const ttImgElement = adData.hasTT ? T.tt.querySelector('img') : T.tt
	const ttIsAdSized = ttImgElement.width === adParams.adWidth && ttImgElement.height === adParams.adHeight
	const ttCenter = adData.ttCenter || {
		x: ~~(adParams.adWidth / 2),
		y: ~~(adParams.adHeight / 2)
	}

	Align.set(
		T.tt,
		ttIsAdSized
			? Align.CENTER
			: {
					x: {
						type: Align.CENTER,
						against: ttCenter.x
					},
					y: {
						type: Align.CENTER,
						against: ttCenter.y
					}
			  }
	)
}
