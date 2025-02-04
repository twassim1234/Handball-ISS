import React, { useState } from "react";

const FeedbackSection = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <section className="min-h-[600px]">
    <div className="flex flex-col md:flex-row items-start justify-center gap-10 p-10 bg-gray-100">
      {/* Left Side: Calendar */}
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6 flex flex-col min-h-[600px]">
        <p className="text-xl font-semibold text-gray-800 mb-4">📅 Calendar</p>
        {/* Placeholder for Calendar (Replace this with a real calendar component) */}
        <div className="flex-grow w-full bg-gray-200 flex items-center justify-center rounded-lg">
          <p className="text-gray-600">[Insert Calendar Here]</p>
        </div>
      </div>

      {/* Right Side: Feedback Section */}
      <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6 flex flex-col min-h-[390px]">
        <p className="text-black text-2xl font-semibold">Your Feedback Matters</p>

        {/* Question */}
        <p className="text-lg text-gray-700 mt-4">
          Que pensez-vous du nouveau système du championnat ?
        </p>

        {/* Options */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="feedback" value="Excellent" /> Excellent
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="feedback" value="Good" /> Good
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="feedback" value="Needs Improvement" />
            Needs Improvement
          </label>
        </div>

        {/* Feedback Text Box */}
        <textarea
          className="mt-6 w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400"
          rows="4"
          placeholder="Additional comments (optional)..."
        />

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-800 transition">
            Vote
          </button>
          <button
            onClick={() => setShowResults(!showResults)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Show Results
          </button>
        </div>

        {/* Results Section (Visible when showResults is true) */}
        {showResults && (
          <div className="mt-6 w-full bg-gray-100 p-4 border border-gray-300 rounded-md">
            <p className="text-lg font-semibold text-gray-800">Results:</p>
            <ul className="mt-2 text-gray-700">
              <li>🔵 Excellent: 45%</li>
              <li>🟢 Good: 35%</li>
              <li>🔴 Needs Improvement: 20%</li>
            </ul>
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default FeedbackSection;
