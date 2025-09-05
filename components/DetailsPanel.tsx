'use client';

import { useMemo } from "react";

interface Props {
  name: string;
  description: string;
  price: string;
  category: string;
  popular: boolean;
  general_info: string[] | string;
}

const DetailsPanel = ({
  name,
  description,
  price,
  category,
  popular,
  general_info,
}: Props) => {
  const normalizedInfo: string[] = useMemo(() => {
    if (Array.isArray(general_info)) return general_info;

    // Try fixing malformed JSON like {"a","b"}
    try {
      if (
        typeof general_info === "string" &&
        general_info.trim().startsWith("{") &&
        general_info.trim().endsWith("}")
      ) {
        const fixed = general_info
          .replace(/^{/, "[")
          .replace(/}$/, "]"); // convert to array-style brackets
        const parsed = JSON.parse(fixed);
        if (Array.isArray(parsed)) return parsed.map(String);
      }

      const parsed = JSON.parse(general_info);
      if (Array.isArray(parsed)) return parsed.map(String);
      return [String(parsed)];
    } catch {
      return [String(general_info)];
    }
  }, [general_info]);

  return (
    <div className="bg-gradient-to-r from-purple-100 via-white to-purple-100 dark:from-purple-900 dark:via-gray-900 dark:to-purple-900 shadow-lg rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">{name}</h2>
        <span className="text-xl font-semibold text-green-600">{price}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-100 px-3 py-1 text-sm rounded-full">
          {category}
        </span>
        {popular && (
          <span className="bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 px-3 py-1 text-sm rounded-full">
            ⭐ Popular
          </span>
        )}
      </div>

      <p className="text-gray-700 dark:text-gray-200">{description}</p>

      <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">📋 Package Details</h3>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 space-y-1">
          {normalizedInfo.map((info, idx) => (
            <li key={idx}>{info}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailsPanel;
