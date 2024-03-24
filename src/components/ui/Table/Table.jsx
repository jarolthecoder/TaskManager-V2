import styles from './Table.module.css'
import PropTypes from 'prop-types'
export const Table = ({
  columns,
  data,
  renderHeader,
  renderFooter,
  className,
  headAlign,
  bodyAlign,
  ...rest
}) => {
  return (
    <div className={styles.table_container}>
      <table className={styles.table_main}>
        <thead className={styles.table_head}>
          <tr>
            {columns.map((column, index) => (
              <th key={index} align={headAlign}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.table_body}>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index} align={bodyAlign}>
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className={styles.table_footer}>
          <tr>{renderFooter()}</tr>
        </tfoot>
      </table>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
  className: PropTypes.string,
  headAlign: PropTypes.string,
  bodyAlign: PropTypes.string,
}