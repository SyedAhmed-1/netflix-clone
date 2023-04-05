import React, { useEffect, useState } from "react";

const Navbar = () => {

    const [handleShow,setHandleShow] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHandleShow(true);
      } else {
        setHandleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll",()=>{});
    };
  }, []);

  return (
    <div className={`flex fixed top-0 justify-between w-full p-5 ${handleShow && "bg-black h-auto"} z-10 duration-200 ease-in `}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="netflix-logo"
        className="w-[120px] object-contain flex "
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="profile pic"
        className="w-[60px] object-contain"
      />
    </div>
  );
};

export default Navbar;
