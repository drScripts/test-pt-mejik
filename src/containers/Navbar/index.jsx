import { Menu } from "@headlessui/react";
import { BookmarkIcon } from "@heroicons/react/outline";
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
                <div className="px-9 bg-brownLight rounded-full py-3">
                  <a href="http://localhost" className="text-xl font-medium">
                    Books
                  </a>
                </div>
                <div className="px-9 rounded-full py-3">
                  <a href="http://localhost" className="text-xl font-medium">
                    About
                  </a>
                </div>
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
                <div className="px-7 py-2 border border-brownLight bg-brownLight rounded-xl">
                  <Link to={"/login"}>Login</Link>
                </div>
                <div className="border px-7 py-2 rounded-xl">
                  <Link className="text-xl font-medium" to={"/register"}>
                    Register
                  </Link>
                </div>
              </RenderIf>

              <RenderIf condition={rootState.isLogin}>
                <div>
                  <a href="http://localhost">
                    <BookmarkIcon width={30} height={30} />
                  </a>
                </div>
                <div className="relative">
                  <Menu>
                    <Menu.Button>
                      <img
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        className={"rounded-full w-9 h-9"}
                        alt="profile"
                      />
                    </Menu.Button>
                    <Menu.Items
                      className={
                        "flex flex-col absolute bg-white right-2 py-4 px-2 rounded-xl w-48"
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
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${active && "text-blue-500"}`}
                            href="/account-settings"
                          >
                            Documentation
                          </a>
                        )}
                      </Menu.Item>
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
