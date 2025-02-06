import pic1 from "../Assets/Teams/club.png";
import { Link } from "react-router-dom";
const teams = [
  {
    id: 1,
    name: "Club",
    descreption: "anyek team fi tunis",
    extrainfo: "extra info",
    href: "#",
    imageSrc: pic1,
    imageAlt: "Club",
  },
  {
    id: 2,
    name: "Club",
    descreption: "anyek team fi tunis",
    href: "#",
    imageSrc: pic1,
    imageAlt: "Club",
  },
  {
    id: 3,
    name: "Club",
    descreption: "anyek team fi tunis",
    href: "#",
    imageSrc: pic1,
    imageAlt: "Club",
  },
  {
    id: 4,
    name: "Club",
    descreption: "anyek team fi tunis",
    href: "#",
    imageSrc: pic1,
    imageAlt: "Club",
  },
  {
    id: 5,
    name: "Club",
    descreption: "anyek team fi tunis",
    href: "#",
    imageSrc: pic1,
    imageAlt: "Club",
  },
  {
    id: 6,
    name: "Club",
    descreption: "anyek team fi tunis",
    href: "#",
    imageSrc: pic1,
    imageAlt: "Club",
  },
];

export default function Teams() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:text-4xl md:text-4xl text-2xl font-bold text-red-500 flex justify-center pb-16 ">THE TEAMS OF THE LEAGUE</div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-12">
          {teams.map((teams) => (
            <a key={teams.id} href={teams.href} className="group">
              <Link to={`/team/${teams.id}`}>
                <img
                  alt={teams.imageAlt}
                  src={teams.imageSrc}
                  className="aspect-square w-full  h-fit rounded-lg bg-gray-200 object-cover group-hover:opacity-45 xl:aspect-6/8"
                />
              </Link>
              <h2 className="mt-4 text-3xl flex justify-center font-bold text-red-500">
                {teams.name}
              </h2>
              <p className="mt-1 text-lg flex justify-center font-medium text-gray-900">
                {teams.descreption}
              </p>
              <p className="mt-1 text-lg flex justify-center font-medium text-gray-900">
                {teams.extrainfo}
              </p>
              <Link
                to={`/team/${teams.id}`}
                className="text-red-500 flex justify-center mt-3  font-medium"
              >
                More details →
              </Link>
            </a>
          ))}
       
        </div>
        <button
            type="button"
            className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-300"
          >
            Contact US
          </button>
      </div>
    </div>
  );
}
