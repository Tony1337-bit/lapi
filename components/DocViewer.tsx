import React from "react";
import { DocSection } from "../types";
import { CodeBlock } from "./CodeBlock";
import { GlassCard } from "./GlassCard";

interface DocViewerProps {
  data?: DocSection;
}

export const DocViewer: React.FC<DocViewerProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-16 h-16 rounded-full bg-glass-200 flex items-center justify-center mb-6">
          <span className="text-2xl">⚡</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to LAPI</h2>
        <p className="text-gray-400 max-w-md">
          Select a module from the sidebar to start exploring the documentation.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          {data.title}
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Description */}
      {data.description && (
        <p className="text-gray-400 max-w-2xl">{data.description}</p>
      )}
      {/* Main Content */}
      <GlassCard className="p-8">
        <div className="space-y-6">
          {data.blocks.map((block, idx) => {
            switch (block.type) {
              case "text":
                return (
                  <div
                    key={idx}
                    className="text-gray-300 leading-relaxed text-lg"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );
              case "code":
                return (
                  <div key={idx} className="-mx-2">
                    <CodeBlock
                      code={block.content}
                      language={block.language || "lua"}
                      title={block.title}
                    />
                  </div>
                );
              case "list":
                return (
                  <ul
                    key={idx}
                    className="list-disc list-inside space-y-3 pl-2 text-gray-300"
                  >
                    {block.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-lg leading-relaxed marker:text-indigo-500"
                      >
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </li>
                    ))}
                  </ul>
                );
              case "header":
                return (
                  <div key={idx} className="space-y-2">
                    {block.header.map((headerLine, i) => (
                      <h3 key={i} className="text-1xl font-semibold text-white">
                        {headerLine}
                      </h3>
                    ))}
                  </div>
                );
              case "table":
                return (
                  <div key={idx} className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr>
                          {block.items.header.map((headerCell, i) => (
                            <th
                              key={i}
                              className="border border-glass-border bg-glass-200 text-left px-4 py-2 text-sm text-gray-400 uppercase tracking-wider"
                            >
                              {headerCell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.items.rows.map((row, i) => (
                          <tr
                            key={i}
                            className={i % 2 === 0 ? "bg-[#0a0a0e]/50" : ""}
                          >
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className={`
                    border border-glass-border px-4 py-3 text-gray-300 text-sm
                    ${j === 0 ? "w-32" : ""}
                    ${j === 1 ? "w-32" : ""}
                    ${j === 2 ? "whitespace-normal break-words" : ""}
                    align-top
                  `}
                              >
                                <span
                                  dangerouslySetInnerHTML={{ __html: cell }}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              case "subheader":
                return (
                  <div
                    key={idx}
                    className="text-gray-400 leading-relaxed text-base italic pl-4 border-l-2 border-glass-border"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
      </GlassCard>

      {/* Related/Footer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlassCard
          className="p-4 flex items-center justify-between"
          hoverEffect
        >
          <span className="text-gray-400 text-sm">Need help?</span>
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
          >
            Join Discord →
          </a>
        </GlassCard>
        <GlassCard
          className="p-4 flex items-center justify-between"
          hoverEffect
        >
          <span className="text-gray-400 text-sm">Found a bug?</span>
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
          >
            Report Issue →
          </a>
        </GlassCard>
      </div>
    </div>
  );
};
