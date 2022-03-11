import React, { forwardRef, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import MaterialTable from "material-table";
import AlertDialog from '../UI/AlertDialog';
import {AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn} from "@material-ui/icons";

import './Table.css'

const Table = ({data, title, deleteRecord, handleOpenForm, history, ...rest}) => {
  const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  }
  const [columnsContent, setColumnsContent] = useState()
  const [dataContent, setDataContent] = useState()
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState()

  const deleteMessage = {
    title: `Delete ${title.action}`,
    description: `Delete this ${title.action}?`
  }
  // gets the passed properties through props and sets them as the column titles for the table
  const populateContent = () => {
    // extract the object properties to set them as the column headers
    let firstEl = {}
    for (let property in data) {
      firstEl = data[property]
    }
    
    let content = []
    let count = 0
    for (let prop in firstEl) { 
      if (prop !== 'id' && count <= 3) {
        let title = prop.charAt(0).toUpperCase() + prop.slice(1).replace(/_/g, ' ')
        content.push({title, field: prop})
      } else {
        content.push({title: prop, field: prop, width: -1, hidden:true})
      }
      count++
    }
    setColumnsContent(content)
    //Set passed data as the content for the table
    setDataContent(data)
  }

  // Delete record
  const handleDelete = () => {
    deleteRecord(selectedRecordId)
    setOpenAlert(false);
  }
  // Close delete message dialog box
  const handleCloseAlert = () => {
    setOpenAlert(false);
  }

  useEffect(() => {
    if(data) populateContent()
  },[data])


  return(
    <div className="table-container">
      <MaterialTable
      icons={tableIcons}
      // title={title.table}
        columns={columnsContent}
        data={dataContent}
        actions={[
          {
            icon: Edit,
            tooltip: `Edit ${title.action}`,
            onClick: (event, rowData) => {
              handleOpenForm('Edit', rowData)
            }
          },
          {
            icon: DeleteOutline,
            tooltip: `Delete ${title.action}`,
            onClick: (event, rowData) => {
              setSelectedRecordId(rowData.id)
              setOpenAlert(true);
            }
          },
          {
            icon: AddBox,
            tooltip: `Add ${title.action}`,
            isFreeAction: true,
            onClick: (event, rowData) => {
              handleOpenForm('Add')
            }
          }
        ]}
        options={{
          exportButton: false,
          showTitle: false,
          searchFieldAlignment: 'left',
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10, 25 , 50, 100],
          // toolbarButtonAlignment: 'left',
             actionsCellStyle: {
          // color: "#F15A2B"
        },

        //headerStyle: { backgroundColor: "#F15A2B", color: "white" }
        }}
        onRowClick={(event, rowData) => {
          if(title.action === 'user') {
            rest.onViewUser(true, rowData)
          }
        }}
      />
    
    <AlertDialog 
      open={openAlert} 
      deleteMessage={deleteMessage}
      handleClose={handleCloseAlert}
      handleDelete={handleDelete} 
    />
    </div>
  )
}

export default withRouter(Table)