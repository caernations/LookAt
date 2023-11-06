const Footer = () => {
  return (
    <footer className="w-screen mx-auto bottom-0 left-0 right-0 bg-[#0c0c0c] bg-opacity-100">
      <div className="container mx-auto flex flex-col items-center justify-center md:flex-row">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Kelompok 25. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
