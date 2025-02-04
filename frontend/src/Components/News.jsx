import React from "react";
import pic1 from "../Assets/s1.jpg";
import pic2 from "../Assets/s2.png";
import pic3 from "../Assets/s3.png";
import pic4 from "../Assets/s4.jpg";
import pic5 from "../Assets/s5.jpeg";
import pic6 from "../Assets/s6.png";
import pic7 from "../Assets/s7.jpg";
import pic8 from "../Assets/s8.jpg";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "Tunisia Wins Handball Championship",
    description: "Tunisia secures a historic win in the African Handball Championship.",
    image: pic1,
  },
  {
    id: 2,
    title: "New Handball League Announced",
    description: "A new professional handball league will start next season in Tunisia.",
    image: pic2,
  },
  {
    id: 3,
    title: "Top Players to Watch in 2025",
    description: "Here are the rising stars of Tunisian handball to keep an eye on.",
    image: pic3,
  },
  {
    id: 4,
    title: "Handball Coaching Updates",
    description: "New coaching techniques are being implemented in Tunisia’s national team.",
    image: pic4,
  },
  {
    id: 5,
    title: "International Match Fixtures",
    description: "Tunisia's handball team is set to face off against top international teams.",
    image: pic5,
  },
  {
    id: 6,
    title: "Handball Youth Academy Launched",
    description: "A new youth academy is opening to train the next generation of Tunisian handball players.",
    image: pic6,
  },
  {
    id: 7,
    title: "New Training Facilities Unveiled",
    description: "State-of-the-art training centers open for Tunisia's handball teams.",
    image: pic7,
  },
  {
    id: 8,
    title: "Handball Community Growth",
    description: "Handball is gaining popularity among Tunisian youth.",
    image: pic8,
  },
];

const News = () => {
  return (
    <section className="w-screen min-h-screen px-20 py-16 bg-gray-50 flex items-center">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-6 text-red-500">Latest News</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news) => (
            <div key={news.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={news.image} alt={news.title} className="w-full h-56 object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">{news.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{news.description}</p>
                <Link
                  to={`/news/${news.id}`}
                  className="text-red-500 mt-3 inline-block font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
