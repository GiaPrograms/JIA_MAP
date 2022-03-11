import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

const PlanCheckbox = ({toggleCheckbox, isChecked}) => {
  const handleChange = ev => {
    toggleCheckbox(ev.target.checked)
  }

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return(
    <Tooltip title={isChecked ? lang === "English" ? "Remove from plan" : "Supprimer du plan" : lang === "English" ? "Add to plan" : "Ajouter au plan"}>
      <span className="checkbox-container">
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          color="primary"
          style={{
            transform: "scale(2)"
          }}
        />
      </span>
    </Tooltip>
  )
}

export default PlanCheckbox