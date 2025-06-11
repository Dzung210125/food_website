import Image from 'next/image';

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.jpg"
            alt="Restaurant interior"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-xl">Crafting memorable dining experiences since 2010</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              We are dedicated to providing exceptional dining experiences through
              innovative cuisine, warm hospitality, and a commitment to quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/chef.jpg"
                alt="Our chef"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Meet Our Chef</h3>
              <p className="text-gray-600 mb-4">
                With over 15 years of culinary experience, our head chef brings
                passion and creativity to every dish. Trained in some of the
                world&apos;s finest kitchens, our chef combines traditional techniques
                with modern innovation.
              </p>
              <p className="text-gray-600">
                Each dish is carefully crafted using the finest seasonal
                ingredients, sourced locally whenever possible.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mt-12">
            <h3 className="text-2xl font-semibold mb-4 text-center">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-2">Quality</h4>
                <p className="text-gray-600">
                  We never compromise on the quality of our ingredients or service.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-2">Innovation</h4>
                <p className="text-gray-600">
                  We constantly explore new flavors and techniques to delight our guests.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-2">Sustainability</h4>
                <p className="text-gray-600">
                  We are committed to sustainable practices in all aspects of our operation.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-6">
              We&apos;d love to hear from you. Whether you have a question about our menu,
              reservations, or anything else, our team is ready to answer all your questions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 