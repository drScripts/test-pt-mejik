import React from "react";
import { Base, Navbar } from "../containers";
import heroImage2 from "../assets/images/hero_image_2.png";
import bookIcon from "../assets/icons/books.png";
import calendarIcon from "../assets/icons/calendar.png";
import costIcon from "../assets/icons/cost.png";
import { OfferCard } from "../components";

export default function AboutPage() {
  return (
    <Base>
      <Navbar />

      <section className="container mx-auto py-14 flex justify-between items-center">
        <div>
          <h1 className="text-7xl font-libre capitalize leading-snug animate__fadeInLeft animate__animated">
            Borrow and Read <br /> Books for free <br /> from anywhere!
          </h1>
          <p className="text-softLightBrown text-xl mt-3 animate__fadeInLeft animate__animated animate__slow max-w-2xl">
            Explorer new worlds from authors and read more than 1000 books that
            you can borrow for free!
          </p>
        </div>
        <div className="animate__animated animate__jackInTheBox">
          <img
            src={heroImage2}
            alt="Hero"
            width={700}
            className={"float-animation"}
          />
        </div>
      </section>

      <section className="container mx-auto mb-24">
        <h1 className="text-center text-4xl font-bold font-libre">Our Offer</h1>
        <div className="flex items-center justify-center space-x-14 mt-16">
          <OfferCard
            src={bookIcon}
            description={
              "More than 1000 books that available for you to borrow it and read it from anywhere!"
            }
            title={"Alot Of Books"}
          />
          <OfferCard
            src={calendarIcon}
            description={
              "You can borrow your books without any limitation of how long you want to borrow!"
            }
            title={"No Limitation"}
          />
          <OfferCard
            src={costIcon}
            description={
              "Don't worry we will charge a very low cost when you return the book late! Dont late!"
            }
            title={"Low Penalty Cost"}
          />
        </div>
      </section>
    </Base>
  );
}
