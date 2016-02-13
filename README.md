## About ##

JS-ISM (Javascript Ice Sheet Model) is an educational numerical model of the Greenland and East Antarctic ice sheets, which runs interactively in a browser. The model allows users to simulate the behaviour of both ice sheets under different climate scenarios, as well as to look at the effects of different physical processes on the results. 

Numerically, the model is a reimplementation of Frank Pattyn's Excel-based [GRANTISM][grantism] - a flowline model using the Shallow Ice Approximation. It includes basal sliding and isostatic adjustment of the bedrock, as well as simplified models of thermomechanical coupling and sea level adjustment.

The model is designed so that it should be easy to provide different interfaces for different classes of user, with some basic knowledge of HTML. A sample interface is provided.

If you want to play with a copy of JS-ISM, there's a version online [here][jsism]. There are also some basic teaching materials available [here][practical] and [here][model], although these are not up-to-date with the current interface.

## Dependencies ##

The following external libraries are used by the model, and included in the `external` directory. You may want to replace them with your own locally installed copies.

 * [Bootstrap slider](https://github.com/seiyria/bootstrap-slider)
 * [Flot axis-labels](https://github.com/markrcote/flot-axislabels)

There are also some libraries which are loaded via a CDN. You can probably get by without your own copy of these, unless you need a version of the model which can run offline.

 * [Bootstrap](http://getbootstrap.com) - interface styling
 * [jQuery](http://jquery.com) - utilities for Javascript on the web
 * [Flot](http://www.flotcharts.org) - graph plotting

## License ##

JS-ISM is released under an MIT license.


[grantism]: http://homepages.ulb.ac.be/~fpattyn/grantism/welcome.html
[jsism]: http://mewo2.com/ism.html
[practical]: http://mewo2.com/assets/practical.pdf
[model]: http://mewo2.com/assets/model.pdf
