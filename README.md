# Mobile Shop

Single-page app for browsing and buying mobile phones, built as a front-end technical test. It has two views:

- **Product list (PLP):** every product from the API in a responsive grid (up to 4 per row) with real-time search by brand and model.
- **Product detail (PDP):** image, full specifications, and color and storage selectors with an add-to-cart button.

The header shows the app title (link to the list), breadcrumbs and the cart count on every view.

## Requirements

- Node.js 22.12 or later (required by Vite 8 and Vitest 5)
- npm

## Install and scripts

```bash
npm install
```

| Script | Description |
|---|---|
| `npm start` | Start the development server |
| `npm run build` | Build for production into `dist/` |
| `npm test` | Run the test suite once |
| `npm run lint` | Lint the code with ESLint |

The API base URL defaults to `https://itx-frontend-test.onrender.com` and can be overridden with the `VITE_API_URL` environment variable.

## Architecture

Stack: React 18 (JavaScript), Vite, react-router-dom, Tailwind CSS v4, Vitest with React Testing Library, ESLint.

```
src/
  api/
    client.js          # fetch wrapper: base URL, JSON, HTTP errors
    products.js        # getProducts, getProductById, addToCart; maps API fields to clean names
  cache/
    cache.js           # localStorage get/set with 1 hour TTL
  context/
    CartContext.jsx    # cart count, persisted in localStorage
  hooks/
    useAsync.js        # runs a loader with loading and error state, ignores stale responses
  components/
    Header/            # title link, breadcrumbs, cart count
    PageLayout/        # header plus page container shared by both views
    SearchBar/
    ProductCard/
    ProductImage/
    ProductDescription/
    ProductActions/    # color and storage selectors, add to cart button
  pages/
    ProductListPage.jsx
    ProductDetailPage.jsx
  App.jsx              # routes: /, /product/:id, unknown routes redirect to /
  main.jsx
```

Components never call `fetch`. The API layer is the only place that knows URLs and the cache.

## Decisions and trade-offs

- **Cache in localStorage.** GET responses (`products` and `product:<id>`) are stored with a timestamp and reused for 1 hour, so they survive reloads without new requests. Expired or corrupted entries are discarded and refetched; if storage is unavailable the app falls back to normal network calls. POST requests are never cached.
- **API field mapping.** The API has typos and swapped fields (`dimentions`, `secondaryCmera`, `displaySize` holding the resolution). They are mapped once in `api/products.js` so components receive clean names. Missing values, such as an empty price, render as `-`.
- **Context for the cart, no state library.** The only shared state is one number, so a React Context persisted in localStorage is enough.
- **Cart count accumulates.** `POST /api/cart` always returns `{ "count": 1 }`. Showing it as-is would pin the header at 1, so each returned `count` is added to the persisted total. This still works if the API ever returns the real number of items added.
- **In-memory search.** The list is already loaded, so filtering runs on every keystroke during render, with no extra requests and no debounce.
- **Selector defaults.** An option with a single choice is preselected. The add button stays disabled until both color and storage are chosen.
- **Styling with Tailwind utilities only.** No custom CSS beyond the Tailwind import. Repeated markup is extracted into small components.

## Known limitations

- The API is hosted on a free tier and may take a while to wake up on the first request, so the first load can be slow.
- There is no cart page by design. The header only shows the item count.
