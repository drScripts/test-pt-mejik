import { BookCard, SearchInput } from "../components";
import { Base, ListBooks, Navbar } from "../containers";
import heroIllustration from "../assets/images/hero-illustration.png";

function HomePage() {
  return (
    <Base>
      <Navbar />
      <section className="py-14">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-7xl font-libre capitalize leading-snug">
                The most complete <br /> book library <br /> and free
              </h1>
              <p className="text-softLightBrown text-xl mt-3">
                Explorer new worlds from authors
              </p>
              <SearchInput className={"mt-3"} />
            </div>
            <div className="max-h-min float-animation">
              <img src={heroIllustration} alt="hero" width={700} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-libre font-medium">Best Borrowed</h2>
          <div className="flex overflow-x-scroll overflow-y-hidden py-14 space-x-52">
            <BookCard name={"On Night Like This"} />
            <BookCard name={"On Night Like What I want"} />
            <BookCard name={"On Night Like Like this"} />
            <BookCard name={"On Night like that"} />
          </div>
        </div>
      </section>

      <ListBooks />
    </Base>
  );
}

export default HomePage;
