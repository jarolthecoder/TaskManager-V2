import { MatIcon, MenuItem, Select } from "@/components/shared";
import { TASK_SORT_OPTIONS } from "@/lib/constants";

const { LATEST, OLDEST, DUE_DATE, PRIORITY_HIGH, PRIORITY_LOW } =
  TASK_SORT_OPTIONS;

const sortOptions = [
  { label: "Latest", value: LATEST },
  { label: "Oldest", value: OLDEST },
  { label: "Priority High", value: PRIORITY_HIGH },
  { label: "Priority Low", value: PRIORITY_LOW },
];

export const SortTaskListButton = ({ onSelect, selectedOption }) => {
  return (
    <Select
      value={selectedOption.label}
      endIcon={<MatIcon iconName="swap_vert" />}
    >
      {sortOptions.map((option, index) => (
        <MenuItem key={option.value} onClick={() => onSelect(option)}>
          <p>{option.label}</p>
        </MenuItem>
      ))}
    </Select>
  );
};
