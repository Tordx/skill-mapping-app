import {createSlice} from '@reduxjs/toolkit';

export const ApplicationSlice = createSlice({

    name: 'jobdata',
    initialState: {
        applicationdata: [],
    },
    reducers: {
        setapplicationdata: (state, action) => {
            state.applicationdata = action.payload
            console.log(action)
        },
    }

})

export const {setapplicationdata} = ApplicationSlice.actions
export default ApplicationSlice.reducer
