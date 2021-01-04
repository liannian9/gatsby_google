import { GETSHORTCUTSSUCCESS, ADDNEWSHORTCUT, DELETENEWSHORTCUT, EDITSHORTCUT } from "../action/list.action"
const initState = [
    {
        "title": "百度一下，你就知道",
        "href": "https://www.baidu.com/",
        "imgUrl": "https://dss1.bdstatic.com/6OF1bjeh1BF3odCf/it/u=2727264799,208757897&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=a7eb58fbafa6e849b73e51e885d2ddba",
    }
]

export default function (state = initState, action) {
    switch (action.type) {
        case GETSHORTCUTSSUCCESS:
            return [...state, action.payload];
        case ADDNEWSHORTCUT:
            return [...state, action.payload];
        case DELETENEWSHORTCUT:
            return [...state.filter(item => item.title !== action.payload.title)];
        case EDITSHORTCUT:
            return [...state.map(item => {
                if (item.title === action.payload.editType) {
                    return {
                        title:action.payload.title,
                        href:action.payload.href,
                        imgUrl:action.payload.imgUrl,
                    }
                }
                return item
            })];
        default:
            return state
    }
    return state
}