export default function SearchBar({ query, onQueryChange }) {
  return (
    <label className="flex flex-col gap-1 sm:w-72">
      <span className="text-sm text-gray-600">Search by brand or model</span>
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        className="rounded border border-gray-300 px-3 py-2"
      />
    </label>
  )
}
