export default function buttonVals(ev) {
  let itemSelected = ev.target;
  let selected = itemSelected.getAttribute("data-selected");

  if (itemSelected.tagName === "H5") {
    if (!selected) {
      itemSelected.style.color = "white"
    }
  }

  if (selected) {
    itemSelected.removeAttribute("data-selected")
    itemSelected.style.backgroundColor = "#FFF";
    itemSelected.style.color = "#10434F";
    return false
  } else {
    itemSelected.setAttribute("data-selected", true);
    itemSelected.style.backgroundColor = "#10434F";
    itemSelected.style.color = "#FFF";
    return true
  }
}