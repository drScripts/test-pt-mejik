import { BookmarkIcon } from "@heroicons/react/outline";

export default function Navbar() {
  return (
    <>
      <section className="w-full py-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">StoryBooks</div>
            <div className="flex items-center space-x-3">
              <div className="px-11 bg-brownLight rounded-full py-3">
                <a href="http://localhost" className="text-xl font-medium">
                  Books
                </a>
              </div>
              <div className="px-11 rounded-full py-3">
                <a href="http://localhost" className="text-xl font-medium">
                  About
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-5">
              {/* <div className="px-7 py-2 border border-brownLight bg-brownLight rounded-xl">
            <a className="text-xl font-medium" href="http://localhost">
            Login
            </a>
            </div>
            <div className="border px-7 py-2 rounded-xl">
            <a className="text-xl font-medium" href="http://localhost">
            Register
            </a>
          </div> */}

              <div>
                <a href="http://localhost">
                  <BookmarkIcon width={30} height={30} />
                </a>
              </div>
              <div>
                <a href="http://localhost">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    className={"rounded-full w-9 h-9"}
                    alt="profile"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}