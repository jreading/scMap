var siteCatalyst = {
	init: function(el) {
		if (typeof scMap != "undefined") {
			$el = !el ? $('body') : $(el);
			$('*[data-sc-item]:not(form)',$el).each($.proxy(function(idx,el) {
				this.attachLinkEvents(el);
			},this));
			$('form[data-sc-item]',$el).each($.proxy(function(idx,el) {
				this.attachFormSubmit($(el));
			},this));
		}
	},
	attachLinkEvents: function(el) {
		ev = $(el).data('sc-event') ? $(el).data('sc-event') : 'click';
		$(el).bind(ev,function(e) {
			link = $(el).data('sc-url') ? $(el).data('sc-url') : e.target;
			mapItem = $(el).data('sc-item');
			for (prop in scMap[mapItem]){
				s[prop] = siteCatalyst.replaceWildCards(scMap[mapItem][prop], el);
			}
			if (scMap[mapItem]) s.tl(link,scMap[mapItem]["type"],s['linkTrackName']);
		});
	},
	attachFormSubmit: function(el) {
		$(el).bind('submit',function(e) {
			link = $(el).attr('action');
			mapItem = $(el).data('sc-item');
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
			for (i=0; i < wildcards.length; i++){
				atr = (/{(.*?)}/).exec(wildcards[i])[1];
				if ($(el).get(0).nodeName.toLowerCase() != 'form') {
					str = str.replace(wildcards[i],$(el).attr(atr));
				} else {
					str = str.replace('{'+ atr +'}',$('*[name="'+ atr +'"]',el).val());
				}
			}
		}
		return str.replace(/\s+/g, '-');
	}
};