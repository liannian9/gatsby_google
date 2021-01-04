import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { getShortcuts } from "../../store/action/list.action"
import Dialog from "../components/dialog"
import {graphql} from "gatsby"
import { useDispatch, useSelector } from "react-redux"
import { DELETENEWSHORTCUT } from "../../store/action/list.action"

function Home({ data, listReducer, getShortcuts }) {
  let shortCuts = listReducer
  const [open, changeOpen] = useState(false)
  const [editData, changeEditData] = useState({})
  const [editType, changeEditType] = useState('')
  const [operateModal, changeOperateModal] = useState('')
  const dispatch = useDispatch()

  const changeOperate = (e, title) => {
    e.preventDefault()
    changeOperateModal(title)
  }
  const editShortCut = (data) => {
    changeEditData(data)
    if (data.title) {
      changeEditType(data.title)
    }
    changeOpen(true)
    changeOperateModal('')
  }
  const closeModal = () => {
    changeOpen(false)
    changeEditData({})
    changeEditType('')
  }
  const deleteShortCut = (payload) => {
    dispatch({
      type: DELETENEWSHORTCUT,
      payload
  })
    changeOperateModal('')
}
  return (
    <React.Fragment>
      <div id="container">
        {
          shortCuts.map(shortCut => (
            <a
              className="tile"
              draggable="true"
              title={shortCut.title}
              href={shortCut.href}
              key={Math.random() * Math.random()}
            >              
              <div
                id="actionMenuButton"
                className="icon-more-vert"
                title="更多操作"
                onClick={(e) => changeOperate(e, shortCut.title)}
              >
              ︙

              {shortCut.title === operateModal && <div id="wrapper" className="item-wrapper" role="menu">
                <button id="actionMenuEdit" className="dropdown-item" role="menuitem" onClick={() => editShortCut(shortCut)}>
                  修改快捷方式
                </button>
                <button id="actionMenuRemove" className="dropdown-item" role="menuitem" onClick={() => deleteShortCut(shortCut)}>
                  移除
                </button>
              </div>}
              
              </div>
              <div className="tile-icon">
                <img
                  draggable="false"
                  src={shortCut.imgUrl}
                />
              </div>
              <div className="tile-title title-ltr">
                <span>{shortCut.title}</span>
              </div>
            </a>
          ))
        }
        {shortCuts.length < 10 && <div
          className="tile"
          draggable="true"
          onClick={() => editShortCut({})}
        >
          <div className="tile-icon" style={{ fontSize: "30px", fontWeight: '600' }}>
            +
          </div>
          <div className="tile-title title-ltr">
            <span>添加快捷方式</span>
          </div>
        </div>}
      </div>
      {open && <Dialog changeOpen={closeModal} editData={editData} editType={editType}/>}
      
    </React.Fragment>
  )
}


export const query = graphql`
query {
  allShortcutJson {
    nodes {
      href
      imgUrl
      title
    }
  }
}
`

export default connect(state => ({ listReducer: state.listReducer }), { getShortcuts })(Home)
