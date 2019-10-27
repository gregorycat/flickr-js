const LISTE_ALBUMS = 'LIST_ALBUMS';
const UPLOAD_STATUS = 'UPLOAD_STATUS';
const PHOTO_COUNT = 'PHOTO_COUNT';
const PROFILE = 'PROFILE';

export default (state = {}, action) => {
    switch (action.type) {
        case LIST_ALBUMS:
            return {
                ...state,
                albumList: action.payload,
            };
        case UPLOAD_STATUS:
            return {
                ...state,
                uploadStatus: action.payload,
            };
        case PHOTO_COUNT:
            return {
                ...state,
                photoCount: action.payload
            };
        case PROFILE: 
            return {
                ...state,
                profile: action.payload,
            };
        default:
            return state;
    }
};
