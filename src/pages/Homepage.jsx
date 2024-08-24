import React from "react";

import code from "../assets/code.jpg";
import Btn from "../components/core/btn";

import Cheatsheets from "../components/landing page/Cheatsheets";
import Interview from "../components/landing page/Interview";
import Quiz from "../components/landing page/Quiz";
import Guides from "../components/landing page/Guides";
import Project from "../components/landing page/project";
import Footer from "../components/core/Footer";

const Homepage = () => {
	return (
		<div className="w-full h-full">
			{/* <Navbar /> */}

			{/* section 1 */}
			<div className="relative h-[640px] overflow-hidden ">
				<img
					src={code}
					className="absolute w-full h-full object-fill"
					loading="lazy"
				/>
				{/* <div className="absolute bottom-36 left-36 space-y-4">
					<p className="text-[#6355D8] text-xl font-bold">
						Find curated resources to enhance your development skills and
						knowledge.
					</p>
					<Btn link="" text="Explore" />
				</div> */}
			</div>

			{/* section 2    */}
			<Cheatsheets />

			{/* section 3 */}
			<Interview />

            {/* section 4 */}
            {/* <Quiz /> */}

            {/* section 5 */}
            {/* <Guides /> */}

            <Project />

            <Footer/>

		</div>
	);
};

export default Homepage;
