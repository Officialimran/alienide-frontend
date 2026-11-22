import Form from "next/form";

interface Option {
  value: string;
  label: string;
}

interface ProjectFilterProps {
  platforms: Option[];
  genres: Option[];
  platform?: string;
  genre?: string;
}

const chevron =
  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\")";

function FilterSelect({ id, label, name, options, value, allLabel }: {
  id: string;
  label: string;
  name: string;
  options: Option[];
  value?: string;
  allLabel: string;
}) {
  return (
    <div className="mb-5 px-[15px]">
      <label htmlFor={id} className="mb-[13px] block font-anton text-[16px] leading-[1.625] text-accent uppercase">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={value ?? ""}
        className="h-12 min-w-[220px] cursor-pointer appearance-none rounded-[5px] bg-[#f4f4f4] bg-[length:16px_12px] bg-[position:right_20px_center] bg-no-repeat py-3 pr-12 pl-5 font-unbounded text-[14px] font-normal text-accent outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={{ backgroundImage: chevron }}
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * GET form, like the original: submitting updates the URL (?platforms=&genres=).
 * next/form navigates client-side and still works without JavaScript.
 */
export function ProjectFilter({ platforms, genres, platform, genre }: ProjectFilterProps) {
  return (
    <Form action="/projects" className="-mx-[15px] mb-[10px] flex flex-wrap items-end">
      <FilterSelect id="filter-platform" label="Filter by platform" name="platforms" options={platforms} value={platform} allLabel="All Platforms" />
      <FilterSelect id="filter-genre" label="Filter by genre" name="genres" options={genres} value={genre} allLabel="All Genres" />
      <div className="mb-5 px-[15px]">
        <button
          type="submit"
          className="h-12 min-w-[150px] rounded-[5px] bg-primary px-[30px] py-3 font-anton text-[16px] leading-[1.5] text-accent uppercase transition-colors duration-300 hover:bg-accent hover:text-white"
        >
          Search
        </button>
      </div>
    </Form>
  );
}
