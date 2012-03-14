var scMap;
var siteCatalyst = {
	init: function (el) {
		"use strict";
		if (typeof scMap !== "undefined") {
			var i, len, $el, $els, $forms;
			$el = !el ? document.querySelector('body') : document.querySelector(el);
			$els = $el.querySelectorAll('*[data-sc-item]:not(form)');
			len = $els.length;
			for (i = 0; i < len; i++) {
				siteCatalyst.attachLinkEvents($els[i]);
			}
			$forms = $el.querySelectorAll('form[data-sc-item]');
			len = $forms.length;
			for (i = 0; i < len; i++) {
				siteCatalyst.attachLinkEvents($forms[i]);
			}
		}
	},
	attachLinkEvents: function(el) {
		"use strict";
		var ev;
		ev = el.dataset.scEvent || 'click';
		el.addEventListener(ev,function(e) {
			var link = el.dataset.scUrl ? el.dataset.scUrl : e.target;
			var mapItem = el.dataset.scItem;
			for (var prop in scMap[mapItem]){
				s[prop] = siteCatalyst.replaceWildCards(scMap[mapItem][prop], el);
			}
			if (scMap[mapItem]) {
				s.tl(link,scMap[mapItem].type,s.linkTrackName);
			}
		});
	},
	attachFormSubmit: function(el) {
		"use strict";
		var link, mapItem;
		el.addEventListener('submit',function(e) {
			link = el.getAttribute('action');
			mapItem = el.dataset.scItem;
			for (var prop in scMap[mapItem]) {
				s[prop] = siteCatalyst.replaceWildCards(scMap[mapItem][prop], el);
			}
			
			if (scMap[mapItem]) {
				s.tl(link,scMap[mapItem].type,s.linkTrackName);
			}
		});
	},
	replaceWildCards: function(str,el) {
		"use strict";
		var i, len, pattern;
		pattern = new RegExp(/{(.*?)}/g); 
		if (pattern.test(str)) { 
			var wildcards = str.match(pattern);
			len = wildcards.length;
			for (i=0; i < len; i++){
				var atr = (/{(.*?)}/).exec(wildcards[i])[1];
				if (el.nodeName.toLowerCase() !== 'form') {
					str = str.replace(wildcards[i],el.getAttribute(atr));
				} else {
					str = str.replace('{'+ atr +'}',el.querySelector('*[name="'+ atr +'"]').value);
				}
			}
		}
		return str.replace(/\s+/g, '-');
	}
};