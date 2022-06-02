import { Menu } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RenderIf } from "../../components";
import { userLogout } from "../../reducers/root";

const navigationAdminList = [
  {
    path: "/admin",
    identifier: "/orders",
    title: "Orders",
  },
  {
    path: "/admin/borrows",
    title: "Borrows",
    identifier: "borrows",
  },
  {
    path: "/admin/books",
    identifier: "books",
    title: "Books",
  },
  {
    path: "/admin/racks",
    title: "Racks",
    identifier: "racks",
  },
  {
    path: "/admin/categories",
    title: "Categories",
    identifier: "categories",
  },
];

export default function Navbar() {
  const rootState = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const params = useLocation().pathname;

  return (
    <>
      <section className="w-full py-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">StoryBooks</div>
            <div className="flex items-center space-x-3">
              <RenderIf condition={rootState?.user?.role === "AUTHENTICATED"}>
                <Link to="/" className="text-xl font-medium">
                  <div
                    className={`px-9 rounded-full py-3 ${
                      params === "/" || params.search("/books") !== -1
                        ? "bg-brownLight "
                        : ""
                    }`}
                  >
                    Books
                  </div>
                </Link>
                <Link to="/about" className="text-xl font-medium">
                  <div
                    className={`px-9 rounded-full py-3 ${
                      params === "/about" ? "bg-brownLight" : ""
                    }`}
                  >
                    About
                  </div>
                </Link>
              </RenderIf>
              <RenderIf condition={rootState?.user?.role === "STAFF"}>
                {navigationAdminList.map((navAdmin, i) => (
                  <Link
                    to={navAdmin.path}
                    className="text-xl font-medium"
                    key={i}
                  >
                    <div
                      className={`px-9 ${
                        params.search(navAdmin.identifier) !== -1 ||
                        (params === "/admin" && i === 0)
                          ? "bg-brownLight"
                          : ""
                      } rounded-full py-3`}
                    >
                      {navAdmin.title}
                    </div>
                  </Link>
                ))}
              </RenderIf>
            </div>
            <div className="flex items-center space-x-5">
              <RenderIf condition={!rootState.isLogin}>
                <Link
                  to={"/login"}
                  className={
                    "border px-7 py-2 rounded-xl border-brownLight hover:bg-brownLight bg-brownLightPastel font-medium"
                  }
                >
                  Login
                </Link>
                <Link
                  className="text-xl font-medium border px-7 py-2 rounded-xl"
                  to={"/register"}
                >
                  Register
                </Link>
              </RenderIf>
              <RenderIf condition={rootState.isLogin}>
                <div className="relative">
                  <Menu>
                    <Menu.Button>
                      <img
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        className={
                          "rounded-full w-12 h-12 box-fit object-cover"
                        }
                        alt="profile"
                      />
                    </Menu.Button>
                    <Menu.Items
                      className={
                        "flex flex-col absolute bg-white right-2 py-4 px-2 rounded-xl w-48 cursor-pointer"
                      }
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={`${active && "text-blue-500"}`}
                            onClick={() => dispatch(userLogout())}
                          >
                            Logout
                          </p>
                        )}
                      </Menu.Item>
                      <RenderIf
                        condition={rootState?.user?.role === "AUTHENTICATED"}
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              className={`${active && "text-blue-500"}`}
                              to="/profile"
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                      </RenderIf>
                    </Menu.Items>
                  </Menu>
                </div>
              </RenderIf>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
