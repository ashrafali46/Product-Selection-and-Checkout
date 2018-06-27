		function updateItemCount(_inputElementId) {
			var inputElement = document.getElementById(_inputElementId)
				, _newCount =  Number(inputElement.value)
				, _existingCount = Number(inputElement.dataset.qtyInThisOrder);
			if (_newCount >= 0 && _newCount < 10) {
				inputElement.dataset.qtyInThisOrder = _newCount
				_price = Number(inputElement.dataset.itemPrice);
				var d = (_newCount - _existingCount)
				subTotalElement.innerHTML = Number(Number(subTotalElement.innerHTML) + (d * _price)).toFixed(2);
				inputElement.innerHTML = _newCount;
				inputElement.dataset.itemQty = _newCount;
			} else if (newCount < 0 || newCount > 9){
				alert("Quantities LESS than 0 and over 9 are non-deliverable but can be charged to your account as a tip for the delivery driver.\n\n\t\t\tContinue??")
			} else {
				alert("Must be a number, 0 thru 9")
			}
		}
		function increment(_inputElementId) {
			var e = document.getElementById(_inputElementId)
				, qty = Number(e.value);
			if (qty === 9) {
				alert("Quantities over 9 are non-deliverable but can be charged to your account as a tip for the delivery driver.\n\n\t\t\tContinue??")
			} else {
				qty++;
				e.value = qty;
				updateItemCount(_inputElementId);
			}
		}
		function decrement(_inputElementId) {
			var e = document.getElementById(_inputElementId)
				, qty = Number(e.value);
			if (qty === 0) {
				alert("Quantities LESS than 0 are non-deliverable but can be charged to your account as a tip for the delivery driver.\n\n\t\t\tContinue??")
			} else {
				qty--;
				e.value = qty;
				updateItemCount(_inputElementId);
			}
		}

		function addToCart() {
			//incrementShoppingCartCount();
			localStorage.setItem("shoppingCartSubTotal", subTotalElement.innerHTML)
			alert("yepYep");
		}
		function GetLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(onUpdateUserLocation, showError_GeolocationFailed);
			} else {
				var x = "Geolocation is not supported by this browser.";
				console.log("Geolocation is not supported by this browser.");
				alert(x);
			}
		}
		function onUpdateUserLocation(currentLocation) {
			gLat = currentLocation.coords.latitude;
			gLon = currentLocation.coords.longitude;
			localStorage.setItem("userCurrentLat", gLat);
			localStorage.setItem("userCurrentLon", gLon);
			console.log('UserLocation determined and set into localStorage. UserId: ' + localStorage.getItem("_id") + ' Lat: ' + localStorage.getItem("userCurrentLat") + ' Lon: ' + localStorage.getItem("userCurrentLon"));
			//alert('UserLocation determined and set into localStorage. UserId: ' + localStorage.getItem("_id") + ' Lat: ' + localStorage.getItem("userCurrentLat") + ' Lon: ' + localStorage.getItem("userCurrentLon"));
			//_id = _user.id;
			var _id = localStorage.getItem("_id")
			var userLocationObj = { userId: _id, latitude: gLat, longitude: gLon }
			jQuery.ajax(
				{
					url: '/LocationServices/API/UpdateUserLocation',
					type: "POST",
					async: true,
					data: JSON.stringify(userLocationObj),
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function () {
						//	alert("GeoLocation Successfull")
					},
					error: function (xhr, ajaxOptions, thrownError) {
						alert("appScript > event :: error" + xhr.responseText + xhr.status);
					}
				});
		}
		function showError_GeolocationFailed(error) {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					x.innerHTML = "User denied the request for Geolocation."
					break;
				case error.POSITION_UNAVAILABLE:
					x.innerHTML = "Location information is unavailable."
					break;
				case error.TIMEOUT:
					x.innerHTML = "The request to get user location timed out."
					break;
				case error.UNKNOWN_ERROR:
					x.innerHTML = "An unknown error occurred."
					break;
			}
		}
