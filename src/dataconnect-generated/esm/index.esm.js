import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'quizwhiz',
  location: 'europe-central2'
};

export const createNewQuizRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewQuiz', inputVars);
}
createNewQuizRef.operationName = 'CreateNewQuiz';

export function createNewQuiz(dcOrVars, vars) {
  return executeMutation(createNewQuizRef(dcOrVars, vars));
}

export const getQuizByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizByCode', inputVars);
}
getQuizByCodeRef.operationName = 'GetQuizByCode';

export function getQuizByCode(dcOrVars, vars) {
  return executeQuery(getQuizByCodeRef(dcOrVars, vars));
}

export const recordPlayerAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordPlayerAnswer', inputVars);
}
recordPlayerAnswerRef.operationName = 'RecordPlayerAnswer';

export function recordPlayerAnswer(dcOrVars, vars) {
  return executeMutation(recordPlayerAnswerRef(dcOrVars, vars));
}

export const getPlayerScoreForQuizSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPlayerScoreForQuizSession', inputVars);
}
getPlayerScoreForQuizSessionRef.operationName = 'GetPlayerScoreForQuizSession';

export function getPlayerScoreForQuizSession(dcOrVars, vars) {
  return executeQuery(getPlayerScoreForQuizSessionRef(dcOrVars, vars));
}

