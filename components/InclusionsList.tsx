'use client';

interface Props {
  inclusions: string[];
}

const InclusionsList = ({ inclusions }: Props) => {
  if (!Array.isArray(inclusions)) return null;

  return (
    <div className="bg-gradient-to-r from-purple-100 via-white to-purple-100 dark:from-purple-900 dark:via-gray-900 dark:to-purple-900 shadow-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4">✨ What's Included</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
        {inclusions.map((item, idx) => (
          <li key={idx} className="flex items-start space-x-3">
            <span className="text-green-600 dark:text-green-400 text-lg mt-0.5">✔️</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InclusionsList;
