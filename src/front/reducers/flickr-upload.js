export default (state = {}, action) => {
    switch (action.type) {
        case 'LIST_ALBUMS':
            return {
                ...state,
                albumList: action.payload,
            };
        case 'UPLOAD_STATUS':
            return {
                ...state,
                uploadStatus: action.payload,
        };
        default:
            return state;
    }
};
