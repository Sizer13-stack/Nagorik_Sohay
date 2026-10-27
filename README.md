# নাগরিক সহায় (demo prototype)
Next.js 14, plain CSS. Demo mode needs no keys. Data is fed in Admin (knowledge sources, budget CSV); stored in browser localStorage until Supabase is added.
## Run
    npm install
    npm run dev   # http://localhost:3000
## Deploy (Vercel)
Push to GitHub, then Import Project on Vercel and Deploy. No env vars needed for demo.
## Demo mode
Sample data in lib/data.js (is_mock). Reports live in the browser's localStorage. Admin PIN: 1234.
## Next (full mode)
Supabase tables + auth, real Claude in app/api/ask/route.js (retrieve chunks, return JSON with citations/confidence), photo upload, PostGIS map.

## Real AI (Phase 2a)
1. Copy `.env.example` to `.env.local`, set `ANTHROPIC_API_KEY`.
2. `npm run dev`. Chat answers, photo classification, voice form-fill, notice/law summaries and reply drafts now use Claude. Without a key everything falls back to the demo logic.
3. On Vercel: Project Settings > Environment Variables > add `ANTHROPIC_API_KEY`.
