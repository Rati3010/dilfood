import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownHeader,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";
import logo from '../assets/dilfoods-logo.png'

const NavbarC = () => {
  return (
    <>
      <Navbar fluid rounded className="shadow-md fixed top-0 left-0 w-full bg-white z-10 ">
        <NavbarBrand href="https://flowbite-react.com">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </NavbarBrand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </DropdownHeader>
          </Dropdown>
          <NavbarToggle />
        </div>
      </Navbar>
    </>
  );
};

export default NavbarC;
