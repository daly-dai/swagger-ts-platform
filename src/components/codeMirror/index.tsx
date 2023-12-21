// myCodemirror.tsx
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import React, { useEffect, useRef } from 'react';

const CodeMirror: React.FC = () => {
  const editorRef = useRef(null);

  const initCodeMirrorConfig = () => {
    if (!editorRef.current) return null;

    // 初始化CodeMirror编辑器
    const state = EditorState.create({
      doc: `
      export interface AppAuthInfo {
        /** 接口地址（多个用逗号隔开） */
        apiName?: string
      
        /** 应用秘钥 */
        appKey?: string
      
        /** 应用名称 */
        appName?: string
      
        /** 创建时间 */
        createdAt?: string
      
        /** 主键 */
        id?: number
      
        /** 修改时间 */
        updateAt?: string
      }
      `,
      extensions: [basicSetup, javascript()],
    });

    const editor = new EditorView({
      state,
      parent: editorRef.current,
    });

    return editor;
  };
  useEffect(() => {
    const editor = initCodeMirrorConfig();

    return () => {
      (editor as any)?.destroy(); // 注意：此后此处要随组件销毁
    };
  }, []);
  return <div ref={editorRef}></div>;
};

export default CodeMirror;
