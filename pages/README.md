# 🌐 LLMOps Business Idea Generator – Pages Folder

This folder contains the **Next.js frontend pages** for the **Business Idea Generator**, now upgraded with **user subscriptions** using **Clerk**.
Users can sign in, view pricing, and unlock the **premium generator** once subscribed. The product page is **plan-gated** and streams AI ideas in real time for eligible users.

## ⚙️ What Each File Does

### `index.tsx`

* Serves as the **public landing page**.
* Shows **Sign In** / **User Menu** using Clerk (`SignedIn`, `SignedOut`, `SignInButton`, `UserButton`).
* Authenticated users can proceed directly to the **Product** page.
* Maintains a professional, gradient UI with dark-mode support.

### `product.tsx`

* The **authenticated product page** with **subscription gating**.
* Wraps premium content in **`<Protect plan="premium_subscription">`** so only users on that plan can access the generator.
* If the user isn’t on the required plan, renders a **`<PricingTable />`** upgrade flow.
* Uses **Clerk’s `useAuth()`** to obtain a JWT and calls the FastAPI backend via **SSE** (`fetch-event-source`) for real-time streaming.
* Renders streamed content with **ReactMarkdown** (+ GFM and soft line breaks) and modern Tailwind styling.
* Includes a **top-right `UserButton`** for profile and sign-out.

### `_app.tsx`

* Global application wrapper.
* Provides **Clerk context** via `<ClerkProvider>` so pages can use authentication and subscription checks.
* Imports global Tailwind styles (`globals.css`) for consistent theming.

### `_document.tsx`

* Defines the **base HTML** and global metadata.
* Sets the app title and description; complements `_app.tsx` and does not re-render per route.

## 🧩 How It Works Together

1. User visits **`index.tsx`** and signs in.
2. User navigates to **`/product`**.
3. `product.tsx` checks plan access via **`<Protect plan="premium_subscription">`**:

   * If the user has the plan → render **Idea Generator**.
   * If not → show **PricingTable** to upgrade.
4. When eligible, the frontend gets a **Clerk JWT** with `useAuth()`.
5. The JWT is sent to the FastAPI **`/api`** endpoint; the backend verifies it with **Clerk JWKS**.
6. The backend streams the AI idea; the UI renders it live with Markdown formatting.

## ✅ Completion Checklist

| Component        | Description                                                        | Status |
| ---------------- | ------------------------------------------------------------------ | :----: |
| `index.tsx`      | Public landing with Clerk sign-in and navigation                   |    ✅   |
| `product.tsx`    | **Plan-gated** page using `Protect`; streams ideas for subscribers |    ✅   |
| Pricing Fallback | `PricingTable` renders when the user lacks the required plan       |    ✅   |
| `_app.tsx`       | Global wrapper with `ClerkProvider` and Tailwind styles            |    ✅   |
| `_document.tsx`  | Custom HTML structure and SEO metadata                             |    ✅   |
| JWT Handling     | `useAuth()` retrieves token; sent in `Authorization: Bearer <JWT>` |    ✅   |
| Streaming Output | Real-time SSE from FastAPI, rendered with ReactMarkdown            |    ✅   |
| Dark Mode        | Adaptive gradient design across pages                              |    ✅   |
| Plan Identifier  | `premium_subscription` matches Clerk billing configuration         |    ✅   |

**Tip:** Ensure your Clerk billing plan identifier in the dashboard matches the value used in `Protect` (e.g., `premium_subscription`).
