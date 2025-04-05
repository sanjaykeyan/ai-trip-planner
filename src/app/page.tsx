import Image from "next/image";

export default function Home() {
  return (
    <div className="font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-blue-950/30 text-slate-700 dark:text-slate-200">
      {/* Navigation */}
      <nav className="px-6 py-4 sm:px-16 flex justify-between items-center backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
            AI Trip Planner
          </h1>
        </div>
        <div className="space-x-6 hidden sm:flex">
          <a
            href="#features"
            className="text-slate-600 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-400 transition-colors duration-300"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-slate-600 hover:text-teal-500 dark:text-slate-300 dark:hover:text-teal-400 transition-colors duration-300"
          >
            How It Works
          </a>
          <a
            href="#"
            className="px-5 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:shadow-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300"
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 sm:px-16 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="lg:w-1/2 space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-slate-800 dark:text-white">
            Plan Your Perfect Trip{" "}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Using AI
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Simply tell us where you want to go, when, and what you love doing.
            We'll craft a personalized itinerary just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full hover:shadow-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 text-lg font-medium">
              Plan My Trip
            </button>
            <button className="px-8 py-4 border-2 border-teal-500 text-teal-500 dark:text-teal-400 dark:border-teal-400 rounded-full hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all duration-300 text-lg font-medium">
              View Sample Plans
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
          <div className="bg-gradient-to-tr from-teal-500 to-emerald-400 w-full h-[400px] flex items-center justify-center text-white text-xl font-medium relative">
            <div className="absolute inset-0 bg-[url('/travel-pattern.svg')] opacity-10"></div>
            <span className="z-10 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              Travel Image Placeholder
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-6 sm:px-16 py-24 bg-white dark:bg-slate-900 relative"
      >
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.02]"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-20 bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent inline-block mx-auto">
            Why Plan With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Personalized Itineraries",
                description:
                  "Get custom plans based on your interests, whether it's food, culture, adventure, or relaxation.",
                icon: "🗺️",
              },
              {
                title: "Cost Estimation",
                description:
                  "See comprehensive price breakdowns for flights, accommodations, attractions, and meals.",
                icon: "💰",
              },
              {
                title: "Weather Insights",
                description:
                  "Know what to expect and what to pack with accurate weather predictions for your travel dates.",
                icon: "🌦️",
              },
              {
                title: "Compare Plans",
                description:
                  "Create multiple trip scenarios and compare them side by side to find your perfect match.",
                icon: "⚖️",
              },
              {
                title: "Booking Options",
                description:
                  "Browse through curated flight and hotel options that match your preferences and budget.",
                icon: "✈️",
              },
              {
                title: "Local Attractions",
                description:
                  "Discover hidden gems and must-see attractions with entrance fees and visiting hours.",
                icon: "🏛️",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-800/50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-slate-200 dark:border-slate-700"
              >
                <div className="text-4xl mb-6 bg-teal-100 dark:bg-teal-900/30 h-16 w-16 flex items-center justify-center rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 sm:px-16 py-24 relative">
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] opacity-[0.03]"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-20 bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent inline-block mx-auto">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Tell us your plans",
                description:
                  "Enter your destination, dates, and what you're interested in experiencing.",
              },
              {
                step: "2",
                title: "Review personalized itinerary",
                description:
                  "We'll generate a detailed day-by-day plan with options tailored to your preferences.",
              },
              {
                step: "3",
                title: "Book and enjoy",
                description:
                  "Choose your favorite options, book directly, and enjoy your perfectly planned trip.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 sm:px-16 py-24 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-[0.05]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to plan your dream vacation?
          </h2>
          <p className="text-xl mb-10 text-teal-50">
            Let our AI create the perfect itinerary that matches your style,
            preferences, and budget.
          </p>
          <button className="px-10 py-5 bg-white text-teal-600 rounded-full hover:shadow-xl transition-all duration-300 text-lg font-medium transform hover:translate-y-[-2px]">
            Start Planning For Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-16 py-12 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4 md:mb-0">
            © 2023 AI Trip Planner. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a
              href="#"
              className="text-slate-600 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-400 transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
