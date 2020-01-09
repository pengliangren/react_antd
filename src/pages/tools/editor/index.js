import React, { Component } from 'react';
import {Row, Col, Card, message} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';

import './index.less';

const rawContentState = {
  entityMap: {
    '0': {
      type: 'IMAGE',
      mutability: 'MUTABLE',
      data: { src: 'http://i.imgur.com/aMtBIep.png', height: 'auto', width: '100%' }
    }
  },
  blocks: [
    {
      key: '9unl6',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: '95kn',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [{ offset: 0, length: 1, key: 0 }],
      data: {}
    },
    {
      key: '7rjes',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
}

class wysiwyg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      editorContent: undefined,
      contentState: rawContentState
    }
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  onContentStateChange = (editorContent) => {
    this.setState({
      editorContent
    })
  }

  clearContent = () => {
    this.setState({
      contentState: ''
    })
  }

  //  上传图片
  imageUploadCallBack = file => {
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image')
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      // xhr.open('POST', 'http://localhost:27018/upload');
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      // xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With');
      // xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      const data = new FormData();
      data.append('image', file)
      xhr.send(data)
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText)
        resolve(response)
      })
      xhr.addEventListener('error', () => {
        message.error('上传图片失败')
        const error = JSON.parse(xhr.responseText)
        reject(error)
      })
    })
  }

  render() {
    const {editorContent, editorState} = this.state;
    return (
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <div className="cloud-box">
              <Card title="富文本编辑器" bordered>
                <Editor 
                  editorState={editorState}
                  toolbarClassName="home-toolbar"
                  wrapperClassName="home-wrapper"
                  editorClassName="home-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  onContentStateChange = {this.onContentStateChange}
                  toolbar = {{
                    history: { inDropdown: true},
                    list: { inDropdown: true }, // 横排变成下拉方式
                    textAlign: { inDropdown: true },
                    image: { uploadCallback: this.imageUploadCallBack }
                  }}
                  placeholder="尝试输入 @ 哦，有惊喜"
                  spellCheck
                  onFocus = {() => {
                    console.log('focus')
                  }}
                  onBlur = {() => {
                    console.log('blur')
                  }}
                  onTab={() => {
                    console.log('tab')
                    return true
                  }}
                  localization={{ locale: 'zh', translations: { 'generic.add': 'Add' } }}
                  mention={{
                    separator: ' ',
                    trigger: '@',
                    caseSensitive: true,
                    suggestions: [
                      { text: 'A', value: 'AB', url: 'href-a' },
                      { text: 'AB', value: 'ABC', url: 'href-ab' },
                      { text: 'ABC', value: 'ABCD', url: 'href-abc' },
                      { text: 'ABCD', value: 'ABCDDDD', url: 'href-abcd' },
                      { text: 'ABCDE', value: 'ABCDE', url: 'href-abcde' },
                      { text: 'ABCDEF', value: 'ABCDEF', url: 'href-abcdef' },
                      { text: 'ABCDEFG', value: 'ABCDEFG', url: 'href-abcdefg' }
                    ]
                  }}
                />
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <Card title="同步转换HTML" bordered>
              <pre>{draftToHtml(editorContent)}</pre>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="同步转换MarkDown" bordered>
              <pre style={{whiteSpace: 'pre-wrap'}}>{draftToMarkdown(editorContent)}</pre>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="同步转换JSON" bordered>
              <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(editorContent)}</pre>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
 
export default wysiwyg;