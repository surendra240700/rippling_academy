import React from "react"
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


const MultiSelect = (props) => {
  return <ReactMultiSelectCheckboxes options={props.options}/>
}

export default MultiSelect;