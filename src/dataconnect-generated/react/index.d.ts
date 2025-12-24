import { CreateNewQuizData, CreateNewQuizVariables, GetQuizByCodeData, GetQuizByCodeVariables, RecordPlayerAnswerData, RecordPlayerAnswerVariables, GetPlayerScoreForQuizSessionData, GetPlayerScoreForQuizSessionVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewQuiz(options?: useDataConnectMutationOptions<CreateNewQuizData, FirebaseError, CreateNewQuizVariables>): UseDataConnectMutationResult<CreateNewQuizData, CreateNewQuizVariables>;
export function useCreateNewQuiz(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewQuizData, FirebaseError, CreateNewQuizVariables>): UseDataConnectMutationResult<CreateNewQuizData, CreateNewQuizVariables>;

export function useGetQuizByCode(vars: GetQuizByCodeVariables, options?: useDataConnectQueryOptions<GetQuizByCodeData>): UseDataConnectQueryResult<GetQuizByCodeData, GetQuizByCodeVariables>;
export function useGetQuizByCode(dc: DataConnect, vars: GetQuizByCodeVariables, options?: useDataConnectQueryOptions<GetQuizByCodeData>): UseDataConnectQueryResult<GetQuizByCodeData, GetQuizByCodeVariables>;

export function useRecordPlayerAnswer(options?: useDataConnectMutationOptions<RecordPlayerAnswerData, FirebaseError, RecordPlayerAnswerVariables>): UseDataConnectMutationResult<RecordPlayerAnswerData, RecordPlayerAnswerVariables>;
export function useRecordPlayerAnswer(dc: DataConnect, options?: useDataConnectMutationOptions<RecordPlayerAnswerData, FirebaseError, RecordPlayerAnswerVariables>): UseDataConnectMutationResult<RecordPlayerAnswerData, RecordPlayerAnswerVariables>;

export function useGetPlayerScoreForQuizSession(vars: GetPlayerScoreForQuizSessionVariables, options?: useDataConnectQueryOptions<GetPlayerScoreForQuizSessionData>): UseDataConnectQueryResult<GetPlayerScoreForQuizSessionData, GetPlayerScoreForQuizSessionVariables>;
export function useGetPlayerScoreForQuizSession(dc: DataConnect, vars: GetPlayerScoreForQuizSessionVariables, options?: useDataConnectQueryOptions<GetPlayerScoreForQuizSessionData>): UseDataConnectQueryResult<GetPlayerScoreForQuizSessionData, GetPlayerScoreForQuizSessionVariables>;
