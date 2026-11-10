export default function SearchBar({ query, onQueryChange }) {
  return (
    <label className="flex flex-col gap-1 sm:w-72">
      <span className="text-xs font-medium text-neutral-500">Search by brand or model</span>
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5"
      />
    </label>
  )
}
