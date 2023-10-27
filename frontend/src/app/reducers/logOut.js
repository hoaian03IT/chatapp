export const logoutReducer = {
    logOutRequest: (state) => {
        state.isFetching = true;
        state.error = false;
        state.messageError = null;
    },
    logOutSuccess: (state) => {
        state.isFetching = false;
        state.currentUser = null;
    },
    logOutFailed: (state, action) => {
        state.isFetching = false;
        state.messageError = action.payload;
        state.error = true;
    },
};
