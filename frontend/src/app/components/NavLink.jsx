import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block mr-12 py-2 pl-3 pr-4 text-[#ADB7BE] text-lg font-bold rounded md:p-0 hover:text-white transition-colors duration-400"
    >
      {title}
    </Link>
  );
};

export default NavLink;