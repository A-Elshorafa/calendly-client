import { LabeledRadioButton } from "../../buttons"

export default ({
  values,
  onSelect,
  selectedValue,
}) => {
  return (
    <ul
      className="absolute z-10 mt-1 max-h-28 w-full overflow-auto rounded-md bg-white py-1 shadow-lg border-solid border border-gray-300"
    >
      {values?.length > 0 && values.map((value, index) => (
        <li
          key={index}
          onClick={_ => onSelect(value)}
          className="flex flex-row items-center text-gray-900 relative py-2 pl-3 pr-9"
        >
          <LabeledRadioButton
            isSelected={selectedValue?.value === value?.value}
            value={value ? `${value.value} ${value.string}` : ''}
          />
        </li>
      ))}
    </ul>
  )
}