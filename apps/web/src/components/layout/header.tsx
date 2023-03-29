import React from "react";

import Image from "next/image";

import logo from "public/logo/png/color.png";
import discord from "public/illustrations/socials/discord.svg";
import twitter from "public/illustrations/socials/twitter.svg";
import { Divider } from "antd";
import { VDAOConnectButton } from "../walletconnect/connectbutton";

type Props = {
  signatures?: number;
};

const Header = (props: Props) => {
  return <div>Header</div>;
};

const HeaderManifesto = (props: Props) => {
  return (
    <div className="mx-auto flex max-w-[1280px] justify-between bg-vdao-deep py-11 ">
      <Image
        src={logo}
        alt="VDAO"
        className="mx-auto my-auto h-[30px] w-[130px] md:mx-0"
      />
      <div className="flex flex-row justify-center gap-7">
        <Image
          src={twitter}
          alt="VDAO"
          width={30}
          height={30}
          className="hidden md:block"
        />
        <Image
          src={discord}
          alt="VDAO"
          width={30}
          height={30}
          className="hidden md:block"
        />
        <Divider
          type="vertical"
          className="hidden !h-full bg-[#848484] md:block"
        />
        <div className="flex flex-col-reverse gap-4 px-4 text-center md:flex-row md:gap-8">
          <span className="my-auto text-lg font-medium text-white">
            {props.signatures || 0} Signatures
          </span>
          <VDAOConnectButton />
        </div>
      </div>
    </div>
  );
};

export { HeaderManifesto, Header };

export default Header;
