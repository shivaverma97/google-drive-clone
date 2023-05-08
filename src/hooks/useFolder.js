import { useEffect, useReducer } from 'react'
import { db } from '../authentication/Firebase'
import { getDoc, doc, collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { useAuth } from '../contexts/AuthContext'

const ACTIONS = {
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders"
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

        case ACTIONS.SET_CHILD_FOLDERS:
            return{
                ...state,
                childFolders: payload.childFolders
            }
        default:
            return state
    }
}

export function useFolder(folderId = null, folder = null) {
    const {currentUser} = useAuth()
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })
    
    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
    }, [folder, folderId])

    useEffect(() => {
        if (folderId == null) {
            return dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } })
        }

        getDoc(doc(db, "folders", folderId))
            .then((doc) => {
                if (doc.exists()) {
                    const formattedDoc = {
                        id: doc.id,
                        ...doc.data()
                    }
                    dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: formattedDoc } })
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }, [folderId])

    useEffect(() => {
        const queryConstraints = []
        queryConstraints.push(where('parentId', '==', folderId))
        queryConstraints.push(where('userId', '==', currentUser.uid))
        queryConstraints.push(orderBy('createdAt'))
        const q = query(collection(db, 'folders'), ...queryConstraints)
    
        return onSnapshot(q, (querySnapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: querySnapshot.docs.map(doc => {
                    return { id: doc.id, ...doc.data()}
                })}
            })
        })
    }, [folderId, currentUser])

    return state
}
