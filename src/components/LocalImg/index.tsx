import * as imgMap from '@/assets/images';

type LocalImgProps = {
  imgKey: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const LocalImg: React.FC<LocalImgProps> = ({ imgKey, ...props }) => {
  if (!(imgMap as any)[imgKey]) return <>请检查imgKey是否正确</>;

  return <img src={(imgMap as any)[imgKey]} {...props} />;
};

export default LocalImg;
