import {createSlice} from '@reduxjs/toolkit';

export const ArchiveSlice = createSlice({

    name: 'archivedata',
    initialState: {
        archivedata: '',
    },
    reducers: {
        setArchiveData: (state, action) => {
            state.archivedata = action.payload
            console.log(action)
        },
    }

})

export const {setArchiveData} = ArchiveSlice.actions
export default ArchiveSlice.reducer
