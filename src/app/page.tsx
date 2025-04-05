// pages/index.js
import React from "react";
import Head from "next/head";
import {
  Calendar,
  Map,
  BookOpen,
  Compass,
  Camera,
  CreditCard,
  Clock,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <Head>
        <title>Voyageur - Smart Travel Planning</title>
        <meta
          name="description"
          content="Plan, organize and share your travels with Voyageur"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white shadow-sm">
        <div className="flex items-center">
          <Compass className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-indigo-600">
            Voyageur
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-gray-600">
          <a href="#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="#community" className="hover:text-indigo-600 transition">
            Community
          </a>
          <a href="#pricing" className="hover:text-indigo-600 transition">
            Pricing
          </a>
          <a href="#blog" className="hover:text-indigo-600 transition">
            Travel Journal
          </a>
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-600 hover:text-indigo-600 transition">
            Log in
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Join Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Your journey <span className="text-indigo-600">reimagined</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-6">
            One platform for all your adventures
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            From inspiration to planning, tracking to sharing. Create
            personalized itineraries, manage your budget, and document memories
            in one seamless experience.
          </p>
          <button className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-lg">
            Start planning now
          </button>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 bg-indigo-600 text-white">
              <h3 className="font-medium">Hawaii Adventure</h3>
              <div className="text-sm">June 12 - June 24</div>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-3">
                <span className="font-medium">Destinations</span>
                <span className="ml-auto px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs">
                  5 stops
                </span>
              </div>

              <div className="space-y-4">
                {["Honolulu", "Maui", "Kauai", "Big Island"].map(
                  (location, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                        {index + 1}
                      </div>
                      <span className="ml-3">{location}</span>
                      <div className="ml-auto text-sm text-gray-500">
                        3 nights
                      </div>
                    </div>
                  )
                )}

                <button className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 flex items-center justify-center hover:bg-gray-50 transition">
                  <span>+ Add destination</span>
                </button>
              </div>
            </div>
          </div>

          {/* Floating element */}
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Total budget</div>
            <div className="text-2xl font-bold text-gray-800">$3,450</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 md:px-12 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Everything you need for the perfect trip
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Map className="h-8 w-8 text-indigo-600" />,
              title: "Interactive Itineraries",
              description:
                "Build flexible day-by-day plans with maps, times, and notes for each destination.",
            },
            {
              icon: <CreditCard className="h-8 w-8 text-indigo-600" />,
              title: "Budget Tracking",
              description:
                "Set budgets, track expenses, and split costs with travel companions.",
            },
            {
              icon: <Compass className="h-8 w-8 text-indigo-600" />,
              title: "AI Trip Generator",
              description:
                "Get personalized suggestions based on your interests, time, and budget.",
            },
            {
              icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
              title: "Travel Journal",
              description:
                "Capture memories, photos and stories to remember your journey.",
            },
            {
              icon: <Users className="h-8 w-8 text-indigo-600" />,
              title: "Group Planning",
              description:
                "Collaborate with friends and family on shared itineraries.",
            },
            {
              icon: <Camera className="h-8 w-8 text-indigo-600" />,
              title: "Offline Access",
              description:
                "Access your plans anytime, anywhere, even without internet connection.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Planner Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-indigo-100 to-blue-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your AI travel assistant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create custom itineraries in seconds. Tell us your preferences and
              let our AI handle the rest.
            </p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-0 md:flex overflow-hidden">
            <div className="md:w-1/2 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                How would you like to travel?
              </h3>

              <div className="space-y-4">
                {[
                  "Adventure Seeker",
                  "Cultural Explorer",
                  "Relaxation",
                  "Foodie Experience",
                  "Nature Lover",
                ].map((type, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 cursor-pointer transition"
                  >
                    <div className="mr-4">
                      {index === 0 && (
                        <Compass className="h-6 w-6 text-indigo-600" />
                      )}
                      {index === 1 && (
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                      )}
                      {index === 2 && (
                        <Calendar className="h-6 w-6 text-indigo-600" />
                      )}
                      {index === 3 && (
                        <Camera className="h-6 w-6 text-indigo-600" />
                      )}
                      {index === 4 && (
                        <Map className="h-6 w-6 text-indigo-600" />
                      )}
                    </div>
                    <span className="font-medium">{type}</span>
                    <div className="ml-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition w-full">
                  Generate my trip
                </button>
              </div>
            </div>

            <div className="hidden md:block md:w-1/2 bg-indigo-50 p-8">
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Day 1: Barcelona Highlights
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Start with a morning visit to Sagrada Familia, then explore
                  the Gothic Quarter. Enjoy tapas lunch at La Boqueria Market
                  and spend the afternoon at Park Güell.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Day 2: Cultural Immersion
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Visit Casa Batlló and Casa Milà in the morning. Enjoy lunch at
                  a local restaurant in Eixample. Afternoon art tour at MACBA
                  and evening flamenco show.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Day 3: Beaches & Beyond
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Relax at Barceloneta Beach in the morning. Take a walking tour
                  along the port and enjoy seafood lunch. Visit Montjuïc Castle
                  for sunset views of the city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="community" className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Join our global community of travelers
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                location: "Tokyo, Japan",
                quote:
                  "Voyageur made planning our 2-week Japan trip so easy. The AI suggestions saved us hours of research!",
              },
              {
                name: "Sarah Miller",
                location: "Paris, France",
                quote:
                  "The collaborative features were perfect for our group trip to Europe. Everyone could add their must-see spots.",
              },
              {
                name: "James Rodriguez",
                location: "Cape Town, South Africa",
                quote:
                  "I love how I can keep all my travel memories in one place. The journal feature is my favorite!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-indigo-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 px-6 md:px-12 bg-indigo-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Ready to transform your travel experience?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Join thousands of travelers who are planning better trips with
            Voyageur. Start for free today.
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition shadow-lg">
            Start your journey
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 bg-gray-800 text-gray-300">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Compass className="h-6 w-6 text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-white">
                Voyageur
              </span>
            </div>
            <p className="text-sm">
              Making travel planning seamless, collaborative, and inspiring.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Enterprise
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Travel Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700 text-sm text-center">
          © {new Date().getFullYear()} Voyageur Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
