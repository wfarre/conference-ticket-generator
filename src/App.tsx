import DecoBottom from "./assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import Background from "./components/Background";

import { useState } from "react";
import Header from "./components/Header";
import GeneratedTicket from "./components/GeneratedTicket";
import Form, { Entries } from "./components/Form";

function App() {
  const [isConfirmationShown, setIsConfirmationShown] = useState(false);
  const [user, setUser] = useState<Entries | null>(null);

  const handleSubmit = (user: Entries) => {
    setUser(user);
    setIsConfirmationShown(true);
  };

  return (
    <>
      <Background />
      <Header
        isConfirmationShown={isConfirmationShown}
        fullName={user?.fullName}
        email={user?.email}
      />
      <main className="text-xl px-4 pb-28.5 relative">
        {isConfirmationShown ? (
          <GeneratedTicket
            fullname={user?.fullName}
            github={user?.github}
            avatar={user?.avatar}
          />
        ) : (
          <Form submitForm={handleSubmit} />
        )}
      </main>
      <footer className="relative">
        <picture className="absolute bottom-0 left-0 h-50 w-70 z-[-1]">
          <img
            className="absolute top-0 left-0 w-full h-full"
            src={DecoBottom}
            alt=""
          />
        </picture>
      </footer>
      {/* <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div> */}
    </>
  );
}

export default App;
