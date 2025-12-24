# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateNewQuiz, useGetQuizByCode, useRecordPlayerAnswer, useGetPlayerScoreForQuizSession } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateNewQuiz(createNewQuizVars);

const { data, isPending, isSuccess, isError, error } = useGetQuizByCode(getQuizByCodeVars);

const { data, isPending, isSuccess, isError, error } = useRecordPlayerAnswer(recordPlayerAnswerVars);

const { data, isPending, isSuccess, isError, error } = useGetPlayerScoreForQuizSession(getPlayerScoreForQuizSessionVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createNewQuiz, getQuizByCode, recordPlayerAnswer, getPlayerScoreForQuizSession } from '@dataconnect/generated';


// Operation CreateNewQuiz:  For variables, look at type CreateNewQuizVars in ../index.d.ts
const { data } = await CreateNewQuiz(dataConnect, createNewQuizVars);

// Operation GetQuizByCode:  For variables, look at type GetQuizByCodeVars in ../index.d.ts
const { data } = await GetQuizByCode(dataConnect, getQuizByCodeVars);

// Operation RecordPlayerAnswer:  For variables, look at type RecordPlayerAnswerVars in ../index.d.ts
const { data } = await RecordPlayerAnswer(dataConnect, recordPlayerAnswerVars);

// Operation GetPlayerScoreForQuizSession:  For variables, look at type GetPlayerScoreForQuizSessionVars in ../index.d.ts
const { data } = await GetPlayerScoreForQuizSession(dataConnect, getPlayerScoreForQuizSessionVars);


```