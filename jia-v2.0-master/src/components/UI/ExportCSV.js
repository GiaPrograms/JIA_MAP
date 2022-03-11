import React, {useState, useEffect} from 'react'
import {CSVLink} from "react-csv";
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';

const ExportCSV = ({data, title}) => {
  const [content, setContent] = useState()
  const [isLoading, setIsLoading] = useState(true)

  /**
   * Map through the list of objects, find if any attributes contain a "_id" substring and delete it
   * Spread the object and remove the tableData object, created by the material-table library
   * Set the content to be downloaded
   */
  useEffect(() => {
    setIsLoading(true)
    if(data) {
      let newData = JSON.parse(JSON.stringify(data))

      const _data = newData.map(item => {
        Object.keys(item).find(el => {
         if (el.includes("_id") || el === "id" ) delete item[el]
         return null
        })
        const {tableData,...rest} = item
        return rest
      })
      setContent(_data)
      setIsLoading(false)
    }
  },[data])
  
  return(
    <>
      {isLoading
        ? <GetAppIcon className="material-icons download-icon disabled"/>
        : (<>
          <Tooltip title="Export as CSV">
            <CSVLink data={content}  filename={`${title}-${new Date().toLocaleString()}`}>
              <GetAppIcon className="material-icons download-icon"/>
            </CSVLink>
          </Tooltip>
        </>)
      }
    </>
  )
}

export default ExportCSV