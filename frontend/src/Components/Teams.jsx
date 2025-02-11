import { useState } from "react";
import { Link } from "react-router-dom";
import pic1 from "../Assets/Teams/club.png";
import pic2 from "../Assets/Teams/taraji.png";

export default function Teams() {
  const [teams, setTeams] = useState([
    { id: 1, name: "Club", descreption: "best  team fi tunis", extrainfo: "extra info", href: "#", imageSrc: pic1, imageAlt: "Club" },
    { id: 2, name: "Club", descreption: "best team fi tunis", href: "#", imageSrc: pic2, imageAlt: "Club" },
  ]);

  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [formData, setFormData] = useState({ id: null, name: "", descreption: "", extrainfo: "", imageSrc: "" });
  const [imagePreview, setImagePreview] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleModifyClick = () => setIsModifyMode(!isModifyMode);

  const handleEdit = (team) => {
    setIsEditing(true);
    setCurrentTeam(team);
    setFormData({ ...team });
    setImagePreview(team.imageSrc);
  };

  const handleDelete = (id) => setTeams(teams.filter((team) => team.id !== id));

  const handleAddNew = () => {
    setIsAdding(true);
    setFormData({ id: teams.length + 1, name: "", descreption: "", extrainfo: "", imageSrc: "" });
    setImagePreview("");
  };

  const handleSaveEdit = () => {
    setTeams(teams.map((team) => (team.id === currentTeam.id ? { ...formData } : team)));
    setIsEditing(false);
  };

  const handleAddTeam = () => {
    if (formData.name && formData.descreption && formData.imageSrc) {
      setTeams([...teams, { ...formData, imageAlt: formData.name }]);
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAdding(false);
    setFormData({ id: null, name: "", descreption: "", extrainfo: "", imageSrc: "" });
    setImagePreview("");
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageSrc: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:text-4xl md:text-4xl text-2xl font-bold text-red-500 flex justify-center pb-16">
          THE TEAMS OF THE LEAGUE
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-12">
          {teams.map((team) => (
            <div key={team.id} className="group">
              <Link to={`/team/${team.id}`}>
                <img alt={team.imageAlt} src={team.imageSrc} className="max-w-fit px-12 max-h-fit rounded-lg object-cover group-hover:opacity-45 xl:aspect-6/8" />
              </Link>
              <h2 className="mt-4 text-3xl flex justify-center font-bold text-red-500">{team.name}</h2>
              <p className="mt-1 text-lg flex justify-center font-medium text-gray-900">{team.descreption}</p>
              {team.extrainfo && <p className="mt-1 text-lg flex justify-center font-medium text-gray-900">{team.extrainfo}</p>}
              <Link to={`/team/${team.id}`} className="text-red-500 flex justify-center mt-3 font-medium">
                More details →
              </Link>

              {isModifyMode && (
                <div className="flex justify-between mt-3">
                  <button onClick={() => handleEdit(team)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(team.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center pt-16 gap-4">
          <button onClick={handleModifyClick} className={`px-6 py-3 font-medium rounded-md ${isModifyMode ? "bg-gray-500 text-white" : "bg-red-500 text-white hover:bg-red-800"}`}>
            {isModifyMode ? "Done" : "Modify"}
          </button>
          {isModifyMode && (
            <button onClick={handleAddNew} className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-800">
              Add Team
            </button>
          )}
        </div>

        {/* Edit / Add Modal */}
        {(isEditing || isAdding) && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Team" : "Add New Team"}</h2>
              <input type="text" name="name" placeholder="Team Name" value={formData.name} onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
              <input type="text" name="descreption" placeholder="Description" value={formData.descreption} onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
              <input type="text" name="extrainfo" placeholder="Extra Info (optional)" value={formData.extrainfo} onChange={handleChange} className="w-full p-2 border mb-2 rounded" />
              <input type="file" onChange={handleImageChange} className="w-full p-2 border mb-2 rounded" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded mb-2" />}
              <div className="flex justify-between mt-4">
                <button onClick={isEditing ? handleSaveEdit : handleAddTeam} className="px-4 py-2 bg-blue-500 text-white rounded">{isEditing ? "Save" : "Add"}</button>
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
