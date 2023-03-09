import React from 'react';
import findUsBackground from '../assets/img/webp/find-us-background.webp';
import findUsTitle from '../assets/img/webp/find-us-title.webp';
import Link from '../components/Link';
import { links } from '../config';

function FindUsSection() {
  return (
    <div
      className={`flex flex-col bg-cover items-center`}
      style={{ backgroundImage: `url(${findUsBackground})` }}
    >
      <div className="flex flex-col items-center pt-16 px-6">
        <img className="h-[80px]" src={findUsTitle} />
        <p className="text-[#0A0607] font-neue-kabel font-medium my-6 text-center">
          Be a part of our Global Community By Participating in Open
          Discussions.
        </p>
      </div>
      <div className="container flex flex-row justify-center">
        <div className="w-[980px] mb-[100px]">
          <div className="grid grid-rows-2 grid-cols-2 md:grid-cols-4 md:grid-rows-1 gap-6 pt-10">
            {links.map((link) => {
              return <Link item={link} key={link.name} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindUsSection;
