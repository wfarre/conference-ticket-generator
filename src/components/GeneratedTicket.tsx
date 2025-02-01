import GithubIcon from "../assets/images/icon-github.svg";
import TicketPattern from "../assets/images/pattern-ticket.svg";
import LogoMark from "../assets/images/logo-mark.svg";

interface Props {
  fullname: string | undefined;
  github: string | undefined;
  avatar: FileList | undefined | null;
}

const GeneratedTicket = (props: Props) => {
  return (
    <article className="relative bg-white-transparent w-full min-h-40 p-4 md:py-7.5 md:px-6 max-w-[600px] mx-auto md:h-70">
      <img
        className="absolute w-full h-full left-0 top-0 z-[-1]"
        src={TicketPattern}
        alt=""
      />
      <div className="flex flex-col gap-6 justify-between h-full">
        <figure className="flex gap-5 items-start">
          <picture className="h-7 w-7 md:h-10 md:w-10">
            <img src={LogoMark} alt="" />
          </picture>
          <figcaption className="flex flex-col">
            <div className="h-7 md:h-10 flex items-center justify-center">
              <h3 className="text-2xl font-bold md:text-[40px]">Coding Conf</h3>
            </div>
            <p className="text-neutral-300 text-sm md:text-lg">
              Jan 31, 2025 / Austin, TX
            </p>
          </figcaption>
          <figcaption className=" text-neutral-300 text-sm"></figcaption>
        </figure>
        <figure className="flex gap-4 items-center">
          <picture className="w-11.5 h-11.5 md:w-20 md:h-20 rounded-sm overflow-hidden">
            <img
              src={props.avatar ? URL.createObjectURL(props.avatar[0]) : ""}
              alt=""
            />
          </picture>
          <ul className="flex flex-col">
            <li>
              <figcaption className="text-xl md:text-3xl">
                {props.fullname}
              </figcaption>
            </li>
            <li>
              <a
                href={`https://github.com/${props.github}`}
                className="flex text-neutral-300 text-sm md:text-xl"
                target="_blank"
              >
                <img src={GithubIcon} alt="" />
                <p>@{props.github}</p>
              </a>
            </li>
          </ul>
        </figure>
      </div>

      <aside className="absolute right-0 top-0 h-full flex items-center">
        <p className="rotate-270 text-neutral-500 md:text-3xl">#H5363X</p>
      </aside>
    </article>
  );
};

export default GeneratedTicket;
