# Techtrails.io Cloudflare Worker

This is the code for my domain's Cloudflare Worker.

The [techtrails.io](https://techtrails.io) domain is currently pointing to my Substack domain. I am using Cloudflare's
Workers feature to:
- **Inject a Plausible Analytics tag on my Newsletter website** — Substack only offers a Google Analytics integration and
does not provide a way to inject custom code either.
- **Host a techtrails.io-hosted script to interact with Substack API** — This allows me to add subscribers to my list
from other domains by embedding this script with an iframe and implementing some cross-frame communication. I have
covered this in length [in my newsletter](https://techtrails.io/p/adding-subscribers-to-substack).

## Reusing this code
This code is not meant to be generic or reusable as-is.<br>
However I have decided to make it public so that you can use it as a base or inspiration for your own purposes.

## License
The code in this repository is distributed under the MIT license (see LICENSE.md)
