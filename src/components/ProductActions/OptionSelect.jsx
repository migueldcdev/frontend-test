export default function OptionSelect({ label, options, selectedCode, onSelect }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-semibold">{label}</span>
      <select
        value={selectedCode ?? ''}
        onChange={(event) => onSelect(Number(event.target.value))}
        className="rounded border border-gray-300 px-3 py-2"
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
