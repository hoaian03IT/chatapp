export const updateProfileReducer = {
    updateProfileRequest: (state) => {
        state.isFetching = true;
        state.error = false;
        state.messageError = null;
    },
    updateProfileSuccess: (state, action) => {
        state.isFetching = false;
        state.currentUser = { ...state.currentUser, ...action.payload };
    },
    updateProfileFailed: (state, action) => {
        state.isFetching = false;
        state.messageError = action.payload;
        state.error = true;
    },
};
