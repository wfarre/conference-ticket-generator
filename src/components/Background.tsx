import BgImageMobile from "../assets/images/background-mobile.png";
import BgImageTablet from "../assets/images/background-tablet.png";
import BgImageDesktop from "../assets/images/background-desktop.png";

import DecoTop from "../assets/images/pattern-squiggly-line-top.svg";

const Background = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <picture className="absolute top-5.5 right-0 h-13 w-28 md:w-[232px] md:h-[108px] lg:w-[446px] lg:h-[208px]">
        <img
          className="absolute top-0 left-0 w-full h-full"
          src={DecoTop}
          alt=""
        />
      </picture>
      <picture className="absolute top-0 left-0 h-full w-full z-[-1]">
        <source media="(min-width: 768px)" srcSet={BgImageTablet} />
        <source media="(min-width: 1024px)" srcSet={BgImageDesktop} />
        <img
          className="w-full h-full absolute top-0 left-0"
          src={BgImageMobile}
          alt=""
        />
      </picture>
    </div>
  );
};

export default Background;
