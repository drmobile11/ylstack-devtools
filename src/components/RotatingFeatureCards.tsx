import React from "react";
import "../styles/RotatingFeatureCards.css";

interface FeatureCardProps {
  index: number;
  color: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  index,
  color,
  title,
  description,
}) => {
  // Map feature titles to appropriate icons
  const getIconForTitle = (title: string) => {
    const iconMap: Record<string, string> = {
      "API Generator": "🌐",
      "Component Generator": "🧩",
      "Full Stack Generator": "🏗️",
      "CRUD Generator": "📊",
      "Backend Generator": "⚙️",
      "Frontend Generator": "🎨",
      "Color Generator": "🎭",
      "SVG Generator": "✏️",
      "Workflow Generator": "📈",
    };

    return iconMap[title] || "✨";
  };

  return (
    <div
      className="card"
      style={{ "--index": index, "--color-card": color } as React.CSSProperties}
    >
      <div className="img">
        <span style={{ fontSize: "32px" }}>{getIconForTitle(title)}</span>
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button>Learn More</button>
      </div>
    </div>
  );
};

interface RotatingFeatureCardsProps {
  features: Array<{
    title: string;
    description: string;
    color: string;
  }>;
}

const RotatingFeatureCards: React.FC<RotatingFeatureCardsProps> = ({
  features = [
    {
      title: "API Generator",
      description: "Generate RESTful or GraphQL APIs",
      color: "142, 249, 252",
    },
    {
      title: "Component Generator",
      description: "Create reusable UI components",
      color: "142, 252, 204",
    },
    {
      title: "Full Stack Generator",
      description: "Complete applications with frontend and backend",
      color: "142, 252, 157",
    },
    {
      title: "CRUD Generator",
      description: "Generate database operations",
      color: "215, 252, 142",
    },
    {
      title: "Backend Generator",
      description: "Server-side code and routes",
      color: "252, 252, 142",
    },
  ],
}) => {
  return (
    <div className="wrapper">
      <div
        className="inner"
        style={{ "--quantity": features.length } as React.CSSProperties}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            index={index}
            color={feature.color}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingFeatureCards;
