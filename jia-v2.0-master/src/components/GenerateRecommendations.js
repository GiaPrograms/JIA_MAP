import checkSpecs from './Review/filterBodyPart';
import {getRequest, postRequest} from '../API/ApiHandler';

// userPrefs, painAreas, treatments
export const handleRecommendations = async() => {
  const treatments = await getTreatments()
  const userPrefs = await getUserPrefs()
  const painAreas = await getPainAreas()
  const prefs = await getPrefs()

  const sortedTeatments =  [...treatments]
  sortedTeatments.sort((a, b) => (a.order_number > b.order_number) ? 1 : ((b.order_number > a.order_number) ? -1 : 0))

  let passedCategories = setCategories(userPrefs, prefs)
  let passedSpecs = setSpecs(painAreas)
 
  let SC = handleSC(sortedTeatments, passedCategories)
  let HCP = handleHCP(sortedTeatments, passedCategories, passedSpecs)
  saveSC(SC)
  saveHCP(HCP)
}

const getTreatments = async() => {
  let data = await getRequest("/treatments")
  if(data.length > 0) return data
}

const getPainAreas = async() => {
  let items = await getRequest(`/painAreas/user`)
  if(items) {
    let {data} = items
    const selectedAreas = []
    for(let part in data) {   
      if(data[part] === true) selectedAreas.push(part)
    }
    return selectedAreas
  }
}

const getUserPrefs = async() => {
  let _prefs = await getRequest(`/userPreferences/user`)
  if(_prefs) return _prefs
}

const getPrefs = async() => {
  let prefs = await getRequest("/preferences")
  if(prefs) return prefs
}

const setCategories = (userPrefs, prefs) => {
  let categoriesPool = []
  if (userPrefs != null) {
    userPrefs.forEach(userPref => {
      // pref.recommends is whether the pref selection adds or removes (ignores) treatments from the suggestion pool
      for(let el in prefs) {
        if(userPref.user_preference.preferenceId === prefs[el].id){
          if (userPref.user_preference.value >= prefs[el].threshold) {
            // add the list of categories belogning to the preference to the passed categories pool
            userPref.categories.forEach(el => categoriesPool.push({name: el.name, recommends: userPref.recommends}))
          }
          break
        }
      }
    })
    return categoriesPool
  }
}

const setSpecs = (painAreas) => {
  // passedSpecs are based on whether Jaw, Feet and Hands are selected
  // painAreas contains the user selected pain areas from step 1
  let passedSpecs = checkSpecs(painAreas)
  return passedSpecs
}

/************************
 * Handle SC treatments *
 ************************/
const handleSC = (sortedTeatments, passedCategories) => {
  let passedCategoriesSC = [...passedCategories]
  let SCList = []; // Will contain the final results, not sliced

  // get only treatments with SC supervision
  let allSC = sortedTeatments.filter(treatment => treatment.supervision === "SC")
    .filter(treatment => {
      // loop through the treatment categories list
      for (let i = 0; i < treatment.categories.length; i++) {
        let catName = treatment.categories[i].name
        // check if any of the passed categories match the treatment category
        if (passedCategoriesSC.some(cat => cat.name === catName)) {
          SCList.push(treatment);
          // Remove the category from the category list for unique categories
          let index = passedCategoriesSC.findIndex(cat => cat.name === catName)
          passedCategoriesSC.splice(index,1)
          return false
        }
      }
      return true;
    })

  /**
   * Always show 3 SC recommended treatments
   * Filter out the allTreatments list to only include SC treatments
   * Keep adding treatments to the TopThreeSC list until it has a total of 3 treatments
   * Avoid duplicate treatments if any were already added
   * Get treatments belonging to different categories
   **/
  let _passedCategoriesSC = [...passedCategories]

  if (SCList.length < 3) {
    allSC.forEach(treatment => {
      for (let i = 0; i < treatment.categories.length; i++) {
        let category = treatment.categories[i]
        if (SCList.length < 3 && !_passedCategoriesSC.some(cat => cat.name === category.name)) {
          SCList.push(treatment)
          _passedCategoriesSC.push(category)
          return
        }
      }
    })
  }

  // Remove duplicates, if any.
  SCList = Array.from(new Set(SCList.map(el => el.id)))
  .map(id =>  SCList.find(el => el.id === id))

  return SCList.slice(0, 3)
}

/*************************
 * Handle HCP treatments *
 *************************/
const handleHCP = (sortedTeatments, passedCategories, passedSpecs)  => {
  let passedCategoriesHCP = [...passedCategories]
  let HCPList = []; /** Will contain the final results, not sliced **/

  let specCat = []
  if (passedSpecs.length > 0) {
    // go through the list of treatments, return the one with a matching specification
    HCPList = sortedTeatments.filter(treatment => treatment.supervision === "HCP")
    .filter(treatment => {
      for (let i = 0; passedSpecs.length >= i; i++) {
        // treatment specification can be "feet", "hands", "jaw" or "general"
        if (treatment.specification === passedSpecs[i] && treatment.specification !== "general") {
          for (let i = 0; i < treatment.categories.length; i++) {
            let catName = treatment.categories[i].name
            if (!specCat.some(el => el.name === catName)) {
              specCat.push(treatment.categories[i]);
              return true
            }
          }
        }
      }
      return false
    })
  }
  /**
   * allHCP will contain the remaining treatments belonging to a category which has already been included
   **/
  let allHCP = sortedTeatments.filter(treatment => treatment.supervision === "HCP")
    .filter(treatment => {
      let treatLength = treatment.categories.length
      for (let i = 0; i < treatLength; i++) {
        let catName = treatment.categories[i].name
        if (passedCategoriesHCP.some(el => el.name === catName)) {
          HCPList.push(treatment);
          let index = passedCategoriesHCP.findIndex(cat => cat.name === catName)
          passedCategoriesHCP.splice(index,1)
          return false
        }
      }
      return true;
    })

  // Get categories which unrecommend treatments, if any
  const unrecommends = passedCategories.filter(el => !el.recommends)
  // filter out treatments which belong to any category which should be removed/ignored
  if(unrecommends) {
    unrecommends.forEach(passedCat => HCPList = HCPList.filter(treatment => !treatment.categories.some(cat => cat.name === passedCat.name)))
  }

  /**
   * Always show 3 HCP recommended treatments
   * Filter out the allTreatments list to only include HCP treatments
   * Keep adding treatments to the TopThreeHCP list until it has a total of 3 treatments
   * Avoid duplicate treatments if any were already added
   * Get treatments belonging to different categories
   **/

  let _passedCategoriesHCP = [...passedCategories, ...specCat]

  if (HCPList.length < 3) {
    allHCP.forEach(treatment => {
      for (let i = 0; i < treatment.categories.length; i++) {
        let category = treatment.categories[i]
        if(!_passedCategoriesHCP.some(cat => cat.name === category.name) && !unrecommends.some(el => el.name === category.name)) {
          HCPList.push(treatment)
          _passedCategoriesHCP.push(category)
          return
        }
      }
    })
  }

  if(unrecommends) {
    unrecommends.forEach(passedCat => HCPList = HCPList.filter(treatment => !treatment.categories.some(cat => cat.name === passedCat.name)))
  }

  // Remove duplicates, if any.
  HCPList = Array.from(new Set(HCPList.map(el => el.id)))
    .map(id => HCPList.find(el => el.id === id))

  return HCPList.slice(0, 3)
}


const saveSC = SC => {
  const input = SC.map(sc => sc.id)
  postRequest("/userScs", input)
}

const saveHCP = HCP => {
  const input = HCP.map(hcp => hcp.id)
  postRequest("/userHcps", input)
}
