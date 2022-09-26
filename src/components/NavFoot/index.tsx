import React from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";

interface Props {
  children: React.ReactNode;
}

export const NavFoot = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <div className="bgColor">{children}</div>
      <Footer />
    </>
  );
};
