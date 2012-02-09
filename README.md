scMap
=====================

v0.9

Mapping templates for Omniture / SiteCatalyst

----------------------------------------

### What it is:

A mapping template for Omniture custom link tracking that use data attributes as keys. 

----------------------------------------

### How it works:

scMap uses data attributes to associate elements with a object literal map. Map items can be shared for common tracking tasks that use the same properties. Wildcards ( {attribute} ) can be used to place unique values in the tracking instance.

```bash
<button data-sc-item="tracked-item" title="Sample Tracked Item">...</button>

<form action="#" data-sc-item="tracked-form">
	<label>Name <input type="text" name="name" required="required"></label>
	<label>Email <input type="email" name="email" required="required"></label>
	<button type="submit">SUBMIT</button>
</form>
```

----------------------------------------

### What's included:

#### scMap.js

* init: attach tracking events to elements with "data-sc-item" attribute with map key as value.
* attachLinkEvents: Adds tracking to custom link.
* attachFormEvents: Adds tracking to form submissions. Form element values can be used as wildcards.
* replaceWildCards: Replaces wildcards in map with attribute values or form values.

Optional

* data-sc-event: user event (default is 'click')
```
<button data-sc-event="mouseover" data-sc-item="tracked-item" title="Sample Tracked Item">...</button>
```

* data-sc-url: url to track if not a link (default is event target)
```
<button data-sc-url="somewhere.html" data-sc-item="tracked-item" title="Sample Tracked Item">...</button>
```



* init argument: use init(element) to scope DOM elements i.e. an ajax response (default is 'body')
```
siteCatalyst.init($('ajax-response-wrapper'));
```

#### Page Map
```bash
scMap = {
	/*
	 * Any property in "s" can be added through the map. 
	 * Wildcards that are escaped with { }  will be replaced
	 * with the elements matching attribute.
	 */
	'tracked-item' : {
		'linkTrackName':'Button-{title}',
		'linkTrackVars':'products,events,eVar9',
		'linkTrackEvents':'event9',
		'type':'o', 
		'products':'product',
		'eVar9': 'Just a button',
		'events':'event9'
	}
```


----------------------------------------

### More info:

Check the demo page.

http://blogs.omniture.com/2009/03/12/custom-link-tracking-capturing-user-actions/


----------------------------------------

### Thanks goes to...

 Sasha Sklar, Shiva Vannavada

