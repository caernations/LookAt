import Link from "next/link";

const NavLink = ({ href, title }) => {
  const handleScroll = (e) => {
    e.preventDefault(); 
    const targetId = href.startsWith("#") ? href : `#${href}`; 
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth", 
        block: "start", 
      });
    }
  };

  return (
    <Link
      href={href} onClick={handleScroll}
      className="block mr-12 py-2 pl-3 pr-4 text-[#ADB7BE] text-lg font-bold rounded md:p-0 hover:text-white transition-colors duration-400"
    >
      {title}
    </Link>
  );
};

export default NavLink;
