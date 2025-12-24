import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateNewQuizData {
  quiz_insert: Quiz_Key;
}

export interface CreateNewQuizVariables {
  title: string;
  description?: string | null;
  quizCode?: string | null;
  visibility: string;
}

export interface GetPlayerScoreForQuizSessionData {
  playerScores: ({
    score: number;
    joinedAt: TimestampString;
    lastAnsweredAt?: TimestampString | null;
  })[];
}

export interface GetPlayerScoreForQuizSessionVariables {
  quizSessionId: UUIDString;
}

export interface GetQuizByCodeData {
  quizzes: ({
    id: UUIDString;
    title: string;
    description?: string | null;
  } & Quiz_Key)[];
}

export interface GetQuizByCodeVariables {
  quizCode: string;
}

export interface PlayerAnswer_Key {
  id: UUIDString;
  __typename?: 'PlayerAnswer_Key';
}

export interface PlayerScore_Key {
  userId: UUIDString;
  quizSessionId: UUIDString;
  __typename?: 'PlayerScore_Key';
}

export interface Question_Key {
  id: UUIDString;
  __typename?: 'Question_Key';
}

export interface QuizSession_Key {
  id: UUIDString;
  __typename?: 'QuizSession_Key';
}

export interface Quiz_Key {
  id: UUIDString;
  __typename?: 'Quiz_Key';
}

export interface RecordPlayerAnswerData {
  playerAnswer_insert: PlayerAnswer_Key;
}

export interface RecordPlayerAnswerVariables {
  questionId: UUIDString;
  quizSessionId: UUIDString;
  selectedOption: string;
  isCorrect: boolean;
  pointsEarned?: number | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewQuizRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewQuizVariables): MutationRef<CreateNewQuizData, CreateNewQuizVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewQuizVariables): MutationRef<CreateNewQuizData, CreateNewQuizVariables>;
  operationName: string;
}
export const createNewQuizRef: CreateNewQuizRef;

export function createNewQuiz(vars: CreateNewQuizVariables): MutationPromise<CreateNewQuizData, CreateNewQuizVariables>;
export function createNewQuiz(dc: DataConnect, vars: CreateNewQuizVariables): MutationPromise<CreateNewQuizData, CreateNewQuizVariables>;

interface GetQuizByCodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetQuizByCodeVariables): QueryRef<GetQuizByCodeData, GetQuizByCodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetQuizByCodeVariables): QueryRef<GetQuizByCodeData, GetQuizByCodeVariables>;
  operationName: string;
}
export const getQuizByCodeRef: GetQuizByCodeRef;

export function getQuizByCode(vars: GetQuizByCodeVariables): QueryPromise<GetQuizByCodeData, GetQuizByCodeVariables>;
export function getQuizByCode(dc: DataConnect, vars: GetQuizByCodeVariables): QueryPromise<GetQuizByCodeData, GetQuizByCodeVariables>;

interface RecordPlayerAnswerRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordPlayerAnswerVariables): MutationRef<RecordPlayerAnswerData, RecordPlayerAnswerVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordPlayerAnswerVariables): MutationRef<RecordPlayerAnswerData, RecordPlayerAnswerVariables>;
  operationName: string;
}
export const recordPlayerAnswerRef: RecordPlayerAnswerRef;

export function recordPlayerAnswer(vars: RecordPlayerAnswerVariables): MutationPromise<RecordPlayerAnswerData, RecordPlayerAnswerVariables>;
export function recordPlayerAnswer(dc: DataConnect, vars: RecordPlayerAnswerVariables): MutationPromise<RecordPlayerAnswerData, RecordPlayerAnswerVariables>;

interface GetPlayerScoreForQuizSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPlayerScoreForQuizSessionVariables): QueryRef<GetPlayerScoreForQuizSessionData, GetPlayerScoreForQuizSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPlayerScoreForQuizSessionVariables): QueryRef<GetPlayerScoreForQuizSessionData, GetPlayerScoreForQuizSessionVariables>;
  operationName: string;
}
export const getPlayerScoreForQuizSessionRef: GetPlayerScoreForQuizSessionRef;

export function getPlayerScoreForQuizSession(vars: GetPlayerScoreForQuizSessionVariables): QueryPromise<GetPlayerScoreForQuizSessionData, GetPlayerScoreForQuizSessionVariables>;
export function getPlayerScoreForQuizSession(dc: DataConnect, vars: GetPlayerScoreForQuizSessionVariables): QueryPromise<GetPlayerScoreForQuizSessionData, GetPlayerScoreForQuizSessionVariables>;

