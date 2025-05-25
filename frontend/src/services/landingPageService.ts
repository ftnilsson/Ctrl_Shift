// Landing Page Service - provides configurable content for the landing page

export interface HeroSection {
  title: string;
  highlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export interface Feature {
  icon: string; // SVG path data
  title: string;
  description: string;
}

export interface FeaturesSection {
  title: string;
  subtitle: string;
  features: Feature[];
}

export interface GetStartedSection {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface LandingPageContent {
  hero: HeroSection;
  features: FeaturesSection;
  getStarted: GetStartedSection;
}

// This would typically fetch from an API or CMS
// For now, we provide default content that can be overridden
export const getLandingPageContent = async (): Promise<LandingPageContent> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {    hero: {
      title: "Streamline On-Call Management",
      highlight: "with Ctrl+Shift",
      description: "A free and open-source platform for scheduling, monitoring, and optimizing your team's on-call coverage. Self-hosted, community-driven, and guaranteed free forever - no rug pulls, no paid tiers, just great software.",
      primaryButtonText: "Go to Dashboard",
      primaryButtonLink: "/dashboard",
      secondaryButtonText: "Learn More",
      secondaryButtonLink: "#features"
    },    features: {
      title: "Key Features",
      subtitle: "Everything your team needs to manage on-call schedules effectively - 100% free forever",
      features: [
        {
          icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
          title: "Intelligent Scheduling",
          description: "Create and manage on-call schedules with ease. Balance workloads automatically and prevent scheduling conflicts."
        },
        {
          icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
          title: "Team Management",
          description: "Organize team members by skills and availability. Assign roles and responsibilities with clear expectations."
        },
        {
          icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
          title: "Free Forever",
          description: "Truly free and open-source with no hidden catches. Self-host your instance without worrying about future pricing changes or feature restrictions."
        },
        {
          icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          title: "Coverage Analytics",
          description: "Visualize your on-call coverage patterns. Identify gaps, optimize schedules, and improve response times."
        }
      ]
    },    getStarted: {
      title: "Ready to Optimize Your On-Call Management?",
      description: "Get started with Ctrl+Shift today and improve your team's on-call experience. Join our community of users who believe that great support and customer care are the foundation of excellent software. Fork, contribute, and help make this tool better for everyone.",
      buttonText: "Go to Dashboard",
      buttonLink: "/dashboard"
    }
  };
};

// For real-time updates (could be connected to a backend)
export const updateLandingPageContent = async (newContent: Partial<LandingPageContent>): Promise<void> => {
  // Here we would typically send the updated content to a backend API
  console.log("Landing page content update request:", newContent);
  // For now, just simulate a successful update
  await new Promise(resolve => setTimeout(resolve, 300));
};