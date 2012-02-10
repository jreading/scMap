var siteCatalyst = {
	init: function(el) {
		if (typeof scMap != "undefined") {
			$el = !el ? document.querySelector('body') : document.querySelector(el);
			
			$els = $el.querySelectorAll('*[data-sc-item]:not(form)');
			for (var i = 0; i < $els.length; i++) {
				siteCatalyst.attachLinkEvents($els[i]);
			}
			
			$forms = $el.querySelectorAll('form[data-sc-item]');
			for (var i = 0; i < $forms.length; i++) {
				siteCatalyst.attachLinkEvents($forms[i]);
			}
		}
	},
	attachLinkEvents: function(el) {
		ev = el.dataset.scEvent ? el.dataset.scEvent : 'click';
		el.addEventListener(ev,function(e) {
			link = el.dataset.scUrl ? el.dataset.scUrl : e.target;
			mapItem = el.dataset.scItem;
			for (prop in scMap[mapItem]){
				s[prop] = siteCatalyst.replaceWildCards(scMap[mapItem][prop], el);
			}
			if (scMap[mapItem]) s.tl(link,scMap[mapItem]["type"],s['linkTrackName']);
		});
	},
	attachFormSubmit: function(el) {
		el.addEventListener('submit',function(e) {
			link = el.getAttribute('action');
			mapItem = el.dataset.scItem;
			for (prop in scMap[mapItem]) {
				s[prop] = siteCatalyst.replaceWildCards(scMap[mapItem][prop], el);
			}
			
			if (scMap[mapItem]) s.tl(link,scMap[mapItem]["type"],s['linkTrackName']);
		});
	},
	replaceWildCards: function(str,el) {
		pattern = new RegExp(/{(.*?)}/g); 
		if (pattern.test(str)) { 
			wildcards = str.match(pattern);
			for (var i=0; i < wildcards.length; i++){
				atr = (/{(.*?)}/).exec(wildcards[i])[1];
				if (el.nodeName.toLowerCase() != 'form') {
					str = str.replace(wildcards[i],el.getAttribute(atr));
				} else {
					str = str.replace('{'+ atr +'}',el.querySelector('*[name="'+ atr +'"]').value);
				}
			}
		}
		return str.replace(/\s+/g, '-');
	}
};