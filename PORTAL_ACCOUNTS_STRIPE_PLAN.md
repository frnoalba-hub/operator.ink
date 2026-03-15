# Portal: Client Accounts + Stripe Payments

## Vision

Portal is for people who want to do their website with Operator.Ink. Instead of just submitting a form:

- **Create an account** → Client signs up and logs in (their own login, not Base44 admin)
- **Upload assets + notes** → Project workspace tied to their account
- **Pay via Stripe** → Client pays for the website project when ready

---

## Current State

- Portal collects name, email, project, notes, files → creates `LeadSubmission` (no account, no payment)
- Base44 auth is for internal/whitelisted users (OAuth redirect); not for public client signup
- Stripe packages already installed: `@stripe/react-stripe-js`, `@stripe/stripe-js`
- Base44 Deno functions exist for webhooks (saveLeadFromBooking, twilioVoice, etc.)

---

## Implementation Plan

### 1. Client account auth (separate from Base44)

Base44 auth is whitelist-based. For Portal clients we need **open signup**. Options:

| Option | Pros | Cons |
|--------|------|------|
| **Supabase Auth** | Free tier, magic link + password, well-documented | Another service to configure |
| **Clerk** | Great DX, hosted | Paid for higher limits |
| **Clerk free tier** | 10k MAU free | May be enough for pilot |

**Recommended:** Supabase Auth (if Base44 already uses Supabase, keys may exist) or Clerk for simplicity.

- Sign up: email + password (or magic link)
- Log in / log out
- Portal pages: `/Portal` (public CTA), `/Portal/Login`, `/Portal/Signup`, `/Portal/Dashboard` (logged-in workspace)

---

### 2. Data model

- **PortalUser** or **Client** entity: `supabase_user_id` (or `clerk_user_id`), `email`, `name`, `created_at`
- **LeadSubmission** or **PortalProject**: add `portal_user_id`, `payment_status` ('pending' | 'paid'), `stripe_checkout_session_id`, etc.

Or keep LeadSubmission and add optional `portal_user_id` + `payment_status` fields.

---

### 3. Stripe integration

**Backend (Base44 Deno function):**

```
functions/createStripeCheckout.ts
```

- Accepts: `portal_user_id`, `project_id`, `success_url`, `cancel_url`
- Creates Stripe Checkout Session with Price ID (e.g. $3,999 Pilot)
- Returns `{ url }` for redirect

**Webhook:**

```
functions/stripeWebhook.ts
```

- Receives `checkout.session.completed`
- Updates project `payment_status` = 'paid'
- Optionally notifies you / client

**Env vars needed:**

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_PILOT` (or similar)
- `VITE_STRIPE_PUBLISHABLE_KEY` (frontend)

---

### 4. Portal flow (new)

1. **Landing** → "Create account" or "Log in" if returning
2. **Sign up** → Email + password → create PortalUser
3. **Dashboard** → List of projects (initially empty or from prior LeadSubmission)
4. **New project** → Upload images, notes, project name (same as current form)
5. **Pay** → "Pay $3,999" button → redirect to Stripe Checkout
6. **Post-payment** → Stripe redirects back → webhook marks paid → client sees "Payment complete"

---

### 5. Migration for existing submissions

- Current form submissions create LeadSubmission with no `portal_user_id`
- Option: keep form for anonymous quick submits, but add "Or create an account to track and pay"
- Or: require account before first submit (simpler, clearer)

---

## Next steps

1. **Choose auth** → Supabase vs Clerk (and create project/keys)
2. **Add auth flow** → Signup, Login, protected Dashboard
3. **Wire Portal** → Logged-in clients create projects tied to their account
4. **Add Stripe function** → `createStripeCheckout.ts` + webhook
5. **Connect Pay button** → Redirect to Stripe, handle return URL

---

## Open questions

- Should we keep the anonymous form as a fallback (e.g. "Submit without account" → you contact them manually)?
- Which price to use: Pilot $3,999, or a different Portal-specific price?
- Any approval step before client can pay (e.g. you quote first, then they pay)?
