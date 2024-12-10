import React from "react";
import { NavLink } from "react-router-dom";
function NavbarComponent() {
  return (
    <nav className="bg-[#8EB486]">
      <div className="max-w-full mx-5 px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {/*
        Icon when menu is closed.
  
        Menu open: "hidden", Menu closed: "block"
      */}
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/*
        Icon when menu is open.
  
        Menu open: "block", Menu closed: "hidden"
      */}
              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="  flex flex-1  items-center justify-center sm:items-stretch sm:justify-end">
            <div className=" flex flex-1  items-center">
              {/* <div className="flex shrink-0 items-center ">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div> */}
              <div className=" text-xl font-bold text-[#FDF7F4]">
                TOKO PAK BUDI
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-[#685752] px-3 py-2 text-md font-medium text-[#FDF7F4]"
                      : "rounded-md px-3 py-2 text-md font-medium text-[#FDF7F4] hover:bg-[#997C70]"
                  }
                >
                  Dashboard{" "}
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-[#685752] px-3 py-2 text-md font-medium text-[#FDF7F4]"
                      : "rounded-md px-3 py-2 text-md font-medium text-[#FDF7F4] hover:bg-[#997C70]"
                  }
                >
                  Products{" "}
                </NavLink>
                <NavLink
                  to="/suppliers"
                  className={({ isActive }) =>
                    isActive
                      ? "rounded-md bg-[#685752] px-3 py-2 text-md font-medium text-[#FDF7F4]"
                      : "rounded-md px-3 py-2 text-md font-medium text-[#FDF7F4] hover:bg-[#997C70]"
                  }
                >
                  Suppliers{" "}
                </NavLink>
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          <div className="px-3 py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md bg-[#685752] px-3 py-2 text-md font-medium text-[#FDF7F4]  "
                  : "rounded-md px-3 py-2 text-md font-medium text-[#FDF7F4] hover:bg-[#997C70] "
              }
            >
              Dashboard{" "}
            </NavLink>
          </div>

          <div className="px-3 py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md bg-[#685752] px-3 py-2 text-md font-medium text-[#FDF7F4]  "
                  : "rounded-md px-3 py-2 text-md font-medium text-[#FDF7F4] hover:bg-[#997C70] "
              }
            >
              Products{" "}
            </NavLink>
          </div>
          <div className="px-3 py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "rounded-md bg-[#685752] px-3 py-2 text-md font-medium text-[#FDF7F4]  "
                  : "rounded-md px-3 py-2 text-md font-medium text-[#FDF7F4] hover:bg-[#997C70] "
              }
            >
              Suppliers{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>

    // <nav className="navbar">
    //   <NavLink
    //     to="/"
    //     className={({ isActive }) =>
    //       isActive ? "nav-link active-nav-link" : "nav-link"
    //     }
    //   >
    //     Dashboard
    //   </NavLink>
    //   <NavLink
    //     to="/products"
    //     className={({ isActive }) =>
    //       isActive ? "nav-link active-nav-link" : "nav-link"
    //     }
    //   >
    //     Products
    //   </NavLink>
    //   <NavLink
    //     to="/suppliers"
    //     className={({ isActive }) =>
    //       isActive ? "nav-link active-nav-link" : "nav-link"
    //     }
    //   >
    //     Suppliers
    //   </NavLink>
    //   <div className="text-white">Hallo</div>
    // </nav>
  );
}

export default NavbarComponent;
