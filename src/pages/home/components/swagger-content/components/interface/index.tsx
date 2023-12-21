import CodeMirror from '@/components/codeMirror';
import './index.less';

export default function Interface({ interfaceData }: any) {
  const prefixCls = 'interface';
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-title`}>{interfaceData?.name || ''}</div>
      <div className={`${prefixCls}-path`}>{interfaceData?.path || ''}</div>
      <div>params</div>
      <CodeMirror></CodeMirror>
    </div>
  );
}
