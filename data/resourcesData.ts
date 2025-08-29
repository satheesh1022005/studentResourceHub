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
      { title: "Developer Roadmaps - roadmap.sh", url: "https://roadmap.sh/" },
    ],
  },
  {
    category: "Coding & DSA",
    icon: "💻",
    resources: [
      { title: "takeuforward - Best Coding Tutorials for Free", url: "https://takeuforward.org/" },
      { title: "NeetCode 150 - Coding Interview Questions", url: "https://neetcode.io/practice?tab=neetcode150" },
    ],
  },
  {
    category: "Core Subjects",
    icon: "📚",
    subcategories: [
      {
        name: "OOPS",
        resources: [
          { title: "Introduction of Object Oriented Programming - GeeksforGeeks", url: "https://www.geeksforgeeks.org/dsa/introduction-of-object-oriented-programming/" },
          { title: "OOPs YouTube Lecture", url: "https://youtu.be/BSVKUk58K6U?si=eHz3Zw0cYEY-5FxD" },
          { title: "OOP in Java - Scaler", url: "https://www.scaler.com/topics/course/object-oriented-programming-java/" },
        ],
      },
      {
        name: "Database Management Systems",
        resources: [
          { title: "Free DBMS Online Course with Certificate", url: "https://www.scaler.com/topics/course/dbms/" },
          { title: "ER Diagrams - YouTube Playlist", url: "https://youtube.com/playlist?list=PLZDOU071E4v6epq3GS0IqZicZc3xwwBN_&si=U3IBZZR6bru6ZoJ7" },
          { title: "Normalization & More - YouTube Playlist", url: "https://youtube.com/playlist?list=PLNITTkCQVxeXryTQvY0JBWTyN9ynxxPH8&si=3Zea-hIrnsnzwCUZ" },
        ],
      },
      {
        name: "Operating Systems",
        resources: [
          { title: "Operating System Course with Certification", url: "https://www.scaler.com/topics/course/free-operating-system-course/" },
        ],
      },
      {
        name: "Computer Networks",
        resources: [
          { title: "High Performance Browser Networking (O'Reilly)", url: "https://hpbn.co/" },
        ],
      },
      {
        name: "All-in-One",
        resources: [
          { title: "Neso Academy (YouTube)", url: "https://www.youtube.com/@nesoacademy" },
        ],
      },
      {
        name: "Last Minute Prep",
        resources: [
          { title: "MUST-DO Questions for DBMS, CN, OS - TakeUForward", url: "https://takeuforward.org/interviews/must-do-questions-for-dbms-cn-os-interviews-sde-core-sheet" },
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
              { title: "HTML & CSS Crash Course", url: "https://youtu.be/G3e-cpL7ofc?si=4bIMT5T3bWKL1DUs" },
            ],
          },
          {
            name: "JavaScript",
            resources: [
              { title: "JavaScript Crash Course", url: "https://youtu.be/EerdGm-ehJQ?si=0ASIUcNOH7UKKlmq" },
            ],
          },
          {
            name: "React",
            resources: [
              { title: "React - SuperSimpleDev (YouTube)", url: "https://youtu.be/x4rFhThSX04?si=Kpl_5sFMSRhcspxi" },
              { title: "Scrimba Learn React", url: "https://scrimba.com/learn-react-c0e?rt=rv5ef2sd&redir=1" },
            ],
          },
        ],
      },
      {
        name: "Backend",
        subcategories: [
          {
            name: "Node & Express",
            resources: [
              { title: "Node & Express Full Course", url: "https://youtu.be/9BD9eK9VqXA?si=igwl-jsQfZcIaIko" },
            ],
          },
          {
            name: "Databases",
            resources: [
              { title: "MongoDB Tutorial", url: "https://youtu.be/c2M-rlkkT5o?si=kOzWj-E_dFCvdL1q" },
              { title: "MySQL - GeeksforGeeks", url: "https://www.geeksforgeeks.org/mysql/mysql-tutorial/" },
              { title: "SQL Practice - LeetCode Top 50", url: "https://leetcode.com/studyplan/top-sql-50/" },
            ],
          },
          {
            name: "MERN CRUD",
            resources: [
              { title: "MERN CRUD Tutorial", url: "https://youtu.be/_7UQPve99r4?si=K4mYY0Fg7SuGRa3S" },
            ],
          },
          {
            name: "Spring Boot",
            resources: [
              { title: "Spring Boot Crash Course", url: "https://youtu.be/Nv2DERaMx-4?si=Tf1SEXvQ_QZ6oVwy" },
              { title: "Spring Boot Project Tutorial", url: "https://youtu.be/Cw0J6jYJtzw?si=sXda-1w6oipnkbHe" },
            ],
          },
        ],
      },
    ],
    resources: [
      { title: "FreeCodeCamp (All Development)", url: "https://youtube.com/@freecodecamp?si=kHNTuTm19oOeV41R" },
    ],
  },
  {
    category: "Projects & Open Source",
    icon: "🚀",
    resources: [
      { title: "CodeCrafters", url: "https://codecrafters.io/" },
      { title: "Portfolio Website Examples", url: "https://github.com/topics/portfolio" },
    ],
  },
  {
    category: "System Design",
    icon: "🖥️",
    resources: [
      { title: "System Design Primer - GitHub", url: "https://github.com/donnemartin/system-design-primer" },
    ],
  },
  {
    category: "Interview Prep",
    icon: "🎯",
    resources: [
      { title: "Interview Prep Materials (Google Drive)", url: "https://drive.google.com/drive/folders/10AZn62ySZOER_S15QuYZ8L7ydDE5fxla" },
    ],
  },
  {
    category: "Resume & Profiles",
    icon: "📄",
    resources: [
      { title: "Resume Templates - Canva", url: "https://www.canva.com/resumes/templates/" },
      { title: "LinkedIn Profile Tips", url: "https://www.linkedin.com/help/linkedin/answer/15493" },
      { title: "GitHub Profile README", url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile-readme" },
    ],
  },
  {
    category: "Soft Skills & Mock Interviews",
    icon: "🤝",
    resources: [
      { title: "Pramp - Mock Interviews", url: "https://www.pramp.com/#/" },
      { title: "Topmate Creator Storefront", url: "https://topmate.io/" },
      { title: "Apna AI Interview Q&A", url: "https://apna.co/interview-prep/mock-interview" },
    ],
  },
  {
    category: "Aptitude",
    icon: "🧮",
    subcategories: [
      {
        name: "Learning",
        resources: [
          { title: "CareerRide (YouTube)", url: "https://youtube.com/@careerrideofficial?si=B9-toskaW5W6y4Cq" },
          { title: "Feel Free To Learn (YouTube)", url: "https://youtube.com/@feelfreetolearn?si=QRaq_ObjzlyidxJn" },
        ],
      },
      {
        name: "Practice",
        resources: [
          { title: "IndiaBIX - Aptitude Questions", url: "https://www.indiabix.com/" },
          { title: "CareerRide.com (Aptitude & More)", url: "https://www.careerride.com/" },
        ],
      },
    ],
  },
]
