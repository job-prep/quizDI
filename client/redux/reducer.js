import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    // user: {_id: 1, username: 'abc', password: 'abc'},
    user: null,
    currentTopic: 'Twitter',
    currentFlashcard: {
      question: 'Q: Which cache replacement policy would best fit our needs?', 
      answer: 'A: When the cache is full and we want to replace a tweet with a newer/hotter tweet, how would we choose? Least Recently Used (LRU) can be a reasonable policy for our system. Under this policy, we discard the least recently viewed tweet first.', 
      _id: 1,
      topic: 'Twitter',
      created_at: 1647455263
    },
    notes: [{
      note: 'N: Cache design for Twitter', 
      _id: 1,
      topic: 'Twitter',
      created_at: 1647455146
    },
    {
      note: 'N: We can introduce a cache for database servers to cache hot tweets and users. We can use an off-the-shelf solution like Memcache that can store the whole tweet objects. Application servers, before hitting database, can quickly check if the cache has desired tweets. Based on clients’ usage patterns we can determine how many cache servers we need.', 
      _id: 2,
      topic: 'Twitter',
      created_at: 1647455273
    },
    {
      note: 'N: Design uber', 
      _id: 4,
      topic: 'Uber',
      created_at: 1647455980
    },
    ],
    topics: ['Twitter', 'Uber'],
    flashcards: [{
      question: 'Q: Which cache replacement policy would best fit our needs?', 
      answer: 'A: When the cache is full and we want to replace a tweet with a newer/hotter tweet, how would we choose? Least Recently Used (LRU) can be a reasonable policy for our system. Under this policy, we discard the least recently viewed tweet first.', 
      _id: 1,
      topic: 'Twitter',
      created_at: 1647455263
    },
    {
      question: 'Q: How can we have a more intelligent cache?', 
      answer: 'A: If we go with 80-20 rule, that is 20% of tweets generating 80% of read traffic which means that certain tweets are so popular that a majority of people read them. This dictates that we can try to cache 20% of daily read volume from each shard.', 
      _id: 2,
      topic: 'Twitter',
      created_at: 1647455269
    },
    ],
    showFlashcards: false,
    showAnswerBool: false,
}


export const login = createAsyncThunk(
    'systemDesign/login',
    async (loginObj, thunkAPI) => {
        console.log('async login function triggered')
        const response = await axios.post('/auth/login', loginObj)
        console.log('user: ', response.data)
        return response.data
    }
)

export const signup = createAsyncThunk(
    'systemDesign/signup',
    async (signupObj, thunkAPI) => {
        const response = await axios.post('/auth/signup', signupObj)
        return response.data
    }
)

export const createTopic = createAsyncThunk(
    'systemDesign/createTopic',
    async (topic, thunkAPI) => {
        const response = await axios.post('/topics/createTopic', topic)
        return response.data
    }
)

export const submitFlashcard = createAsyncThunk(
    'systemDesign/submitFlashcard',
    async (flashcardObj, thunkAPI) => {
        const response = await axios.post('/topics/submitFlashcard', flashcardObj)
        console.log('submitFlashcard response from server: ', response.data)
        return response.data
    }
)

export const submitNote = createAsyncThunk(
    'systemDesign/submitNote',
    async (note, thunkAPI) => {
        const response = await axios.post('/topics/submitFlashcard', note)
        console.log('submitNote response from server: ', response.data)
        return response.data
    }
)

export const getTopic = createAsyncThunk(
    'systemDesign/topic',
    async (topic, thunkAPI) => {
        const response = await axios.get('/topics/getTopic', topic)
        return response.data
    }
)

export const storeSlice = createSlice({
    name: 'systemDesign',
    initialState,
    reducers: {
        showFlashcards: (state) => {
            state.showAnswerBool = false

            //If this is the first time we are showing flashcards, set current flashcard to first element
            if (state.currentFlashcard === null && state.showFlashcards === false) {
                state.showFlashcards = true
                state.currentFlashcard = state.flashcards[0]
            //else flip showFlashcards boolean
            } else state.showFlashcards = !state.showFlashcards
        },
        nextFlashcard: (state) => {
            state.showAnswerBool = false

            //get the question of the object
            const question = Object.values(state.currentFlashcard)[0]
            //find index of the current flashcard using question
            const index = state.flashcards.findIndex(flashcard => flashcard.question === question)
            //increment current flashcard if there is another element, if not go back to the first
            if (state.flashcards[index + 1]) state.currentFlashcard = state.flashcards[index + 1]
            else state.currentFlashcard = state.flashcards[0]
        },
        showAnswer: (state) => {
            console.log('showAnswer hit')
            state.showAnswerBool = !state.showAnswerBool
        },
        showTopic: (state) => {
            state.showFlashcards = false
        }
    },
    //Can we use object destructuring like { payload } instead of taking in action as second param?
    //Add in pending and rejected?
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            console.log('action for login: ', action)
            console.log('payload:', action.payload)
            if (action.payload.validAuth) {
                state.user = action.payload.user
                state.topics = action.payload.topics
            }
        },
        [signup.fulfilled]: (state, action) => {
            console.log('action for signup: ', action)
            if (action.payload.validAuth) state.user = action.payload
        },
        [createTopic.fulfilled]: (state, action) => {
            state.topics = action.payload.topics
        },
        [submitFlashcard.fulfilled]: (state, action) => {
            state.flashcards = action.payload.flashcards
        },
        [submitNote.fulfilled]: (state, action) => {
            state.notes = action.payload.notes
        },
        [getTopic.fulfilled]: (state, action) => {
            //TOPIC title returned as well?**
            state.notes = action.payload.notes
            state.flashcards = action.payload.flashcards
            state.currentTopic = action.payload.topic
        }
    }
})

export const { showFlashcards, nextFlashcard, showAnswer, showTopic } = storeSlice.actions
export default storeSlice.reducer 