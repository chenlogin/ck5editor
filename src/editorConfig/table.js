import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TableColumnResize from '@ckeditor/ckeditor5-table/src/tablecolumnresize'
import TableCaption from '@ckeditor/ckeditor5-table/src/tablecaption'

export default {
  plugins: [Table, TableToolbar, TableCaption, TableColumnResize],
  toolbar: ['insertTable'],
  config: {
    table: {
      contentToolbar: ['toggleTableCaption', 'tableColumn', 'tableRow', 'mergeTableCells']
    }
  }
}
