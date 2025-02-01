import Logo from "../assets/images/logo-full.svg";

interface Props {
  isConfirmationShown: boolean;
  email: string | null | undefined;
  fullName: string | null | undefined;
}

const Header = (props: Props) => {
  return (
    <header className="mb-10 px-4 text-center pt-8 md:pt-10 md:mb-11 md:px-8 max-w-[891px] mx-auto">
      <div className="relative w-24 h-6 mb-10 mx-auto md:w-51 md:h-7.5 md:mb-15">
        <img
          className="absolute w-full h-full top-0 left-0"
          src={Logo}
          alt="Coding Conf logo"
        />
      </div>
      {props.isConfirmationShown ? (
        <h1 className="text-3xl mb-5 font-bold md:text-6xl">
          Congrats,
          <b className="bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent inline-block">
            {props.fullName}
          </b>
          ! Your ticket is ready.
        </h1>
      ) : (
        <h1 className="text-3xl mb-5 font-bold md:text-6xl">
          Your Journey to Coding Conf 2025 Starts Here!
        </h1>
      )}

      {props.isConfirmationShown ? (
        <p className="text-xl md:text-2xl">
          We've emailed your ticket to{" "}
          <b className=" text-orange-500">{props.email}</b> and will send
          updates in the run up to the event.
        </p>
      ) : (
        <p className="text-xl md:text-2xl">
          Secure your spot at next year's biggest coding conference.
        </p>
      )}
    </header>
  );
};

export default Header;
