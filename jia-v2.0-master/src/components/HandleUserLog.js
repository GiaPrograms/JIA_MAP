import { postRequest, patchRequest } from "../API/ApiHandler"

export const addUserLog = async() => {
  const input = {}
  const log = await postRequest("/logs", input)
  if(log) sessionStorage.setItem('log', log.id)
}

export const updateLogStepOne = async(data) => {
  if(!sessionStorage.getItem('log')) await addUserLog()
  const logId = sessionStorage.getItem('log')
  const input = {step_one: data}
  patchRequest(`/logs/${logId}`, input)
}

export const updateLogStepThree = async(data) => {
  if(!sessionStorage.getItem('log')) await addUserLog()
  const logId = sessionStorage.getItem('log')
  const input = {step_three: data}
  patchRequest(`/logs/${logId}`, input)
}

export const updateLogPrefs = async(data) => {
  if(!sessionStorage.getItem('log')) await addUserLog()
  const logId = sessionStorage.getItem('log')
  const input = {preferences: data}
  patchRequest(`/logs/${logId}`, input)
}

export const updateLogPurpose = async(purpose) => {
  if(!sessionStorage.getItem('log')) await addUserLog()
  const logId = sessionStorage.getItem('log')
  const input = {purpose}
  patchRequest(`/logs/${logId}`, input)
}

export const updateLogPlan = async(plan) => {
  if(!sessionStorage.getItem('log')) await addUserLog()
    const logId = sessionStorage.getItem('log')
    let _plan = await getPlanTreatments(plan)
    const input = {plan: _plan}
    patchRequest(`/logs/${logId}`, input)
}

const getPlanTreatments = async(plan) => {
  let planIds = plan.map(el => el.id)
  return await postRequest("/treatments/some", planIds)
}