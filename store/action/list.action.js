export const GETSHORTCUTSSUCCESS = "get_shortcut_success"
export const ADDNEWSHORTCUT = "add_new_shortcut"
export const DELETENEWSHORTCUT = "delete_new_shortcut"
export const EDITSHORTCUT = "edit_shortcut"

export const getShortcuts = (payload) => {
    return dispatch => {
        dispatch({
            type: GETSHORTCUTSSUCCESS,
            payload
        })
    }
}