import { configureStore } from '@reduxjs/toolkit'
import systemDesignReducer from './reducer.js'

export const store = configureStore({
    reducer: {
      systemDesign: systemDesignReducer,
    },
})

// export default store;