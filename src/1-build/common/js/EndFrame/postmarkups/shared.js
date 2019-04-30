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
			source: adData.ttSrc,
			css: {
				width: adParams.adWidth
			}
		})
	}

	Align.set(T.tt, Align.CENTER)
}
