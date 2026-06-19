import { IconSearch } from "./icons";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search tasks…"
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block w-full max-w-md">
      <span className="sr-only">Search</span>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <IconSearch className="h-4 w-4" aria-hidden />
        </span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          type="search"
        />
      </div>
    </label>
  );
}
