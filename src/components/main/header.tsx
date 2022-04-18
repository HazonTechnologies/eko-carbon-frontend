import Link from "next/link";
import { NextPage } from "next";
import Image from "next/image";
import { headerLinks } from "../../lib/common/links";
import { useState } from "react";

const Header = () => {

  return (
    <header>
      <h2>
       Testing Out
        
      </h2>
      <nav>
        <ul>
          {headerLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.link}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
