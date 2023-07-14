import {createSlice} from '@reduxjs/toolkit';

export const JobSlice = createSlice({

    name: 'jobdata',
    initialState: {
        jobdata: [],
    },
    reducers: {
        setjobdata: (state, action) => {
            state.jobdata = action.payload
            console.log(action)
        },
    }

})

export const {setjobdata} = JobSlice.actions
export default JobSlice.reducer
