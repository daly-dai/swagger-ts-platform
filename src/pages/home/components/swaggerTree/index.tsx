import { Tree } from 'antd';

interface SwaggerTreeProps {
  dataSource: any[];
}

const fieldNames = {
  title: 'name',
  key: 'key',
  children: 'operations',
};

export default function SwaggerTree({ dataSource }: SwaggerTreeProps) {
  
  if (!dataSource?.length) return <></>;

  return <Tree fieldNames={fieldNames} treeData={dataSource}></Tree>;
}
