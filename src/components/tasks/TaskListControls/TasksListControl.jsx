import { MatIcon, MenuItem, Select } from "@/components/ui";
import { SortTaskListButton } from "../SortTaskListButton/SortTaskListButton";

const filterOptions = [
  "All Tasks",
  "Due Today",
  "Pending",
  "In Progress",
  "Completed",
];

export const TasksListControls = ({
  filterValue,
  handleFilterChange,
  sortValue,
  handleSortChange,
}) => {
  return (
    <>
      <Select
        value={filterValue}
        endIcon={<MatIcon iconName="filter_list" />}
        buttonOnly={window.innerWidth < 600}
      >
        {filterOptions.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleFilterChange(option)}
            selected={option === filterValue}
          >
            <p>{option}</p>
          </MenuItem>
        ))}
      </Select>
      <SortTaskListButton
        selectedOption={sortValue}
        onSelect={handleSortChange}
      />
    </>
  );
};
