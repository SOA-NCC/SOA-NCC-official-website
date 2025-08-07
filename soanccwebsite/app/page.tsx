"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  Menu,
  X,
  Shield,
  Target,
  Users,
  Heart,
  TreePine,
  Award,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"

export default function SOANCCWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "objectives",
        "activities",
        "messages",
        "ranks",
        "achievements",
        "join",
        "faqs",
      ]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">SOA NCC</h1>
                <p className="text-xs text-gray-600">4(O) CTC</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Us" },
                { id: "objectives", label: "Objectives" },
                { id: "activities", label: "Activities" },
                { id: "achievements", label: "Achievements" },
                { id: "join", label: "Join" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-blue-900 border-b-2 border-orange-500"
                      : "text-gray-700 hover:text-blue-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Us" },
                { id: "objectives", label: "Objectives" },
                { id: "activities", label: "Activities" },
                { id: "achievements", label: "Achievements" },
                { id: "join", label: "Join" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-900 hover:bg-gray-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-white/10 to-green-500/20">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="NCC Parade"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">
              SOA NCC
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">4(O) CTC</h2>
            <p className="text-xl md:text-2xl mb-8 font-medium">
              Unity and Discipline | Character. Leadership. Service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection("about")}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Explore
              </button>
              <button
                onClick={() => scrollToSection("join")}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
              >
                Why Join
              </button>
              <button
                onClick={() => scrollToSection("achievements")}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                View Achievements
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="NCC Cadets"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>

            <div className="animate-fade-in-right">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About SOA NCC Unit</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Established as part of the prestigious 4(O) CTC under the Odisha Directorate, SOA NCC Unit has been a
                  beacon of discipline, leadership, and national service since its formation.
                </p>
                <p>
                  Affiliated with Siksha 'O' Anusandhan University, our unit is committed to developing the character
                  and leadership qualities of young cadets while instilling a deep sense of patriotism and national
                  unity.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Our Vision</h3>
                    <p className="text-gray-600">To empower youth with leadership skills and national consciousness</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">Our Motto</h3>
                    <p className="text-gray-600">"Unity and Discipline" - Building tomorrow's leaders today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">NCC Objectives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building character, developing leadership, and fostering national unity through disciplined training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-12 h-12 text-orange-500" />,
                title: "NCC Aims",
                points: [
                  "Develop character and leadership",
                  "Create a human resource of organized youth",
                  "Provide environment to motivate youth",
                ],
              },
              {
                icon: <Shield className="w-12 h-12 text-blue-600" />,
                title: "Vision",
                points: ["Empower volunteer youth", "Develop leadership and character", "Create disciplined citizens"],
              },
              {
                icon: <Users className="w-12 h-12 text-green-600" />,
                title: "Motto",
                points: ["Unity and Discipline", "National Integration", "Secular Outlook"],
              },
            ].map((objective, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-6">{objective.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">{objective.title}</h3>
                <ul className="space-y-3">
                  {objective.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Activities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engaging in diverse activities that build character, serve the nation, and develop leadership skills
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: "Parade",
                description: "Precision drill and ceremonial parades showcasing discipline and coordination",
              },
              {
                icon: <Heart className="w-8 h-8 text-red-500" />,
                title: "Blood Donation",
                description: "Regular blood donation camps serving the community and saving lives",
              },
              {
                icon: <TreePine className="w-8 h-8 text-green-600" />,
                title: "Tree Plantation",
                description: "Environmental conservation through tree plantation drives and awareness campaigns",
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Swachh Bharat",
                description: "Cleanliness drives and awareness programs for a cleaner, healthier India",
              },
              {
                icon: <Award className="w-8 h-8 text-yellow-600" />,
                title: "Guard of Honour",
                description: "Ceremonial duties and guard of honour for distinguished guests and events",
              },
              {
                icon: <Target className="w-8 h-8 text-indigo-600" />,
                title: "Camps",
                description: "Training camps, adventure activities, and skill development programs",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-lg mr-4">{activity.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                </div>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Messages Section */}
      <section id="messages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Messages</h2>
            <p className="text-xl text-gray-600">Words of wisdom from our esteemed officers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Col. Rajesh Kumar",
                rank: "Group Commander",
                image: "/placeholder.svg?height=300&width=300",
                message: "Leadership is not about being in charge. It's about taking care of those in your charge.",
              },
              {
                name: "Maj. Priya Sharma",
                rank: "Officer Commanding",
                image: "/placeholder.svg?height=300&width=300",
                message: "Discipline is the bridge between goals and accomplishment. NCC builds this bridge.",
              },
              {
                name: "Capt. Arjun Singh",
                rank: "CTO/ANO",
                image: "/placeholder.svg?height=300&width=300",
                message:
                  "Character is built through challenges. NCC provides the platform to build unshakeable character.",
              },
            ].map((officer, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <Image
                    src={officer.image || "/placeholder.svg"}
                    alt={officer.name}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{officer.name}</h3>
                  <p className="text-blue-600 font-semibold">{officer.rank}</p>
                </div>
                <blockquote className="text-gray-700 italic text-center">"{officer.message}"</blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Ranks Section */}
      <section id="ranks" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Cadet Leadership</h2>
            <p className="text-xl text-gray-600">Meet our distinguished cadet officers leading by example</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Cadet Rahul Patel",
                rank: "SUO",
                year: "Final Year",
                image: "/placeholder.svg?height=250&width=250",
                intro: "Leading with dedication and inspiring fellow cadets through exemplary service.",
              },
              {
                name: "Cadet Sneha Reddy",
                rank: "JUO",
                year: "Third Year",
                image: "/placeholder.svg?height=250&width=250",
                intro: "Committed to excellence and fostering team spirit among junior cadets.",
              },
              {
                name: "Cadet Vikram Singh",
                rank: "JUO",
                year: "Third Year",
                image: "/placeholder.svg?height=250&width=250",
                intro: "Passionate about training and mentoring new cadets in NCC values.",
              },
              {
                name: "Cadet Ananya Das",
                rank: "JUO",
                year: "Second Year",
                image: "/placeholder.svg?height=250&width=250",
                intro: "Dedicated to community service and upholding the highest standards of discipline.",
              },
            ].map((cadet, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-center">
                  <Image
                    src={cadet.image || "/placeholder.svg"}
                    alt={cadet.name}
                    width={150}
                    height={150}
                    className="rounded-lg mx-auto mb-4 shadow-md"
                  />
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{cadet.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg">{cadet.rank}</p>
                    <p className="text-gray-500">{cadet.year}</p>
                  </div>
                  <p className="text-gray-600 text-sm">{cadet.intro}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Carousel */}
      <section id="achievements" className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl opacity-90">Celebrating excellence in training, competitions, and national service</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "RDC Winner 2023",
                image: "/placeholder.svg?height=300&width=400",
                description: "Republic Day Camp representation with outstanding performance",
              },
              {
                title: "TSC Excellence",
                image: "/placeholder.svg?height=300&width=400",
                description: "Thal Sainik Camp participation with distinction",
              },
              {
                title: "EBSB Program",
                image: "/placeholder.svg?height=300&width=400",
                description: "Ek Bharat Shreshtha Bharat cultural exchange program",
              },
              {
                title: "Best Unit Award",
                image: "/placeholder.svg?height=300&width=400",
                description: "Recognized as the best performing NCC unit in the region",
              },
            ].map((achievement, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Image
                  src={achievement.image || "/placeholder.svg"}
                  alt={achievement.title}
                  width={400}
                  height={300}
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="opacity-90">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section id="join" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience the Uniform. Live the Discipline.</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join SOA NCC and embark on a transformative journey of leadership, character building, and national
              service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: <Target className="w-12 h-12 text-orange-500" />,
                title: "Adventure",
                description: "Thrilling camps, trekking, and outdoor activities that build resilience and teamwork",
              },
              {
                icon: <Award className="w-12 h-12 text-blue-600" />,
                title: "Skill Building",
                description: "Develop leadership, communication, and technical skills valued by employers",
              },
              {
                icon: <Users className="w-12 h-12 text-green-600" />,
                title: "Personality",
                description: "Build confidence, discipline, and a strong character that lasts a lifetime",
              },
              {
                icon: <Shield className="w-12 h-12 text-purple-600" />,
                title: "Career Boost",
                description: "NCC certificate provides advantages in defense services and government jobs",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Apply to Join NCC
            </button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about joining NCC</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Why should I join NCC?",
                answer:
                  "NCC develops leadership skills, builds character, provides adventure opportunities, and offers career advantages in defense and government services. It's a platform for personal growth and national service.",
              },
              {
                question: "What are the benefits of NCC?",
                answer:
                  "Benefits include leadership development, adventure activities, career opportunities in defense services, personality development, national integration, and lifelong friendships with like-minded individuals.",
              },
              {
                question: "Is there any fee for joining NCC?",
                answer:
                  "No, there is no fee for joining NCC. The program is completely free, and cadets receive uniforms, training, and participate in camps without any cost.",
              },
              {
                question: "What is the selection process?",
                answer:
                  "Selection is based on academic performance, physical fitness, and interview. Interested students need to apply during the admission process and clear the basic fitness and interview rounds.",
              },
              {
                question: "What events and activities are conducted?",
                answer:
                  "We conduct regular parades, adventure camps, community service activities, blood donation drives, tree plantation, cultural programs, and participate in national-level competitions and camps.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Links Carousel */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Associated Organizations</h2>
            <p className="text-lg text-gray-600">
              Our proud associations with premier defense and government organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
            {[
              { name: "Indian Army", logo: "/placeholder.svg?height=80&width=80" },
              { name: "Indian Navy", logo: "/placeholder.svg?height=80&width=80" },
              { name: "Indian Air Force", logo: "/placeholder.svg?height=80&width=80" },
              { name: "Ministry of Defence", logo: "/placeholder.svg?height=80&width=80" },
              { name: "DG NCC", logo: "/placeholder.svg?height=80&width=80" },
              { name: "MyGov NCC", logo: "/placeholder.svg?height=80&width=80" },
              { name: "SSB Official", logo: "/placeholder.svg?height=80&width=80" },
            ].map((org, index) => (
              <div key={index} className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={org.logo || "/placeholder.svg"}
                    alt={org.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">{org.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-white to-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SOA NCC</h3>
                  <p className="text-gray-400">4(O) CTC</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Building tomorrow's leaders through discipline, character, and national service.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-400">ncc@soa.ac.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-400">+91 674 274 0000</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                  <div className="text-gray-400">
                    <p>Siksha 'O' Anusandhan University</p>
                    <p>Kalinga Nagar, Bhubaneswar</p>
                    <p>Odisha - 751030</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {["About NCC", "Training Programs", "Achievements", "Photo Gallery", "Join NCC", "Contact Us"].map(
                  (link, index) => (
                    <button key={index} className="block text-gray-400 hover:text-white transition-colors duration-300">
                      {link}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 SOA NCC Unit | All Rights Reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <button className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</button>
                <button className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
