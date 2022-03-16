import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    username: null,
    currentTopic: null,
    currentFlashcard: null,
    notes: [],
    topics: [],
    flashcards: [],
    showFlashcards: false,
    showAnswer: false,
}

//Login should:
//  authenticate user
//  send back all topics, notes, and flashcards associated with that user
export const login = createAsyncThunk(
    'systemDesign/login',
    async loginObj => {
        const response = await axios.get('/auth/login', loginObj)
        return response.data
    }
)

//Signup simply adds a user to the database
export const signup = createAsyncThunk(
    'systemDesign/signup',
    async signupObj => {
        const response = await axios.post('/auth/signup', signupObj)
        return response.data
    }
)

//createTopic, submitFlashcard, and submitNote:
//  add to the database
//  send back the updated data depending on which route
export const createTopic = createAsyncThunk(
    'systemDesign/createTopic',
    async topic => {
        const response = await axios.post('/topics/createTopic', topic)
        return response.data
    }
)

export const submitFlashcard = createAsyncThunk(
    'systemDesign/submitFlashcard',
    async flashcardObj => {
        const response = await axios.post('/topics/submitFlashcard', flashcardObj)
        return response.data
    }
)

export const submitNote = createAsyncThunk(
    'systemDesign/submitNote',
    async note => {
        const response = await axios.post('/topics/submitFlashcard', note)
        return response.data
    }
)

//TELL GROUP I CHANGED TOPIC TO GETTOPIC
export const getTopic = createAsyncThunk(
    'systemDesign/topic',
    async topic => {
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
            state.username = action.payload.username
            state.topics = action.payload.topics
        },
        [signup.fulfilled]: (state, action) => {
            console.log('action for signup: ', action)
            state.username = action.payload.username
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
            state.notes = action.payload.notes
            state.flashcards = action.payload.flashcards
            state.currentTopic = action.payload.topic
        }
    }
})