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
