"use client";
import { usePathname } from "next/navigation";
import styles from "./Breadcrumbs.module.css";
import Link from "next/link";

export const Breadcrumbs = ({ selectedItem }) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  const breadcrumbSegments = segments.reduce((acc, segment, index) => {
    acc.push(segment);
    if (index < segments.length - 1) {
      acc.push(" / ");
    }
    return acc;
  }, []);

  // Replace the last segment with the provided title, if available
  if (selectedItem && breadcrumbSegments.length > 0) {
    breadcrumbSegments[breadcrumbSegments.length - 1] = selectedItem;
  }

  return (
    <nav className={styles.breadcrumbs}>
      <ul className={styles.breadcrumbs_list}>
        {breadcrumbSegments.map((segment, index) => (
          <li key={index} className={styles.breadcrumbs_item}>
            {segment !== " / " ? (
              <Link
                href={`/${segments
                  .slice(0, Math.floor((index + 1) / 2) + 1)
                  .join("/")}`}
              >
                {segment}
              </Link>
            ) : (
              <> {segment} </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// export const Breadcrumbs = () => {
//   const pathname = usePathname();
//   const segments = pathname.split("/").filter((segment) => segment !== "");
//   console.log(segments);

//   const breadcrumbSegments = segments.reduce((acc, segment, index) => {
//     acc.push(segment);
//     if (index < segments.length - 1) {
//       acc.push(" / ");
//     }
//     return acc;
//   }, []);

//   return (
//     <nav className={styles.breadcrumbs}>
//       <ul className={styles.breadcrumbs_list}>
//         {breadcrumbSegments.map((segment, index) => (
//           <li key={index} className={styles.breadcrumbs_item}>
//             {segment !== " / " ? (
//               <Link
//                 href={`/${segments
//                   .slice(0, Math.floor((index + 1) / 2) + 1)
//                   .join("/")}`}
//               >
//                 {segment}
//               </Link>
//             ) : (
//               <> {segment} </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };
