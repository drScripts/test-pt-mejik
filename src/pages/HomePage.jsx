import { SearchInput } from "../components";
import { Base, BestOrderBookx, ListBooks, Navbar } from "../containers";
import heroIllustration from "../assets/images/hero-illustration.png";

function HomePage() {
  return (
    <Base>
      <Navbar />
      <section className="py-14">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-7xl font-libre capitalize leading-snug animate__fadeInLeft animate__animated">
                The most complete <br /> book library <br /> and free
              </h1>
              <p className="text-softLightBrown text-xl mt-3 animate__fadeInLeft animate__animated animate__slow">
                Explorer new worlds from authors
              </p>
              <SearchInput
                className={
                  "mt-3 animate__animated animate__slideInUp animate__slow"
                }
              />
            </div>
            <div className="max-h-min animate__animated animate__jackInTheBox">
              <img
                src={heroIllustration}
                alt="hero"
                width={700}
                className={"float-animation "}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-libre font-medium">Best Borrowed</h2>
          <BestOrderBookx />
        </div>
      </section>

      <ListBooks />
    </Base>
  );
}

export default HomePage;
