export const CheckboxComponent = ({
  option,
  optionIdx,
  sectionId,
  setAppropriateValue,
}) => (
  <div key={option.value} className="flex items-center">
    <input
      id={`filter-${sectionId}-${optionIdx}`}
      name={`${sectionId}[]`}
      defaultValue={option.value}
      type="checkbox"
      defaultChecked={option.checked}
      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      onChange={(e) => setAppropriateValue(e, sectionId)}
    />
    <label
      htmlFor={`filter-${sectionId}-${optionIdx}`}
      className="ml-3 text-sm text-gray-600"
    >
      {option.label}
    </label>
  </div>
);
