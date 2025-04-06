import React from "react";

export default function AboutUs() {
  const hospitalInfo = {
    name: "MedConnect Hospital",
    mission:
      "Providing world-class healthcare services with a commitment to excellence and innovation.",
    overview:
      "MedConnect Hospital is a leading medical institution offering comprehensive healthcare solutions. Our team of experts ensures the highest standard of care with state-of-the-art medical facilities.",
  };

  const keyFigures = [
    {
      name: "Dr. Rajesh Verma",
      title: "Managing Director",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      bio: "Dr. Rajesh Verma has over 20 years of experience in healthcare administration and patient care.",
    },
    {
      name: "Dr. Sneha Kapoor",
      title: "Chief Medical Officer",
      image: "https://via.placeholder.com/150",
      bio: "Dr. Sneha Kapoor specializes in internal medicine and leads the hospital's clinical operations.",
    },
    {
      name: "Mr. Amit Sharma",
      title: "Head of Administration",
      image: "https://via.placeholder.com/150",
      bio: "Amit Sharma manages hospital operations and ensures seamless patient services.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#3A506B] mb-2">About Us</h1>
        <p className="text-[#3A506B]/80">{hospitalInfo.mission}</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-[#3A506B] mb-4">
          {hospitalInfo.name}
        </h2>
        <p className="text-[#3A506B]/80">{hospitalInfo.overview}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[#3A506B] mb-4">
          Key Figures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyFigures.map((figure, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 text-center"
            >
              <img
                src={figure.image}
                alt={figure.name}
                className="w-24 h-24 mx-auto rounded-full mb-3"
              />
              <h3 className="text-lg font-medium text-[#3A506B]">
                {figure.name}
              </h3>
              <p className="text-sm text-[#3A506B]/70">{figure.title}</p>
              <p className="text-sm text-[#3A506B]/60 mt-2">{figure.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-12 text-center text-[#3A506B]/80 text-sm">
        <p>Website developed by <strong>Sort Solution</strong></p>
      </footer>
    </div>
  );
}
