// src/pages/Homepage.jsx
import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Code,
  Book,
  Users,
  Zap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/core/Footer";
import Btn from "../components/core/btn";
import Contact from "../components/Contact";


const codeSnippets = [
  {
    language: "python",
    code: `def fibonacci(n):
      if n <= 1:
        return n
      return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`,
    output: "55",
  },
  {
    language: "javascript",
    code: `const quickSort = arr => {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x <= pivot && i < arr.length - 1);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
};

console.log(quickSort([3, 6, 8, 10, 1, 2, 1]));`,
    output: "[1, 1, 2, 3, 6, 8, 10]",
  },
  {
    language: "rust",
    code: `fn is_prime(n: u32) -> bool {
  if n <= 1 {
    return false;
  }
  for i in 2..=(n as f64).sqrt() as u32 {
    if n % i == 0 {
      return false;
    }
  }
  true
}

fn main() {
  println!("{}", is_prime(17));
}`,
    output: "true",
  },
];

const navs = [
  {
    tab: "Playground",
    page: "/playground",
  },
  {
    tab: "Challenges",
    page: "/upcoming",
  },
  {
    tab: "DS Problems",
    page: "/dsproblems"
  },
  {
    tab: "Quiz",
    page: "/quiz"
  },
  {
    tab: "Community",
    page: "/upcoming",
  },
  {
    tab: "Pro",
    page: "/upcoming",
  },
];

const Homepage = () => {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const controls = useAnimation();
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const refScrollUp = useRef();

  const navigate = useNavigate();

  const scrollToTop = () => {
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    controls.start({
      background: ["linear-gradient(45deg, #3A1C71, #3A1C71)"],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    });
  }, [controls]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextSnippet();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentSnippet]);

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(codeSnippets[currentSnippet].output);
      setIsRunning(false);
    }, 1500);
  };

  const nextSnippet = () => {
    setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    setOutput("");
  };

  const prevSnippet = () => {
    setCurrentSnippet(
      (prev) => (prev - 1 + codeSnippets.length) % codeSnippets.length
    );
    setOutput("");
  };

  return (
    <motion.div className="min-h-screen text-white relative" animate={controls}>
      {/* Fairy Dust Cursor Effect */}

      {/* Navigation Bar */}

      <MainNavbar />
      <div id="top" ref={refScrollUp}></div>

      {/* Main Content */}
      <main className="container mx-auto px-5 lg:px-36 py-12">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Code, Challenge, Conquer
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Embark on an epic coding adventure with Codeteria
          </motion.p>
        </motion.section>

        {/* Interactive Code Playground */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="border rounded-xl p-8 space-y-4 bg-purple-900 bg-opacity-50 text-white overflow-hidden backdrop-blur-lg">
            <div>
              <div className="text-2xl font-bold">
                Interactive Code Playground
              </div>
              <div className="text-gray-300">
                Experience real-time coding with instant feedback
              </div>
            </div>
            <div>
              <div className="flex justify-center gap-10 items-center mb-4">
                <button
                  onClick={prevSnippet}
                  variant="outline"
                  size="icon"
                  className="text-yellow-400 border rounded-lg border-yellow-400 bg-white p-2 hover:bg-yellow-400 hover:text-purple-900 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-lg font-semibold">
                  {codeSnippets[currentSnippet].language}
                </span>
                <button
                  onClick={nextSnippet}
                  variant="outline"
                  size="icon"
                  className="text-yellow-400 border rounded-lg border-yellow-400 bg-white p-2 hover:bg-yellow-400 hover:text-purple-900 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <pre className="bg-purple-800 bg-opacity-50 p-4 rounded-lg overflow-x-auto">
                <code>{codeSnippets[currentSnippet].code}</code>
              </pre>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className={`${isRunning
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-300"
                    } text-purple-900 transition-all font-semibold duration-300 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
                >
                  {isRunning ? "Running..." : "Run Code"}
                </button>
                <AnimatePresence>
                  {output && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-green-400 text-purple-900 p-2 rounded"
                    >
                      Output: {output}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            {
              icon: Code,
              title: "Adaptive Challenges",
              description:
                "AI-powered coding challenges that evolve with your skills",
            },
            {
              icon: Book,
              title: "Interactive Tutorials",
              description:
                "Learn by doing with our hands-on, step-by-step guides",
            },
            {
              icon: Users,
              title: "Global Leaderboards",
              description: "Compete with coders worldwide and climb the ranks",
            },
            {
              icon: Zap,
              title: "Real-time Collaboration",
              description:
                "Pair program and solve problems with peers in real-time",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="h-full bg-purple-900 bg-opacity-50 hover:bg-opacity-70 hover:shadow-xl backdrop-blur-lg border rounded-xl p-6 space-y-8">
                <div>
                  <motion.div transition={{ duration: 0.5 }}>
                    <feature.icon className="w-12 h-12 mb-4 text-yellow-400" />
                  </motion.div>

                  <div className="text-xl font-bold text-white">
                    {feature.title}
                  </div>
                </div>
                <div>
                  <div className="text-gray-300">{feature.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Join the Codeteria Revolution
          </h2>
          <p className="text-xl mb-10">
            Unleash your coding potential and become part of a thriving global
            community
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => navigate("/cheats")}
              size="lg"
              className="text-lg px-8 py-2 rounded-lg font-semibold bg-yellow-400 text-purple-900 hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Coding Journey
            </button>
          </motion.div><br></br>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={() => navigate("/quizzes")}
              size="lg"
              className="text-lg px-8 py-2 rounded-lg font-semibold bg-yellow-400 text-purple-900 hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Quiz
            </button>
          </motion.div>
        </motion.section>


        {/* Testimonials Section */}
        <motion.section
          className="bg-purple-900 bg-opacity-50 rounded-lg p-8 mb-20 backdrop-blur-lg lg:h-[450px] sm:h-[500px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            What Our Coders Say
          </h2>
          <div className="flex overflow-hidden">
            <div className=" h-full w-full flex justify-center gap-8 marquee">
              {[
                {
                  name: "Alex",
                  role: "Full Stack Developer",
                  quote:
                    "Codeteria's challenges pushed me to new heights. I landed my dream job thanks to the skills I honed here!",
                },
                {
                  name: "Samantha",
                  role: "AI Enthusiast",
                  quote:
                    "The AI-powered adaptive learning on Codeteria is mind-blowing. It's like having a personal coding mentor 24/7.",
                },
                {
                  name: "Raj",
                  role: "Student",
                  quote:
                    "I went from coding newbie to hackathon winner in just 6 months. Codeteria's community is incredibly supportive!",
                },
                {
                  name: "Anika",
                  role: "Software Engineer",
                  quote:
                    "Codeteria’s challenges helped me level up my skills and land my dream job. The platform is a game-changer!",
                },
                {
                  name: "Vikram",
                  role: "Data Scientist",
                  quote:
                    "The AI-powered challenges on Codeteria sharpened my problem-solving skills, making me confident in handling real-world data projects.",
                },
                {
                  name: "Sanya",
                  role: "Web Developer",
                  quote:
                    "Thanks to Codeteria, I was able to build a portfolio that got me noticed by top companies. It’s the perfect platform for learning!",
                },
                {
                  name: "Amit",
                  role: "UI/UX Designer",
                  quote:
                    "The collaborative tools and design challenges on Codeteria pushed my creativity to new heights. Highly recommended!",
                },
                {
                  name: "Neha",
                  role: "Product Manager",
                  quote:
                    "I improved my technical understanding and communication skills, which has been crucial in managing product development teams.",
                },
              ].map((testimonial, index) => (
                <div key={index} className="group [perspective:1000px] m-5">
                  <div className="border-solid border-white border-2 h-80 w-64 rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front Face */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#433FD7]/30 to-[#8D8BD3]/30 flex flex-col items-center justify-center rounded-xl [backface-visibility:hidden]">
                      <p className="font-outfit font-semibold text-[22px]  text-yellow-400 text-center px-4">
                        {testimonial.name}
                      </p>
                      <p className="font-outfit mt-2 text-[18px] text-yellow-400 text-center px-4">
                        {testimonial.role}
                      </p>
                    </div>
                    {/* Back Face */}
                    <div className="absolute inset-0 h-full w-full rounded-xl bg-gradient-to-br from-[#433FD7]/30 to-[#8D8BD3]/30 px-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div className="h-full flex flex-col justify-center items-center">
                        <p className="font-tillana text-lg  text-yellow-400">{testimonial.quote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section
  className="bg-purple-900 bg-opacity-50 rounded-lg p-8 mb-10 backdrop-blur-lg"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
>
  <h2 className="text-3xl font-bold mb-6 text-center">
    Subscribe to Our Newsletter
  </h2>
  <p className="text-center text-lg mb-8">
    Get the latest coding challenges, tutorials, and updates delivered to your inbox!
  </p>
  <div className="flex justify-center items-center">
    <input
      type="email"
      placeholder="Enter your email"
      className="text-white p-3 w-full max-w-md rounded-l-lg border-none focus:ring-2 focus:ring-yellow-400"
    />
    <button
      className="bg-yellow-400 text-purple-900 px-6 py-3 font-semibold rounded-r-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      Subscribe
    </button>
  </div>
</motion.section>

      </main>

      {/* Contact Section */}
      <Contact />

      <Footer bg={"#1E2128"} text={"white"} />

      <button
        onClick={scrollToTop}
        className="bg-white opacity-60 text-black rounded-full w-14 h-14 fixed left-10 bottom-8 
                  hover:bg-gray-500 hover:text-white transition duration-300 flex items-center justify-center 
                  transform hover:scale-110"
        aria-label="Scroll to Top"
      >
        <i className="fas fa-arrow-up text-xl"></i>
      </button>
    </motion.div>
  );
};

export default Homepage;
