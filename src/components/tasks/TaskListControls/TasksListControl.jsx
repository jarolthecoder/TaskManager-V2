import { Badge, MatIcon } from "@/components/ui";
import { SortTaskListButton } from "../SortTaskListButton/SortTaskListButton";
import styles from "./TaskListControls.module.css";

const filterOptions = ["All", "Pending", "In Progress", "Completed"];
export const TasksListControls = ({
  filterValue,
  handleFilterChange,
  sortValue,
  handleSortChange,
}) => {
  return (
    <div className={styles.list_controls_container}>
      <div className={styles.filters_container}>
        <MatIcon iconName="filter_alt" className={styles.filters_icon} />
        <div className={styles.filters_badges_container}>
          {filterOptions.map((option, index) => (
            <Badge
              key={index}
              color={filterValue === option ? "primary" : "default"}
              variant="outlined"
              onClick={() => handleFilterChange(option)}
              selected={option === filterValue}
              className={styles.filter_badge}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>
      <SortTaskListButton
        selectedOption={sortValue}
        onSelect={handleSortChange}
      />
    </div>
  );
};
