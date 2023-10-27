export const registerReducer = {
    registerRequest: (state) => {
        state.isFetching = true;
        state.error = false;
        state.messageError = null;
    },
    registerSuccess: (state, action) => {
        state.isFetching = false;
        state.currentUser = action.payload;
    },
    registerFailed: (state, action) => {
        state.isFetching = false;
        state.messageError = action.payload;
        state.error = true;
    },
};
