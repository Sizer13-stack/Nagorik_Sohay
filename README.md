# Nagorik Sohay (নাগরিক সহায়)

A bilingual (Bangla/English) civic-tech prototype for Bangladesh, built for **AI Builders Congress 2026** (CivicSphere AI domain). Not an official government website.

One platform, five challenges:

| Challenge | What it does |
|---|---|
| **Citizen First** | Service chatbot that answers from a knowledge base (with sources) and falls back to live search of official `.gov.bd` sites. Says "not sure" instead of guessing. Voice form-filling and photo-based issue detection for reports. |
| **GovCopilot** | PII redaction, notice and law summaries, draft replies, regulation search, permit workload analysis. Officers decide. |
| **TrustID** | Prove a claim (e.g. income below a limit, age 18+) with a signed yes/no attestation (WebCrypto ECDSA) instead of sharing documents. |
| **Smart Nation** | Ward-level dashboard: report map, heat layer, pedestrian-risk zones, zoning simulation, planning priority index. |
| **Transparent Government** | Budget and purchase data with anomaly flags (for review, not accusation), price comparison and a knowledge graph. |

Also included: divisions, districts, upazilas and unions browser (4,540 unions), an accuracy test page (`/eval`), and an admin tool that drafts service records from official page URLs.

## Tech stack
Next.js 14 (App Router), plain CSS, Claude API (server-side routes), Web Speech API, WebCrypto.

## Run locally
```bash
npm install
cp .env.example .env.local   # then set ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```
Without an API key, AI features fall back to simple demo logic. Restart the dev server after changing `.env.local`.

## Deploy (Vercel)
Import the repo on Vercel and add `ANTHROPIC_API_KEY` under Environment Variables. Set a spend limit in the Anthropic console.

## Important limitations
- Most data (reports, ward indicators, budget, permits, heat, crashes) is **sample data** and labelled as such.
- Service records (passport, NID, driving license, birth registration) were compiled from news and secondary sources. **Verify on official sites before relying on them.**
- Reports and admin-added sources are stored in the browser (localStorage), not a shared database. `supabase/schema.sql` is included but not wired yet.
- Admin login (PIN) is a demo only, not real authentication.
- TrustID runs issuer and verifier in one browser; production would use a government issuer and zero-knowledge proofs.

## Data and credits
Administrative areas: [nuhil/bangladesh-geocode](https://github.com/nuhil/bangladesh-geocode) (may not reflect recent changes; check its license before reuse).