import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    user: null,
    currentTopic: null,
    currentFlashcard: null,
    notes: [],
    topics: [],
    flashcards: [],
    showFlashcards: false,
    showAnswer: false,
}


export const login = createAsyncThunk(
    'systemDesign/login',
    async (loginObj, thunkAPI) => {
        console.log('async login function triggered')
        const response = await axios.post('/auth/login', loginObj)
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
        return response.data
    }
)

export const submitNote = createAsyncThunk(
    'systemDesign/submitNote',
    async (note, thunkAPI) => {
        const response = await axios.post('/topics/submitFlashcard', note)
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
            state.showAnswer = false

            //If this is the first time we are showing flashcards, set current flashcard to first element
            if (state.currentFlashcard === null && state.showFlashcards === false) {
                state.showFlashcards = true
                state.currentFlashcard = state.flashcards[0]
            //else flip showFlashcards boolean
            } else state.showFlashcards = !state.showFlashcards
        },
        nextFlashcard: (state) => {
            state.showAnswer = false

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
            state.showAnswer = !state.showAnswer
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