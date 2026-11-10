export default function OptionSelect({ label, options, selectedCode, onSelect }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-neutral-500">{label}</span>
      <select
        value={selectedCode ?? ''}
        onChange={(event) => onSelect(Number(event.target.value))}
        className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-neutral-900 focus:ring-4 focus:ring-neutral-900/5"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </label>
  )
}
