import { useEffect, useReducer } from 'react'
import { db } from '../authentication/Firebase'
import { getDoc, doc } from "firebase/firestore"

const ACTIONS = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder"
}

export const ROOT_FOLDER = {
    name: "Root",
    id: null,
    path: []
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolder: [],
                childFiles: []
            }

        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }

        default:
            return state
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolder: [],
        childFiles: []
    })

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
    }, [folder, folderId])

    useEffect(() => {
        if (folderId == null) {
            return dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } })
        }

        // getDocs(collection(db, "folders").doc(folderId))
        //     .then((querySnapshot) => {
        //         const newData = querySnapshot.docs
        //             .map((doc) => ({ ...doc.data(), id: doc.id }));
        //         console.log(newData);
        //     })

        getDoc(doc(db, "folders", folderId))
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    console.log(data);
                    // Do something with the data...
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }, [folderId])

    return state
}
