import React, {useState} from 'react'
import { Divider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Tooltip from '@material-ui/core/Tooltip';

const LogRow = ({log}) => {
  const [expanded, setExpanded] = useState(false)

  const handleRowClick = () => {
    setExpanded(!expanded)
  }

  return(
    <div key={log.id}>
      <Divider />
      <div className="log-row" onClick={handleRowClick}>
        <span><ExpandMoreIcon className={expanded ? "default" : "default rotate"}/></span>
        <p>{log.date}</p>
        <p>{log.time}</p>
        <p>{log.purpose}</p>
        {log.plan 
          ? <p><CheckTwoToneIcon className="check"/></p>
          : <p><ClearTwoToneIcon className="clear"/></p>
        }
        {log.preferences 
          ? <p><CheckTwoToneIcon className="check"/></p>
          : <p><ClearTwoToneIcon className="clear"/></p>
        }
         {log.step_one ||  log.step_three
          ? <p><CheckTwoToneIcon className="check"/></p>
          : <p><ClearTwoToneIcon className="clear"/></p>
        }
      </div>
      {expanded &&
        <div className="row-description">
          {log.plan && 
            <>
              <h3>Plan List</h3>
              {log.plan.map(el => <h5 key={el.name}>{el.name}</h5>)}
              <Divider/>
            </>
          }
           {log.preferences  &&
            <>
              <h3>Preferences</h3>
              {log.preferences.prefs.map(el => 
                <h5 key={el.description}>{el.description}: {el.value} / 5</h5>
              )}
              <h5>Other factors: {log.preferences.preference_text}</h5>
              <Divider/>
            </>
          }
          {log.step_one &&
            <>
              {log.step_one.pain_areas && 
                <>
                  <h3>Pain Areas</h3>
                  {log.step_one.pain_areas.map((el, i) => <h5 className="list" key={el.area}>{(i ? ', ' : '') +el.area}</h5>)}
                </>
              }

              {log.step_one.selected_meds && 
                <>
                  <h3>Prescribed Medications</h3>
                  {log.step_one.selected_meds.map((med, i) => (
                    <h5 className="list" key={med.name}>{(i ? ', ' : '') + med.name}</h5>
                  ))}
                </>
              }

              {log.step_one.other_treatments && 
                <>
                  <h3>Other Treatments:</h3>
                  {log.step_one.other_treatments.map((treat, i) => (
                    <h5 className="list" key={treat.name}>{(i ? ', ' : '') + treat.name}</h5>
                  ))}
                </>
              }
              <Divider/>
              {log.step_one.pain_level && 
                <>
                  <h3>Pain Level</h3>
                  <h5>{log.step_one.pain_level} / 5</h5>
                </>
              }

              {log.step_one.manage_pain && 
                <>
                  <h3>How well does your treatment manage your pain?</h3>
                  <h5>{log.step_one.manage_pain} / 5</h5>
                </>
              }

              {log.step_one.control_arthritis && 
                <>
                  <h3>How well does your treatment control your arthritis?</h3>
                  <h5>{log.step_one.control_arthritis} / 5 </h5>
                </>
              }
            </>
          }
          {log.step_three &&
            <>
              {log.step_three.confidence_level &&
                <>
                  <h3>Confidence Level</h3>
                  <h5>{log.step_three.confidence_level} / 5</h5>
                </>
              }

              {log.step_three.motivation_level &&
                <>
                  <h3>Motivation Level</h3>
                  <h5>{log.step_three.motivation_level} / 5</h5>
                  <Divider/>
                </>
              }

              {log.step_three.factors &&
                <>
                  <h3>Will any of these factors prevent you from following your new plan?</h3>
                  {log.step_three.factors.map(el => <h5 key={el.title}>{el.title}</h5>)}
                </>
              }

              {log.step_three.suggestions &&
                <>
                  <h3>Suggestions to help you plan your next steps</h3>
                  {log.step_three.suggestions.map(el => <h5 key={el.title}>{el.title}</h5>)}
                  <Divider/>
                </>
              }
            </>
          }
          <span>
            <Tooltip title="Collapse row">
              <ArrowUpwardIcon className="collapse-icon" onClick={() => setExpanded(false)} />
            </Tooltip>
          </span>
        </div>
      }
    </div>
  )
}

export default LogRow