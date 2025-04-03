import Image from "next/image";
import React from "react";

import ImageLoading from "@/public/image/loading.gif";

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <Image src={ImageLoading} alt="Loading GIF Image" />
    </div>
  );
};

export default Loading;
