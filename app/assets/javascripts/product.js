$( document ).ready(function() {
 	var api_key = 'hudjsdf23nnxvuufftpw3b87';
 // 	var re = /:/gi;
	// var date = new Date();
	// var iso = date.toISOString().replace(re,'%3A');
	// var regionName = 'us-east-1';


	$('#search').on('submit', function(event){
		event.preventDefault();
		var input = $('#product').val();
		var skuIndex = input.indexOf('sku');
		var sku = input.slice(skuIndex + 6, skuIndex + 13)
		bestbuySearch(sku);
		console.log(input);
		console.log(sku);
		this.reset();
		// amazonQuery(search);
	});

	// function bbUrlSanitize(url){
	// 	$('#search').remove();
	// 	var skuIndex = url.indexOf('sku');
	// 	var sku = url.slice(skuIndex + 6, skuIndex + 13)
	// 	console.log(sku);
	// 	bestbuySearch(sku);
	// }

	function bestbuySearch(query){
		$.ajax({
			url: "http://api.remix.bestbuy.com/v1/products/"+query+".json?apiKey="+api_key+"",
			cache: true,
			dataType: 'jsonp',
			method: 'GET',
			success: function(data){
				var name = data.name;
				var asin = data.sku;
				var description = data.shortDescription;
				var price = data.salePrice;
				var regPrice = data.regularPrice;
				var url = data.url;
				var img_url = data.mediumImage;
				$.ajax({
					url: '/wishlists/:wishlist_id/products',
					dataType: 'json',
					method: 'POST',
					data: { product: {name: name, asin: asin, description: description, price: price, regPrice: regPrice, url: url, img_url: img_url}},
					success: function(data){
						console.log(data);
					}
				})
				$('#product-list ul').append("<li><a class='expand'><div class='right-arrow'>+</div><div class='img_url'><img src="+img_url+"></div><div class='large-5 columns'><h3>"+name+"</h3></div><div class='large-2 columns'><span>"+price+"</span></div><div class='large-2 columns'></div></a><div class='detail'><div><span>"+description+"</span></div><br/><%= link_to 'Destroy', product, method: :delete, data: { confirm: 'Are you sure?' } %></div></div></li>");
				// productAppend(name, asin, description, price, regPrice, url, img_url);
			}
		})
	}

	function productAppend(name, asin, description, price, regPrice, url, img_url){
		console.log(this);
		$.ajax({
			url: '/wishlists/:wishlist_id/products',
			dataType: 'json',
			method: 'GET',
			data: { product: {name: name, asin: asin, description: description, price: price, regPrice: regPrice, url: url, img_url: img_url}},
			success: function(){
				console.log(this);
			}
		})
	}

	// function amazonQuery(query){
		
	// 	url = "http://webservices.amazon.com/onca/xml?AWSAccessKeyId="+ api_key +"&AssociateTag=contango0c-20&Condition=New&Keywords="+ query +"&Operation=ItemSearch&ResponseGroup=ItemAttributes&SearchIndex=All&Service=AWSECommerceService&Timestamp="+ iso +"&Version=2011-08-01&Signature=vBYxG4JMOkyDjE04gltl02Cpsv8odGiUohpzENp4Qhg%3D";
	// 	console.log(url);
	// 	console.log(iso);
		
		// $.ajax({
		// 	url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
		// 	method: "GET",
		// 	dataType: 'jsonp',
		// 	success: function(xml){
		// 		asin = xml;
		// 		console.log(asin);
		// 		console.log('working');
		// 	}
		// })

		// var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"') + '&format=xml&callback=?';

		// Request that YSQL string, and run a callback function.
		// Pass a defined function to prevent cache-busting.
		// $.getJSON(yql, function(data){
// 		    console.log(data.results[0]);
// 		    asin = data.ItemSearchResponse;
// 		    console.log(asin);
// 		});
// 	}


// 	function getSignatureKey(string) {

	
// 	  var kSigning= Crypto.HMAC(Crypto.SHA256, string, { asBytes: true });

// 	   return kSigning;
// 	}
// f45dee862fd03fe5ff267156857049d7a68fdc62a798a9984c2004d20d668a95
// 	getSignatureKey('GET\nwebservices.amazon.com\n/onca/xml\nAWSAccessKeyId=AKIAJ5CS5S72UJPLAVDQ&AssociateTag=contango0c-20&Condition=All&IdType=ASIN&ItemId=B008URBC9I&Operation=ItemLookup&ResponseGroup=ItemAttributes&Service=AWSECommerceService&Timestamp=2014-10-29T13%3A53%3A58.000Z&Version=2011-08-01');

 $(".expand").on( "click", function() {
 		console.log(this);
    $(this).next().slideToggle();
    $expand = $(this).find(">:first-child");
    
    if($expand.text() == "+") {
      $expand.text("-");
    } else {
      $expand.text("+");
    }
  });

});



