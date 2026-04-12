import React from "react";
import { Github, Linkedin} from "lucide-react";

const TeamPage = () => {
  const isValidUrl = (url) =>
    url && url.startsWith("https://");

  const ebMembers = [
    {
      name: "Mansi Bhargava",
      position: "Head Of Alumni Relations",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      description: "Leading with vision and passion to drive innovation.",
      social: {
        instagram: "#",
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Mrs. Deepika",
      position: "Senior Associate",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      description: "Leading with vision and passion to drive innovation.",
      social: {
        instagram: "#",
        linkedin: "#",
        github: "#",
      },
    },
  ];

  const departments = {
    Tech: [
      {
        name: "Yuvraj Chawla",
        linkedin: "https://www.linkedin.com/in/yuvraj-chawla-b8a708286",
        github: "https://www.github.com/yc786",
      },
      {
        name: "Iksha",
        linkedin: "https://www.linkedin.com/in/iksha-268a3b370/",
        github: "https://github.com/Iksha-Goomber",
      },
      {
        name: "Aarya Kumar",
        linkedin: "https://www.linkedin.com/in/aarya-kumar-3b76a8239/",
        github: "https://github.com/aaryakumar726",
      },
      {
        name: "Rishika Dhar",
        linkedin: "https://www.linkedin.com/in/rishikadhar",
        github: "https://github.com/rishikadhar11-alt",
      },
      {
        name: "Ainesh Chakravarti",
        linkedin: "https://www.linkedin.com/in/ainesh-chakravarti-04a045213",
        github: "https://github.com/Darthvader789",
      },
    ],

    "Media and Content": [
      {
        name: "Anmol Mittal",
        linkedin: "https://www.linkedin.com/in/anmol-mittal-75506337b/",
        github: "https://www.github.com/CoderAnmolMittal",
      },
      {
        name: "Agami Garg",
        linkedin: "https://www.linkedin.com/in/agami-garg-608692308/",
        github: "https://github.com/agamigarg",
      },
      {
        name: "Ajeet Pal Singh",
        linkedin: "https://www.linkedin.com/in/ajeet-pal-singh-0b928b37a",
        github: "",
      },
      {
        name: "Aman Gemawat",
        linkedin: "https://www.linkedin.com/in/aman-gemawat-400800278",
        github: "https://github.com/AmanRiptide",
      },
      {
        name: "Garvit Gawri",
        linkedin: "https://www.linkedin.com/in/garvit-gawri-003918373",
        github: "",
      },
      {
        name: "Ruhani",
        linkedin: "https://www.linkedin.com/in/ruhani-bhateja",
        github: "https://github.com/ruh2007",
      },
      {
        name: "Mansi",
        linkedin: "https://www.linkedin.com/in/mansi-b6575937a",
        github: "",
      },
      {
        name: "Arush Saini",
        linkedin: "https://www.linkedin.com/in/arush-saini-7b5633391",
        github: "https://github.com/arush-saini-codes",
      },
      {
        name: "Mohammad Gufran Ul Haq",
        linkedin: "https://www.linkedin.com/in/gufran-ul-haq-mohammad-248b9b292/",
        github: "",
      },
      {
        name: "Yuvan Soni",
        linkedin: "https://www.linkedin.com/in/yuvan-soni-8880a7378",
        github: "",
      },
      {
        name: "Rishit Jhorar",
        linkedin: "https://www.linkedin.com/in/rishit-jhorar-20634b366/",
        github: "https://github.com/JhorarRishit",
      },
      {
        name: "Mehak Kaur",
        linkedin: "https://www.linkedin.com/in/mehak-kaur-9291aa2a7",
        github: "",
      },
      {
        name: "Asees",
        linkedin: "https://www.linkedin.com/in/aseessidhu/",
        github: "https://github.com/rapid2007",
      },

    ],

    Design: [
      {
        name: "Dishita Bansal",
        linkedin: "https://www.linkedin.com/in/dishita-bansal/",
        github: "https://github.com/Dishita-Bansal",
      },
      {
        name: "Anjali Kumari",
        linkedin: "https://www.linkedin.com/in/anjali-kumari-aa7668323/",
        github: "https://github.com/Anjalikumari990",
      },
      {
        name: "Jiya Wadhwa",
        linkedin: "https://www.linkedin.com/in/jiya-wadhwa-a19b983a9",
        github: "",
      },
      {
        name: "Bhavika Sood",
        linkedin: "https://www.linkedin.com/in/bhavika-sood-83750336b",
        github: "https://github.com/bhavikasood700",
      },
      {
        name: "Rohini",
        linkedin: "https://www.linkedin.com/in/rohini-gupta-b9934a363",
        github: "",
      },

      {
        name: "Mishti",
        linkedin: "https://www.linkedin.com/in/mishti-a3b7ba3a8",
        github: "https://github.com/mishti0311",
      },
      {
        name: "Mishka Gupta ",
        linkedin: "https://www.linkedin.com/in/mishka-gupta-94901a379?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        github: "",
      },

      {
        name: "Anvesha",
        linkedin: "https://www.linkedin.com/in/anvesha20",
        github: "",
      },
      {
        name: "Sejal Bajaj",
        linkedin: "https://www.linkedin.com/in/sejal-bajaj-9ba97937a/",
        github: "https://github.com/sejal-bajaj-4",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 relative inline-block left-1/2 -translate-x-1/2">
          Faculty Heads
          <span className="absolute left-0 -bottom-3 w-full h-1 bg-red-600 rounded"></span>
        </h2>
        <div className="grid gap-8 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {ebMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative pt-[100%] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <h4 className="text-red-600 mb-3">{member.position}</h4>
                <p className="text-gray-600 text-sm mb-4">
                  {member.description}
                </p>

                <div className="flex gap-4">
                  {isValidUrl(member.social.linkedin) && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}

                  {isValidUrl(member.social.github) && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 relative inline-block left-1/2 -translate-x-1/2">
          Our Departments
          <span className="absolute left-0 -bottom-3 w-full h-1 bg-red-600 rounded"></span>
        </h2>

        <div className="grid gap-8 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(departments).map((dept) => (
            <div
              key={dept}
              className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <h3 className="text-xl font-semibold text-red-600 mb-6 border-b pb-2">
                {dept.charAt(0).toUpperCase() + dept.slice(1)} Team
              </h3>

              <ul className="space-y-4">
                {departments[dept].map((member, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-gray-700 hover:text-red-600 transition"
                  >
                    <span>{member.name}</span>

                    <div className="flex gap-3">
                      {member.github !== "NA" &&
                        isValidUrl(member.github) && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={18} />
                          </a>
                        )}
                      {isValidUrl(member.linkedin) && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}


                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamPage;