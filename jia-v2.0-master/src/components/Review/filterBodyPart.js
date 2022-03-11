function checkSpecs(checkforpart){
  let arrayOfSpecifications={jaw:null,hands:null,feet:null};
  let arrayOfTrue=[];

  if(checkforpart){
    for(let i=0; checkforpart.length>i;i++){
      switch(checkforpart[i]){
        case "jaw":
        arrayOfSpecifications.jaw = true;
        break;
        // case "shoulder":
        // case "elbow":
        case "wrists":
        case "fingers":
        arrayOfSpecifications.hands = true;
        break;
        case "hips":
        case "knees":
        case "ankles":
        case "lower_back":
        case "toes":
        arrayOfSpecifications.feet = true;
        break;
        default:
        break;
      }
    }
  }
  
  if(arrayOfSpecifications.jaw) arrayOfTrue.push("jaw")
  if(arrayOfSpecifications.feet) arrayOfTrue.push("legs")
  if(arrayOfSpecifications.hands) arrayOfTrue.push("wrists")
  return arrayOfTrue
}
export default checkSpecs
