import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <div className="font-Mali text-marine-blue">
      <div className="relative w-8/12">
        <img src="family-traveling.png" />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <h2 className="h2-about text-2xl rounded-tl-xl -mt-5 md:-mt-8 lg:-mt-10 xl:-mt-16 z-10 bg-mustard bg-opacity-50">
            Our mission
          </h2>
        </div>
        <p className="p-about ml-9 md:ml-14 lg:ml-20">
          <div className="bg-mustard bg-opacity-80 p-3 rounded-l-xl md:p-4 lg:p-5 xl:p-6">
            Traveling with toddlers can be both exciting and challenging. As
            mothers who have experienced the joys and struggles of traveling
            with young children, we understand the importance of having
            everything you need at your fingertips. That’s why we created
            <span className="italic font-semibold"> Toddlers on the Road</span>,
            a comprehensive solution designed to make family trips easier,
            smoother and more enjoyable.
            <br />
            Our app brings together all the essential tools and resources to
            help parents navigate the complexities of traveling with little
            ones. From packing checklists and child-friendly destination guides
            to emergency contacts and travel hacks, we’ve thought of everything
            so you don’t have to.
            <br />
            Our mission is simple: to make traveling with toddlers less
            stressful and more fun. Whether you're planning a weekend getaway or
            an international adventure,{" "}
            <span className="italic"> Toddlers on the Road</span> ensures you
            have all the support you need in one easy-to-use app.
            <br />
            Happy travels from two moms who get it!
          </div>
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start">
          <h2 className=" h2-about text-2xl rounded-tr-xl mt-6 lg:mt-10 bg-blue-water bg-opacity-50">
            Meet our creators
          </h2>
        </div>
        <div className="bg-blue-water bg-opacity-70 mr-9 rounded-r-xl md:mr-14">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-y-8 my-6 mx-auto px-2 xl:py-8">
            <div className="container w-11/12 mx-auto">
              <div className="card-container-about max-w">
                <img
                  className="object-containt w-full"
                  src="sheila.jpg"
                  alt="sheila"
                />
                <div className="text-card-about">
                  <h4 className="h4-about">Sheila</h4>
                  <p className="p-about">
                    She is a passionate traveler and dedicated mom who turned
                    her love for exploring the world into an adventure-filled
                    journey with her family. Traveling has always been her
                    greatest passion, but when her son was born, everything
                    changed, yet in the most beautiful way. What once was about
                    spontaneous getaways and long-haul flights became a new kind
                    of adventure, filled with discovery, laughter and
                    unforgettable moments. Navigating the world with a toddler
                    opened up a whole new perspective on travel, she realized
                    that traveling with little ones isn’t just possible, it’s
                    magical. With
                    <span className="italic"> Toddlers on the Road</span>, she
                    wants to help other parents experience the same joy, making
                    every journey smoother, more fun and full of wonderful
                    memories. Let’s explore the world together!
                  </p>
                </div>
              </div>
            </div>
            <div className="container w-11/12 mx-auto">
              <div className="card-container-about max-w">
                <img
                  className="object-containt w-full"
                  src="sara.jpeg"
                  alt="sara"
                />
                <div className="text-card-about">
                  <h4 className="h4-about">Sara</h4>
                  <p className="p-about">
                    Before having kids, Sara was the kind of traveler who could
                    throw a few things in a bag, book a last-minute flight, and
                    set off on an adventure without a second thought. Fast
                    forward to today she’s a proud mom of two (a 6-year-old girl
                    and a 4-year-old boy), and let’s just say that traveling now
                    requires a bit more strategy. Gone are the days of breezy,
                    stress-free packing now it’s all about remembering the
                    favorite stuffed animal, the emergency snacks, and oh no,
                    where did the extra wipes go? But despite the chaos,
                    traveling with her little ones has become even more
                    meaningful. Watching their eyes light up at new experiences,
                    introducing them to different cultures, and turning everyday
                    moments into lifelong memories? Totally worth the airport
                    meltdowns. That’s why she created Toddlers on the Road a
                    one-stop app for parents who love to travel but also love
                    their sanity. From packing lists (so you don’t forget the
                    teddy bear) to child-friendly guides and emergency contacts
                    , this app is designed to make family travel smoother, less
                    stressful, and way more fun. One of Sara’s most
                    unforgettable trips? Exploring Malta with her kids where
                    they ran on sun-soaked beaches, discovered ancient sites,
                    and, of course, managed to lose at least one shoe. With
                    Toddlers on the Road, she hopes to help other parents
                    embrace the adventure, mishaps and all. Because let’s be
                    honest traveling with toddlers is a wild ride, but it’s also
                    the best one yet.❤️
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <div className="flex justify-end">
          <h2 className="h2-about text-xl rounded-tl-xl mt-6 lg:mt-10 bg-light-pink bg-opacity-50">
            Need help? Get in touch!
          </h2>
        </div>
        <p className="p-about ml-9 md:ml-14 lg:ml-20">
          <div className="bg-light-pink bg-opacity-70 p-3 rounded-l-xl md:p-4 lg:p-5 xl:p-6">
            Have questions? Need assistance with your trip? Have suggestions or
            feedback? Our team is here to support you every step of the way.
            Contact us today and make your travels with toddlers smoother and
            stress-free!
            <br />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleClick}
                className="bg-marine-blue text-mustard px-4 md:px-5 py-2 text-center text-base my-3 md:text-lg rounded-lg font-medium hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue"
              >
                Contact us
              </button>
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};

export default About;
