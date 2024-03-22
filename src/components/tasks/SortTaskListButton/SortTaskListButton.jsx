import { MatIcon, MenuItem, Select } from "@/components/ui";
import { TASK_SORT_OPTIONS } from "@/lib/constants";

const { LATEST, OLDEST, PRIORITY_HIGH, PRIORITY_LOW } = TASK_SORT_OPTIONS;

const sortOptions = [
  { label: "Latest", value: LATEST },
  { label: "Oldest", value: OLDEST },
  { label: "Priority High", value: PRIORITY_HIGH },
  { label: "Priority Low", value: PRIORITY_LOW },
  { label: "Default", value: "Default" },
];

export const SortTaskListButton = ({ onSelect, selectedOption }) => {
  return (
    <Select
      value={selectedOption.label === "Default" ? "Sort" : selectedOption.label}
      startIcon={<MatIcon iconName="swap_vert" />}
      endIcon="none"
      buttonOnly={window.innerWidth < 600}
    >
      {sortOptions.map((option, index) => (
        <MenuItem
          key={option.value}
          onClick={() => onSelect(option)}
          selected={option.value === selectedOption.value}
        >
          <p>{option.label}</p>
        </MenuItem>
      ))}
    </Select>
  );
};
