const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'quizwhiz',
  location: 'europe-central2'
};
exports.connectorConfig = connectorConfig;

const createNewQuizRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewQuiz', inputVars);
}
createNewQuizRef.operationName = 'CreateNewQuiz';
exports.createNewQuizRef = createNewQuizRef;

exports.createNewQuiz = function createNewQuiz(dcOrVars, vars) {
  return executeMutation(createNewQuizRef(dcOrVars, vars));
};

const getQuizByCodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetQuizByCode', inputVars);
}
getQuizByCodeRef.operationName = 'GetQuizByCode';
exports.getQuizByCodeRef = getQuizByCodeRef;

exports.getQuizByCode = function getQuizByCode(dcOrVars, vars) {
  return executeQuery(getQuizByCodeRef(dcOrVars, vars));
};

const recordPlayerAnswerRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordPlayerAnswer', inputVars);
}
recordPlayerAnswerRef.operationName = 'RecordPlayerAnswer';
exports.recordPlayerAnswerRef = recordPlayerAnswerRef;

exports.recordPlayerAnswer = function recordPlayerAnswer(dcOrVars, vars) {
  return executeMutation(recordPlayerAnswerRef(dcOrVars, vars));
};

const getPlayerScoreForQuizSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPlayerScoreForQuizSession', inputVars);
}
getPlayerScoreForQuizSessionRef.operationName = 'GetPlayerScoreForQuizSession';
exports.getPlayerScoreForQuizSessionRef = getPlayerScoreForQuizSessionRef;

exports.getPlayerScoreForQuizSession = function getPlayerScoreForQuizSession(dcOrVars, vars) {
  return executeQuery(getPlayerScoreForQuizSessionRef(dcOrVars, vars));
};
