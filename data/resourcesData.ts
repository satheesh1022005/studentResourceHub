export interface Resource {
  title: string
  url: string
}

export interface SubCategory {
  name: string
  resources?: Resource[]
  subcategories?: SubCategory[]
}

export interface ResourceCategory {
  category: string
  icon: string
  resources?: Resource[]
  subcategories?: SubCategory[]
}

export const resourcesData: ResourceCategory[] = [
  {
    category: "Roadmaps",
    icon: "🗺️",
    resources: [
      { title: "Frontend Developer Roadmap", url: "https://roadmap.sh/frontend" },
      { title: "Backend Developer Roadmap", url: "https://roadmap.sh/backend" },
      { title: "Full Stack Developer Roadmap", url: "https://roadmap.sh/full-stack" },
      { title: "DevOps Roadmap", url: "https://roadmap.sh/devops" },
    ],
  },
  {
    category: "Coding & DSA",
    icon: "💻",
    resources: [
      { title: "LeetCode", url: "https://leetcode.com" },
      { title: "HackerRank", url: "https://hackerrank.com" },
      { title: "CodeChef", url: "https://codechef.com" },
      { title: "GeeksforGeeks DSA", url: "https://geeksforgeeks.org/data-structures" },
    ],
  },
  {
    category: "Core Subjects",
    icon: "📚",
    subcategories: [
      {
        name: "OOPS",
        resources: [
          { title: "Kunal Kushwaha", url: "https://www.youtube.com/watch?v=BSVKUk58K6U" },
          { title: "Database Star", url: "https://www.databasestar.com/object-oriented-programming/" },
          { title: "Decomplexify", url: "https://www.youtube.com/c/Decomplexify" },
        ],
      },
      {
        name: "Database Management Systems",
        resources: [
          { title: "DBMS Tutorial", url: "https://www.tutorialspoint.com/dbms/" },
          { title: "SQL Tutorial", url: "https://www.w3schools.com/sql/" },
          { title: "Database Design", url: "https://www.lucidchart.com/pages/database-diagram" },
        ],
      },
      {
        name: "Operating Systems",
        resources: [
          { title: "OS Concepts", url: "https://www.tutorialspoint.com/operating_system/" },
          { title: "Process Management", url: "https://www.geeksforgeeks.org/process-management-in-operating-system/" },
          { title: "Memory Management", url: "https://www.geeksforgeeks.org/memory-management-in-operating-system/" },
        ],
      },
      {
        name: "Computer Networks",
        resources: [
          { title: "Networking Basics", url: "https://www.tutorialspoint.com/data_communication_computer_network/" },
          { title: "TCP/IP Protocol", url: "https://www.geeksforgeeks.org/tcp-ip-model/" },
          {
            title: "Network Security",
            url: "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html",
          },
        ],
      },
    ],
  },
  {
    category: "Web Development",
    icon: "🌐",
    subcategories: [
      {
        name: "Frontend",
        subcategories: [
          {
            name: "HTML & CSS",
            resources: [
              { title: "HTML Crash Course", url: "https://youtu.be/G3e-cpL7ofc" },
              { title: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
              { title: "Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
            ],
          },
          {
            name: "JavaScript",
            resources: [
              { title: "JavaScript.info", url: "https://javascript.info" },
              { title: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
              { title: "ES6 Features", url: "https://github.com/lukehoban/es6features" },
            ],
          },
          {
            name: "React",
            resources: [
              { title: "React Documentation", url: "https://react.dev" },
              { title: "React Tutorial", url: "https://reactjs.org/tutorial/tutorial.html" },
              { title: "React Hooks", url: "https://reactjs.org/docs/hooks-intro.html" },
            ],
          },
        ],
      },
      {
        name: "Backend",
        subcategories: [
          {
            name: "Node.js",
            resources: [
              { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
              { title: "Express.js Guide", url: "https://expressjs.com/en/guide/routing.html" },
              { title: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" },
            ],
          },
          {
            name: "Databases",
            resources: [
              { title: "MongoDB Tutorial", url: "https://docs.mongodb.com/manual/tutorial/" },
              { title: "PostgreSQL Tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html" },
              { title: "Redis Guide", url: "https://redis.io/documentation" },
            ],
          },
        ],
      },
    ],
    resources: [
      { title: "FreeCodeCamp", url: "https://freecodecamp.org" },
      { title: "Full Stack Open", url: "https://fullstackopen.com/en/" },
    ],
  },
  {
    category: "Interview Prep",
    icon: "🎯",
    resources: [
      { title: "InterviewBit", url: "https://interviewbit.com" },
      { title: "Pramp - Mock Interviews", url: "https://pramp.com" },
      { title: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
      {
        title: "Behavioral Interview Guide",
        url: "https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions",
      },
    ],
  },
  {
    category: "Resume & Profiles",
    icon: "📄",
    resources: [
      { title: "Resume Templates", url: "https://www.canva.com/resumes/templates/" },
      { title: "LinkedIn Profile Tips", url: "https://www.linkedin.com/help/linkedin/answer/15493" },
      {
        title: "GitHub Profile README",
        url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme",
      },
      { title: "Portfolio Examples", url: "https://github.com/topics/portfolio" },
    ],
  },
  {
    category: "Soft Skills",
    icon: "🤝",
    resources: [
      { title: "Communication Skills", url: "https://www.coursera.org/learn/communication-skills" },
      { title: "Time Management", url: "https://www.mindtools.com/pages/main/newMN_HTE.htm" },
      { title: "Leadership Skills", url: "https://www.edx.org/learn/leadership" },
      {
        title: "Teamwork & Collaboration",
        url: "https://www.indeed.com/career-advice/career-development/teamwork-skills",
      },
    ],
  },
  {
    category: "Projects & Open Source",
    icon: "🚀",
    resources: [
      { title: "GitHub Explore", url: "https://github.com/explore" },
      { title: "First Contributions", url: "https://github.com/firstcontributions/first-contributions" },
      { title: "Project Ideas", url: "https://github.com/karan/Projects" },
      { title: "Awesome Lists", url: "https://github.com/sindresorhus/awesome" },
    ],
  },
  {
    category: "Tools & Productivity",
    icon: "🛠️",
    resources: [
      { title: "VS Code Extensions", url: "https://marketplace.visualstudio.com/vscode" },
      { title: "Git & GitHub Guide", url: "https://guides.github.com" },
      { title: "Notion Templates", url: "https://notion.so/templates" },
      { title: "Productivity Apps", url: "https://www.notion.so/product" },
    ],
  },
]
