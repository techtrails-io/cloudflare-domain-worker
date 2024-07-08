import { Router } from 'itty-router';
// @ts-ignore
import subscribersIndex from './static/substack-subscribers-index.html';

class ElementHandler {
	element(element: Element) {
		element.append(
			'<script defer data-domain="techtrails.io" data-api="https://owl.techtrails.workers.dev/techtrails/owl" src="https://owl.techtrails.workers.dev/techtrails/script.js"></script>',
			{ html: true }
		);
	}
}

export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request, env, ctx): Promise<Response> {
		ctx.passThroughOnException();

		const router = Router();

		// Substack subscribers iframe page
		router.get('/substack-subscribers', () => {
			return new Response(subscribersIndex, {
				headers: {
					'Content-Type': 'text/html;charset=UTF-8',
					'Content-Security-Policy': 'frame-ancestors \'self\' https://speakerine.app https://*.speakerine.app;'
				}
			});
		});

		// Inject Plausible for everything else
		router.all('*', async () => {
			const url = new URL(request.url);
			const response = await fetch(request.url, request);

			// Do not inject analytics for Techtrails admin pages
			if (!url.pathname.startsWith('/publish')) {
				return new HTMLRewriter()
					.on('head', new ElementHandler())
					.transform(response);
			} else {
				return response;
			}
		});

		return router.handle(request);
	}
} satisfies ExportedHandler<Env>;
