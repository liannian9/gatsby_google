import React, { useState, useRef } from 'react'

export const UploadInput = ({ onChange, value }) => {
    const [url, setUrl] = useState(value || '')
    function changeInput(e) {
        upLoadImg(e.currentTarget.files[0])
        // onChange(e)
    }
    const inputRef = useRef();
    function upLoadImg(fileObj) {
        if (fileObj.size > 1024 * 10) {//
            alert('图片大小超过限制！最大10M')
            return
        }
        var reader = new FileReader(); //声明一个FileReader实例
        reader.readAsDataURL(fileObj); //调用readAsDataURL方法来读取选中的图像文件
        //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
        reader.onload = function (e) {
            setUrl(e.currentTarget.result)
            onChange(e.currentTarget.result)
            // img.setAttribute('src',  this.result);
        }
    }
    function upLoad() {
        inputRef.current.click()
    }
    return (
        <React.Fragment>
            {url && <img src={url} onClick={upLoad} />}
            <input value={''} ref={inputRef} id="input" accept="image/*" type="file" onChange={changeInput} style={{ visibility: url ? "hidden" : "visible" }} />
        </React.Fragment>
    )
}

export default UploadInput