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
<button data-sc-item="tracked-item" title="Sample Tracked Item">Sample Tracked Item ("tracked-item" in map)</button>

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

### What's included:

#### scMap.js

* init: attach tracking events to elements with "data-sc-item" attribute with map key as value.
* attachLinkEvents: Adds 
* attachFormEvents:
* replaceWildCards:

#### Page Map



----------------------------------------

### More info:



----------------------------------------

### Thanks goes to...

 Sasha Sklar, Shiva Vannavada

