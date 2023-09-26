import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
// import navigation from "./navigationData";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = {
  categories: [
    {
      id: "engine",
      name: "Engine",
      featured: [
        {
          name: "Engine Kits",
          href: "#",
          imageSrc:
            "https://images.oreillyauto.com/parts/img/large/edb/002086_v1.jpg",
          imageAlt: "Top End Edelbrock Performer RPM Kit - 2086",
        },
        {
          name: "Filters",
          href: "#",
          imageSrc:
            "https://images.oreillyauto.com/parts/img/large/wix/57356.jpg",
          imageAlt: "Different types of engine filters.",
        },
      ],
      sections: [
        {
          id: "components",
          name: "Components & Parts",
          items: [
            { name: "Belts & Hoses", href: "#" },
            { name: "Camshafts & Timing", href: "#" },
            { name: "Connecting Rods, Pistons & Rings", href: "#" },
            { name: "Cylinder Sleeve (Universal)", href: "#" },
            { name: "Engine Oil Drain Plug", href: "#" },
            { name: "Engine Gaskets", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "maintenance-care",
          name: "Maintenance & Care",
          items: [
            { name: "Air Filters", href: "#" },
            { name: "Engine Oil", href: "#" },
            { name: "Oil Filters", href: "#" },
            { name: "Spark Plugs", href: "#" },
            { name: "Timing Belts/Chains", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "performance-upgrades",
          name: "Performance & Upgrades",
          items: [
            { name: "Cold Air Intakes", href: "#" },
            { name: "Performance Chips & Tuners", href: "#" },
            { name: "Performance Exhaust Systems", href: "#" },
            { name: "Turbochargers & Superchargers", href: "#" },
            { name: "Upgraded Camshafts", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
      ],
    },
    {
      id: "accessories",
      name: "Accessories & Electronics",
      featured: [
        {
          name: "Brake Pads",
          href: "#",
          imageSrc:
            "https://images.oreillyauto.com/parts/img/large/acd/171-1186_primary.jpg",
          imageAlt: "Different types of brake pads.",
        },
        {
          name: "Rotors",
          href: "#",
          imageSrc:
            "https://images.oreillyauto.com/parts/img/large/bbr/orly_56825rgs_202_ang_primary.jpg",
          imageAlt: "Shiny brake rotors.",
        },
      ],
      sections: [
        {
          id: "components",
          name: "Components & Parts",
          items: [
            { name: "Brake Calipers", href: "#" },
            { name: "Brake Pads", href: "#" },
            { name: "Brake Rotors", href: "#" },
            { name: "Brake Lines & Hoses", href: "#" },
            { name: "Master Cylinders", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "maintenance-care",
          name: "Maintenance & Care",
          items: [
            { name: "Brake Cleaners", href: "#" },
            { name: "Brake Fluid", href: "#" },
            { name: "Brake Grease", href: "#" },
            { name: "Brake Bleeders", href: "#" },
            { name: "Brake Pads & Shoes Replacement", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "performance-upgrades",
          name: "Performance & Upgrades",
          items: [
            { name: "Big Brake Kits", href: "#" },
            { name: "High-Performance Brake Pads", href: "#" },
            { name: "Performance Rotors", href: "#" },
            { name: "Stainless Steel Brake Lines", href: "#" },
            { name: "Upgraded Brake Calipers", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
      ],
    },
    {
      id: "transmission",
      name: "Transmission & Drivetrain",
      featured: [
        {
          name: "Transmission",
          href: "#",
          imageSrc:
            "https://images.oreillyauto.com/parts/img/medium/ptq/nv3550_m150042_fro.jpg",
          imageAlt: "Different types of Transmission",
        },
        {
          name: "Drivetrain",
          href: "#",
          imageSrc:
            "https://images.oreillyauto.com/parts/img/large/idd/vw-8169.jpg",
          imageAlt: "Shiny drivetrain",
        },
      ],
      sections: [
        {
          id: "components",
          name: "Components & Parts",
          items: [
            { name: "Automatic Transmission Assembly", href: "#" },
            { name: "Axle Shafts", href: "#" },
            { name: "Clutch Kits", href: "#" },
            { name: "Differentials", href: "#" },
            { name: "Driveshafts", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "maintenance-care",
          name: "Maintenance & Care",
          items: [
            { name: "Differential Fluids", href: "#" },
            { name: "Differential Gaskets & Seals", href: "#" },
            { name: "Drivetrain Lubricants", href: "#" },
            { name: "Transmission Filters", href: "#" },
            { name: "Transmission Flush", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "performance-upgrades",
          name: "Performance & Upgrades",
          items: [
            { name: "High-Performance Transmission Coolers", href: "#" },
            { name: "Limited Slip Differentials", href: "#" },
            { name: "Performance Clutch Kits", href: "#" },
            { name: "Performance Driveshafts", href: "#" },
            { name: "Racing Transmissions", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
      ],
    },
  ],
  // Make a backend-service to locate stores. Store all locations into mongodb/mysql retreive and test using postman/soapui
  pages: [{ name: "Stores", href: "#" }],
};

//TODO: Create a sign in/ profile page and dashboard https://mui.com/material-ui/react-menu/ use Menu & MenuItem
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");

  const pages = navigation.pages || {};
  const pageKeys = Object.keys(pages);

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.name}`);
    close();
  };

  return (
    <div className="bg-white z-50 w-full relative">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-united-states.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      USD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-neutral-800 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">O'Reilly Auto Clone</span>
                  <img
                    className="h-8 w-auto"
                    src="https://corporate.oreillyauto.com/onlineapplication/images/logo.png"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                {/* Navigation Bar Title Elements */}
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto w-full relative px-32">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="h-[200px] aspect-h-1 aspect-w-1 overflow-hidden rounded-lg group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-contain object-center w-full h-full"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="cursor-pointer hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </p>

                                                {/* <a
                                                  href={item.href}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </a> */}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {pageKeys.map((pageKey) => {
                    const page = pages[pageKey]; // Corrected indentation and added semicolon
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>;
                  })}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Create account
                  </a>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <img
                      src="https://tailwindui.com/img/flags/flag-united-states.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">USD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                {/* Cart - need to figure out how to manage either local or global state of shopping cart*/}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
