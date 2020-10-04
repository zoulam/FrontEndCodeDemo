import React, { useState, useEffect, useRef } from 'react';
import './App.css';
// 引入react-MDE库
import SimpleMDE from "react-simplemde-editor";
import { v4 as uuidv4 } from 'uuid';
import { flattenArr, objToArr } from './utils/helper';
import fileHelper from './utils/fileHelper'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import "easymde/dist/easymde.min.css";
import FileSearch from './components/FileSearch';
import FileList from './components/FileList'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'

// nodejs模块
const { join } = window.require('path');
const { remote } = window.require('electron')

const Store = window.require('electron-store');
const fileStore = new Store({ 'name': 'file data' });
// 精简数据结构剔除不需要的内容（如：body和isNew）
const saveFilesToStore = (files) => {
  const fileStoreObj = files.reduce((result, file) => {
    const { id, path, title, createAt } = file;
    result[id] = {
      id,
      path,
      title,
      createAt
    }
    return result;
  }, {})
  fileStore.set('files', fileStoreObj)
}


function App() {

  // 处理组件的回调函数
  // files 文件详细信息，
  // activeFileId当前正在使用的文件id，activeFile当前被使用的文件
  // openedFileIDs被打开的文件id数组， openFiles打开的文件数组
  // unsavedFileIDs未保存的文件id数组
  const [files, setFiles] = useState(flattenArr(fileStore.get('files') || {}));
  const [activeFileID, setActiveFileID] = useState('');
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setunsavedFileIDs] = useState([]);
  const filesArr = objToArr(files)

  // 使用主进程的api保存文件路径
  const saveLocation = remote.app.getPath('documents')
  // 保存文件状态
  const [searchFiles, setSearchFiles] = useState([]);
  // 使用id获取各项数据
  // const activeFile = files.find(file => file.id === activeFileID)
  const activeFile = files[activeFileID]
  const openFiles = openedFileIDs.map(openID => files[openID])
  const filesListArr = (searchFiles.length > 0) ? searchFiles : filesArr;

  // 打开文件
  const fileClick = (fileID) => {
    setActiveFileID(fileID)
    // 避免单个文件被打开多次
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID])
    }
  }
  // 列表按钮实现切换
  const tabClick = (fileID) => {
    setActiveFileID(fileID)
  }

  // 关闭页面
  const tabClose = (id) => {
    // 关闭指定标签
    const tabsWithout = openedFileIDs.filter(fileID => fileID !== id)
    setOpenedFileIDs(tabsWithout);
    // 切换到第一个标签页
    if (tabsWithout.length > 0) {
      console.log('run');
      setActiveFileID(tabsWithout[0])
    } else {
      setActiveFileID('')
    }
  }

  const fileChange = (id, value) => {
    // 更新内容
    // const newFiles = files.map((file) => {
    //   if (file.id === id) {
    //     file.body = value;
    //   }
    //   return file;
    // })
    // 不能用赋值的方式直接修改react的hook
    const newFile = { ...files[id], body: value }
    setFiles({ ...files, [id]: newFile });
    // 更新未保存的id
    if (!unsavedFileIDs.includes(id)) {
      setunsavedFileIDs([...unsavedFileIDs, id])
    }
  }

  const deleteFile = (id) => {
    // 删除文件
    // const newFiles = files.filter(file => file.id !== id)
    delete files[id]
    setFiles(files);
    // 如果是打开状态的文件，同时还要关闭tab
    tabClose(id)
  }

  const updateFileName = (id, title, isNew) => {
    // const newFiles = files.map(file => {
    //   if (file.id === id) {
    //     file.title = title
    //     file.isNew = false;
    //   }
    //   return file
    // })
    // const modifiedFile = { ...files[id], title: title, isNew: false }
    const modifiedFile = { ...files[id], title: title, isNew: false }
    // 新建文件保存到本地
    if (isNew) {
      fileHelper.writeFile(join(saveLocation, `${title}.md`), files[id].body).then(value => {
        setFiles({ ...files, [id]: modifiedFile })
      });
    } else {
      fileHelper.renameFile(join(saveLocation, `${files[id].title}.md`),
        join(saveLocation, `${title}.md`)
      ).then(() => {
        setFiles({ ...files, [id]: modifiedFile })
      })
    }

  }

  // 文件查找，两个坑：
  // 右侧的列表会被关闭【创建新的列表数组】
  // 返回的时候需要恢复文件列表
  const fileSearch = (keyword) => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchFiles(newFiles);
  }

  const createNewFile = () => {
    const newID = uuidv4()
    const date = Date().now;
    const newFile = {
      id: newID,
      title: '',
      body: '请输入MarkDown',
      ceatedAt: date,
      isNew: true
    }
    setFiles({ ...files, [newID]: newFile })
  }

  const saveCurrentFile = () => {
    fileHelper.writeFile(join(saveLocation, `${activeFile.title}.md`, activeFile.body))
      .then(value => {
        setunsavedFileIDs(unsavedFileIDs.filter((id) => id !== activeFile.id))
      });
  }

  return (
    // px-0去除两边的padding 其中p是padding的意思
    <div className="App container-fluid px-0">
      {/* no-gutters:去除空隙 */}
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch
            // title={123} 类型检查测试
            title='my cloud doc'
            onFileSearch={fileSearch}
          />
          <FileList
            files={filesListArr}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="button-group row no-gutters">
            <div className="col-6">
              <BottomBtn
                text="新建"
                colorClass="bg-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col-6">
              <BottomBtn
                text="导入"
                colorClass="bg-success"
                icon={faFileImport}
                onBtnClick={() => { console.log('import') }}
              />
            </div>
          </div>
        </div>
        <div className="col-9  right-panel">
          {!activeFile &&
            <div className="start-page">
              {'please open file or create new file'}
            </div>
          }
          {activeFile &&
            <>
              <TabList
                files={openFiles}
                onTabClick={tabClick}
                activeId={activeFileID}
                oncloseTab={tabClose}
                unsaveIds={unsavedFileIDs}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => { fileChange(activeFile.id, value) }}
                options={{
                  minHeight: '610px'
                }}
              />;
          </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
