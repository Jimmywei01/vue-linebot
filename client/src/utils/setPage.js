export function setPage (total, currentPage, pageSize) {
  // console.log('total:', total)
  // console.log('currentPage:', currentPage)
  // console.log('pageSize:', pageSize)
  const tableData = total.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  return tableData
}
