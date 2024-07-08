(function() {
	var targetWindow = null;
	var targetOrigin = null;

	var carrdSuccess = null;
	var carrdFailure = null;

	window.addEventListener('message', function(event) {
		// Only accept our own events
		if (!event.data.type || !event.data.type.startsWith('substack-subscribers:')) return;

		switch (event.data.type) {
			// Use iframe's init event to discover the techtrails window & domain
			case 'substack-subscribers:init':
				targetWindow = event.source;
				targetOrigin = event.origin;

				// Acknowledge receipt of event
				targetWindow.postMessage({
					type: 'substack-subscribers:ack'
				}, targetOrigin);
				break;

			// Subscription successfully sent to Substack \o/
			case 'substack-subscribers:subscribed':
				// Success function is provided by Carrd
				carrdSuccess();
				break;

			// Handle ubscription error
			case 'substack-subscribers:error':
				alert('There was an error registering your email to the mailing list.\nYou can head over to techtrails.io if the problem persists');
				console.error(event.data.body);
				carrdFailure();
				break;
		}
	});

	// Export a global Techtrails.subscribeEmail function that can be used by the form's submit event
	window.Techtrails = {
		subscribeEmail: function(email, success, failure) {
			// Store success & failure functions locally
			carrdSuccess = success
			carrdFailure = failure

			// Dispatch email to iframe for subscription
			targetWindow.postMessage({
				type: 'substack-subscribers:subscribe',
				email: email
			}, targetOrigin);
		}
	}
})()