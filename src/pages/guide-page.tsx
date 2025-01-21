import React, { useState } from 'react';

type SectionId = 'getting-started' | 'ai-features' | 'best-practices';

interface SectionContent {
  title: string;
  steps: string[];
}

interface Section {
  id: SectionId;
  title: string;
  content: SectionContent[];
}

const GuidePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('getting-started');

  const sections: Section[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: [
        {
          title: "Creating Your First RFP",
          steps: [
            "Navigate to the Manage RFP page",
            "Click on 'Create New RFP' button",
            "Fill in the RFP details",
            "Upload your RFP documents"
          ]
        },
        {
          title: "Using the Workbench",
          steps: [
            "Select your RFP from the dropdown",
            "Edit cells by clicking on them",
            "Use the AI assistant for help with responses",
            "Save your progress regularly"
          ]
        }
      ]
    },
    {
      id: "ai-features",
      title: "AI Features",
      content: [
        {
          title: "AI Response Generation",
          steps: [
            "Select a cell in the workbench",
            "Click 'Ask AI' for suggestions",
            "Review and edit the AI-generated content",
            "Choose the best version for your needs"
          ]
        },
        {
          title: "AI Settings",
          steps: [
            "Configure AI providers in Settings",
            "Adjust response parameters",
            "Set up custom templates",
            "Test different AI models"
          ]
        }
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      content: [
        {
          title: "Organization",
          steps: [
            "Keep RFPs in separate projects",
            "Use clear naming conventions",
            "Maintain version control",
            "Regular backups"
          ]
        },
        {
          title: "Collaboration",
          steps: [
            "Share access with team members",
            "Use comments for communication",
            "Track changes and revisions",
            "Review before finalizing"
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">User Guide</h1>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b px-6 py-4">
          <div className="flex space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-2 px-4 font-medium rounded-lg ${
                  activeSection === section.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {sections
            .find((section) => section.id === activeSection)
            ?.content.map((item, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h3 className="text-lg font-medium mb-4">{item.title}</h3>
                <div className="space-y-4">
                  {item.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                        {stepIndex + 1}
                      </div>
                      <p className="ml-4 text-gray-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GuidePage;