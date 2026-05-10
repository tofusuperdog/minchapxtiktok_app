# minchapxtiktok_app

## HLS playback

By default, the app returns the direct BytePlus HLS URL for faster playback.

For local development only, if the BytePlus play domain does not allow your
localhost origin, enable the HLS proxy:

```env
BYTEPLUS_USE_HLS_PROXY=true
```

Keep this disabled in production after CORS is configured on the BytePlus play
domain, because proxying every HLS segment through Next.js is slower.

## TikTok webhooks

Use this callback URL in TikTok Developer Portal:

```txt
https://tiktok.minchapseries.com/api/tiktok/webhooks
```

Set the TikTok app client secret on the server to enable webhook signature
verification:

```env
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
```

The endpoint currently acknowledges TikTok webhook test calls and logs payment
success events. When the order schema is finalized, update
`app/api/tiktok/webhooks/route.js` to mark matching orders as paid and unlock
VIP, episodes, or topups idempotently.

## BytePlus CDN URL signing

When URL signing is enabled on the BytePlus playback domain, set the primary key
server-side only:

```env
BYTEPLUS_CDN_AUTH_KEY=your_primary_key
```

The app signs the master HLS URL with Type A `auth_key`. Keep M3U8 rewrite
enabled in the BytePlus console so child playlist and segment URLs inherit
signing parameters. For multi-audio HLS, also enable rewrite for `EXT-X-MEDIA`;
enable `EXT-X-MAP` if the transcode output uses fMP4/CMAF init segments.
