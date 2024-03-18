"use client";
import { usePathname } from "next/navigation";
import { RenderWhen } from "../../shared";
import PropTypes from "prop-types";
import styles from "./Breadcrumbs.module.css";
import Link from "next/link";

export const Breadcrumbs = ({ selectedItem }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Create an array of breadcrumb segments with the provided title
  const breadcrumbSegments = segments.reduce((acc, segment, index) => {
    acc.push(segment);
    // Add a separator between each segment except the last one
    if (index < segments.length - 1) {
      acc.push(" / ");
    }
    return acc;
  }, []);

  // Replace the last segment with the provided title if it exists
  if (selectedItem && breadcrumbSegments.length > 0) {
    breadcrumbSegments[breadcrumbSegments.length - 1] = selectedItem;
  }

  return (
    <ul className={styles.breadcrumbs_list}>
      {breadcrumbSegments.map((segment, index) => (
        <li key={index} className={styles.breadcrumbs_item}>
          <RenderWhen condition={segment !== " / "} fallback={segment}>
            <Link
              href={`/${segments
                  .slice(0, Math.floor((index + 1) / 2) + 1)
                  .join("/")}`}
            >
              {segment}
            </Link>
          </RenderWhen>
        </li>
      ))}
    </ul>
  );
};

Breadcrumbs.propTypes = {
  selectedItem: PropTypes.string,
};
