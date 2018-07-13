export default (state = {}, action) => {
    switch (action.type) {
        case 'TYPE':
            return {
                ...state,
                isApiLoaded: action.payload,
            };
        default:
            return state;
    }
};
