import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { toggleMenu } from "../redux/features/globalSlice";
import { Button } from "./ui/button";
import { Home as HomeIcon, Bell, User, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { graphqlClient } from "../../clients/api";
import { useQueryClient } from "@tanstack/react-query";

export const NavMenu: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.global.isMenuOpen);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = () => {
    localStorage.removeItem("__buzz_token");
    graphqlClient.setHeader("Authorization", "");
    queryClient.setQueryData(["current-user"], null);
    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    navigate({ to: "/", replace: true });
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-black shadow-md">
      <div className="flex-1">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Buzz Logo"
            className="hidden h-8 w-auto md:block"
          />
          <span className="mx-2 text-xl font-bold hidden lg:inline">buzz</span>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex fixed md:relative inset-0 w-full h-full md:w-auto md:h-auto bg-white dark:bg-black md:bg-transparent z-50 flex-col md:flex-row justify-center items-center`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-32 mr-8 p-4 md:p-0">
            {isMenuOpen && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mb-8"
                onClick={handleToggleMenu}
              >
                <X />
              </Button>
            )}
            <Link to="/home">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <User />
              </Button>
            </Link>
            <Link to="/home">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <HomeIcon />
              </Button>
            </Link>
            <Link to="/home">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <Bell />
              </Button>
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex-1 flex justify-end mr-12">
        <Button onClick={handleLogout} className="mr-2 font-semibold">
          Logout
        </Button>
      </div>
    </header>
  );
};
