// pages/index.js
"use client";

import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Map,
  BookOpen,
  Compass,
  Camera,
  CreditCard,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Menu,
  Search,
  Star,
  Zap,
  Globe,
} from "lucide-react";
import AuthButtons from "@/components/auth/AuthButtons";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f0f7ff] text-gray-900 selection:bg-indigo-500 selection:text-white">
      <Head>
        <title>Voyageur - Smart Travel Planning</title>
        <meta
          name="description"
          content="Plan, organize and share your travels with Voyageur"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
        />
      </Head>
      {/* Enhanced Navigation */}
      <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-2 rounded-lg shadow-md">
            <Compass className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-2xl font-['Playfair_Display'] font-bold tracking-tight text-indigo-600">
            Voyageur
          </span>
        </div>

        <div className="hidden md:flex space-x-8 text-gray-600 font-medium text-sm">
          <a href="#features" className="relative group">
            <span className="hover:text-indigo-600 transition-colors duration-300">
              Features
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#community" className="relative group">
            <span className="hover:text-indigo-600 transition-colors duration-300">
              Community
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#pricing" className="relative group">
            <span className="hover:text-indigo-600 transition-colors duration-300">
              Pricing
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#blog" className="relative group">
            <span className="hover:text-indigo-600 transition-colors duration-300">
              Travel Journal
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <AuthButtons />
      </nav>
      {/* Enhanced Hero Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -left-12 w-56 h-56 bg-blue-200/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <div className="inline-flex items-center px-3 py-1.5 mb-6 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              <span>Travel smarter with AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-['Playfair_Display'] font-bold text-gray-900 mb-6 leading-tight">
              Your journey{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                reimagined
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-700 mb-6 leading-snug">
              One platform for all your adventure planning.
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From inspiration to planning, tracking to sharing. Create
              personalized itineraries, manage your budget, and document
              memories in one seamlessly integrated experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:from-indigo-500 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center">
                Start planning now
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-4 border border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 font-medium rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center">
                Watch demo
              </button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                  ></div>
                ))}
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">
                  Join 10,000+ travelers
                </div>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      fill="currentColor"
                      className="h-3.5 w-3.5 text-yellow-400"
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">
                    4.9 (2.5k+ reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-100 rounded-full opacity-70"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-70"></div>

            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Hawaiian Island Adventure</h3>
                  <div className="flex items-center text-xs bg-white/20 rounded-full px-2 py-0.5">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>June 12 - 24</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="font-medium text-gray-800">
                    Your Journey
                  </span>
                  <span className="ml-auto px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-medium flex items-center">
                    <Map className="h-3 w-3 mr-1" />5 destinations
                  </span>
                </div>

                <div className="space-y-4">
                  {["Honolulu", "Maui", "Kauai", "Big Island"].map(
                    (location, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                          {index + 1}
                        </div>
                        <span className="ml-3 font-medium text-gray-800">
                          {location}
                        </span>
                        <div className="ml-auto flex items-center text-sm text-gray-500">
                          <Clock className="h-3.5 w-3.5 mr-1" />3 nights
                        </div>
                      </div>
                    )
                  )}

                  <button className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-600 transition-all duration-200 group">
                    <span className="flex items-center">
                      <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-2 group-hover:bg-indigo-100 transition-colors duration-200">
                        <span>+</span>
                      </div>
                      Add destination
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-[12rem] transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="text-sm text-gray-500 mb-1">Total budget</div>
              <div className="text-2xl font-bold text-gray-800">$3,450</div>
              <div className="mt-1 text-xs text-green-600 flex items-center">
                <span>Under budget</span>
                <div className="ml-1 w-1.5 h-1.5 rounded-full bg-green-600"></div>
              </div>
            </div>

            <div className="absolute top-1/2 -left-10 transform -translate-y-1/2 bg-white p-3 rounded-xl shadow-lg max-w-[10rem] rotate-[-3deg] hidden md:block">
              <div className="flex items-center text-indigo-600 text-xs font-medium mb-1">
                <Zap className="h-3.5 w-3.5 mr-1" />
                Suggested for you
              </div>
              <div className="text-sm font-medium">Pearl Harbor Tour</div>
              <div className="flex items-center mt-1">
                <div className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                  $89
                </div>
                <div className="ml-1 text-xs text-yellow-500 flex items-center">
                  <Star fill="currentColor" className="h-3 w-3 mr-0.5" />
                  4.8
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Features Section */}
      <section id="features" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 mb-4 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
              <span>POWERFUL FEATURES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-gray-800 mb-4">
              Everything you need for the perfect trip
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines intuitive design with powerful features to
              make travel planning effortless and enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Map className="h-8 w-8 text-white" />,
                title: "Interactive Itineraries",
                description:
                  "Build flexible day-by-day plans with maps, times, and notes for each destination.",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: <CreditCard className="h-8 w-8 text-white" />,
                title: "Budget Tracking",
                description:
                  "Set budgets, track expenses, and split costs with travel companions.",
                color: "from-teal-500 to-emerald-600",
              },
              {
                icon: <Sparkles className="h-8 w-8 text-white" />,
                title: "AI Trip Generator",
                description:
                  "Get personalized suggestions based on your interests, time, and budget.",
                color: "from-violet-500 to-purple-600",
              },
              {
                icon: <BookOpen className="h-8 w-8 text-white" />,
                title: "Travel Journal",
                description:
                  "Capture memories, photos and stories to remember your journey.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: <Users className="h-8 w-8 text-white" />,
                title: "Group Planning",
                description:
                  "Collaborate with friends and family on shared itineraries.",
                color: "from-pink-500 to-rose-600",
              },
              {
                icon: <Globe className="h-8 w-8 text-white" />,
                title: "Offline Access",
                description:
                  "Access your plans anytime, anywhere, even without internet connection.",
                color: "from-sky-500 to-blue-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div
                  className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full opacity-10 bg-gradient-to-br ${feature.color} group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
                <div
                  className={`mb-5 w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn more</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Enhanced AI Planner Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-indigo-50 to-blue-50 relative overflow-hidden">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1.5 mb-4 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              <span>POWERED BY AI</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-gray-800 mb-4">
              Your personal AI travel assistant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create custom itineraries in seconds. Tell us your preferences and
              let our advanced AI handle the rest.
            </p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <div className="max-w-md">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Search className="h-5 w-5" />
                    </div>
                    <h3 className="ml-3 text-2xl font-bold text-gray-800">
                      Tell us your travel style
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: "Adventure Seeker",
                        icon: <Compass className="h-5 w-5 text-indigo-600" />,
                        selected: true,
                      },
                      {
                        title: "Cultural Explorer",
                        icon: <BookOpen className="h-5 w-5 text-indigo-600" />,
                        selected: false,
                      },
                      {
                        title: "Relaxation",
                        icon: <Calendar className="h-5 w-5 text-indigo-600" />,
                        selected: false,
                      },
                      {
                        title: "Foodie Experience",
                        icon: <Camera className="h-5 w-5 text-indigo-600" />,
                        selected: false,
                      },
                      {
                        title: "Nature Lover",
                        icon: <Map className="h-5 w-5 text-indigo-600" />,
                        selected: false,
                      },
                    ].map((type, index) => (
                      <div
                        key={index}
                        className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          type.selected
                            ? "bg-indigo-50 border-2 border-indigo-500 shadow-sm"
                            : "border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                        }`}
                      >
                        <div
                          className={`mr-4 p-2 rounded-lg ${
                            type.selected ? "bg-indigo-100" : "bg-gray-100"
                          }`}
                        >
                          {type.icon}
                        </div>
                        <span
                          className={`font-medium ${
                            type.selected ? "text-indigo-700" : "text-gray-800"
                          }`}
                        >
                          {type.title}
                        </span>
                        <ChevronRight
                          className={`ml-auto h-5 w-5 ${
                            type.selected ? "text-indigo-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg hover:from-indigo-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      Generate my perfect trip
                    </button>
                  </div>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 border-l border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800">
                    Your Barcelona Itinerary
                  </h3>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center">
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    AI Generated
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-medium">
                        1
                      </div>
                      <span className="ml-2 font-bold text-gray-800">
                        Day 1: Barcelona Highlights
                      </span>
                    </div>
                    <div className="pl-10">
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            09:00 AM
                          </span>
                          <span>Breakfast at La Boqueria Market</span>
                        </div>
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            10:30 AM
                          </span>
                          <span>Guided tour of Sagrada Familia</span>
                        </div>
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            01:00 PM
                          </span>
                          <span>Lunch at Els Quatre Gats</span>
                        </div>
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            03:00 PM
                          </span>
                          <span>Explore the Gothic Quarter</span>
                        </div>
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            07:00 PM
                          </span>
                          <span>Dinner and Flamenco show</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-medium">
                        2
                      </div>
                      <span className="ml-2 font-bold text-gray-800">
                        Day 2: Gaudí Masterpieces
                      </span>
                    </div>
                    <div className="pl-10">
                      <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            09:00 AM
                          </span>
                          <span>Visit Casa Batlló</span>
                        </div>
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            11:30 AM
                          </span>
                          <span>Tour Casa Milà (La Pedrera)</span>
                        </div>
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            01:30 PM
                          </span>
                          <span>Lunch in Eixample district</span>
                        </div>
                        <div className="flex">
                          <span className="text-xs font-medium text-gray-500 w-16">
                            03:30 PM
                          </span>
                          <span>Park Güell exploration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
