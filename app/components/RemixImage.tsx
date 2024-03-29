import { useImage } from "react-image";
import { Img } from "@chakra-ui/react";

export default function RemixImage(props: any) {
  const { src } = useImage({
    srcList: props.image,
    useSuspense: true,
  });

  const { ...rest } = props;

  return <Img src={src} loading="lazy" alt="" {...rest} />;
}
