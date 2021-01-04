import React, { useState, useEffect } from 'react'
import { ADDNEWSHORTCUT, EDITSHORTCUT } from "../../store/action/list.action"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "gatsby"
import UploadInput from "./upLoadInput"

export const Dialog = ({ changeOpen, editData, editType }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(editData.title || '')
    const [href, setHref] = useState(editData.href || '')
    const [imgUrl, setImgUrl] = useState(editData.imgUrl || '')
    const [status, changeStatus] = useState(false)
    const listReducer = useSelector(state => state.listReducer)
    function changeInput(e, field) {
        if (field === 'Title') {
            setTitle(e.currentTarget.value)
        } else if (field === 'Href') {
            setHref(e.currentTarget.value)
        } else if (field === 'ImgUrl') {
            setImgUrl(e)
        }
    }
    useEffect(() => {
        canSubmit()
    }, [href, title, imgUrl])

    function canSubmit() {
        if (href && title && imgUrl) {
            changeStatus(true)
            return
        }
        changeStatus(false)
    }
    function handleSubmit() {
        if (!status) return
        if (!editType) {
            if (listReducer.filter(item => item.title === title).length > 0) {
                alert('已存在的标题！')
                return
            }
            dispatch({
                type: ADDNEWSHORTCUT,
                payload: {
                    title,
                    href,
                    imgUrl
                }
            })

        } else {
            dispatch({
                type: EDITSHORTCUT,
                payload: {
                    title,
                    href,
                    imgUrl,
                    editType
                }
            }) 
        }
        changeOpen(false)

    }

    return (
        <div id="dialog">
            <div id="title">
                添加快捷方式
            </div>
            <div id="body">
                <div id="label" className="cr-form-field-label">
                    名称
                </div>
                <div id="row-container">
                    <div id="input-container">
                        <div id="inner-input-container">
                            <input id="input" type="text" value={title} onChange={(e) => changeInput(e, 'Title')} />
                        </div>
                        <div id="underline"></div>
                    </div>
                </div>
                <div id="label" className="cr-form-field-label">
                    网址
                </div>
                <div id="row-container">
                    <div id="input-container">
                        <div id="inner-input-container">
                            <input id="input" type="text" value={href} onChange={(e) => changeInput(e, 'Href')} />
                        </div>
                        <div id="underline"></div>
                    </div>
                </div>
                <div id="label" className="cr-form-field-label">
                    图片
                </div>
                <div id="row-container">
                    <div id="input-container">
                        <div id="inner-input-container">
                            <UploadInput onChange={(e) => changeInput(e, 'ImgUrl')} value={editData.imgUrl}/>
                        </div>
                        <div id="underline"></div>
                    </div>
                </div>
            </div>
            <div id="button-container">
                <button
                    className="cancel-button"
                    onClick={() => changeOpen(false)}
                >
                    取消
            </button>
                <button
                    className="action-button"
                    disabled={!status}
                    onClick={handleSubmit}
                    style={{ cursor: !status ? 'not-allowed' : 'pointer' }}
                >
                    完成
            </button>
            </div>
        </div>
    )
}

export default Dialog