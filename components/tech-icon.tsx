"use client"

import { 
  Globe, 
  ArrowRightLeft, 
  Network, 
  Share2, 
  Blocks, 
  Puzzle, 
  DraftingCompass, 
  Zap, 
  Database,
  Server,
  Code2,
  Layers,
  Cpu,
  Cloud
} from "lucide-react";

// Fallback for icons not found in devicons-react or specific requests
// We will use simple-icons CDN for a cleaner look if devicons-react is too heavy or missing icons.
// Actually, simple-icons via CDN is the most lightweight and comprehensive solution.

export const TechIcon = ({ name, size = 24 }: { name: string; size?: number }) => {
  // 1. Lucide Icons Mapping (Concepts & Methodologies)
  const lucideMap: { [key: string]: React.ElementType } = {
    "RESTful API": Globe,
    "Transaction Management": ArrowRightLeft,
    "Hyperledger Fabric": Blocks,
    "System Architecture": Network,
    "Distributed Systems": Share2,
    "Microservices": Puzzle,
    "Design Patterns": DraftingCompass,
    "Query Optimization": Zap,
    "Database Design": Database,
    "Indexing Strategies": Layers,
    "Crawling": Code2,
    "API Integration": Server,
    "UML": DraftingCompass,
    "Spring Cloud Gateway": Network,
    "Eureka": Share2,
    "MyBatis": Database,
    "AWS": Cloud,
  };

  if (lucideMap[name]) {
    const LucideIcon = lucideMap[name];
    return <LucideIcon size={size} className="text-slate-600 dark:text-slate-400" />;
  }

  // 2. Simple Icons Mapping (Brands & Products)
  const slugMap: { [key: string]: string } = {
    "Spring Boot": "springboot",
    "Spring Security": "springsecurity",
    "Java": "openjdk",
    "JWT": "jsonwebtokens",
    "OAuth 2.0": "oauth",
    "MySQL": "mysql",
    "CouchDB": "apachecouchdb",
    "Docker": "docker",
    "Docker Compose": "docker",
    "CI/CD": "githubactions",
    "Node.js": "nodedotjs",
    "Vue.js": "vue.js",
    "React": "react",
    "Next.js": "nextdotjs",
    "TypeScript": "typescript",
    "JPA": "hibernate",
    "Go": "go",
    "ELK Stack": "elastic",
    "AWS EC2": "amazonec2",
    "AWS S3": "amazons3",
    "RDS": "amazonrds",
    "Jenkins": "jenkins",
    "Nginx": "nginx",
    "Kafka": "apachekafka",
    "Prometheus": "prometheus",
    "Grafana": "grafana",
    "Git": "git",
    "Redis": "redis",
    "Linux": "linux",
    "Ubuntu": "ubuntu",
    "Vim": "vim",
    "IntelliJ": "intellijidea",
    "Postman": "postman",
    "Slack": "slack",
    "Notion": "notion",
    "Python": "python",
    "Kotlin": "kotlin",
  };

  const slug = slugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Use simpleicons.org CDN
  return (
    <img 
      src={`https://cdn.simpleicons.org/${slug}`} 
      alt={name}
      width={size}
      height={size}
      className="dark:invert dark:opacity-80 opacity-70"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};
