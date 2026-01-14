export const courses = [
  {
    id: 1,
    title: "Advanced Artificial Intelligence",
    description: "Deep dive into neural networks, NLP, and computer vision.",
    image: "/assets/course_images/advanced_ai_custom.jpg",
    details: "This course covers advanced topics in AI including Deep Learning, Reinforcement Learning, and Generative Adversarial Networks. Prerequisites: Basic Python and Math.",
    duration: "12 Weeks",
    level: "Advanced",
    category: "Data",
    price: 199,
    instructor: {
      name: "Dr. Amara Okafor",
      bio: "Dr. Amara Okafor is a renowned AI researcher and former lead scientist at Google DeepMind, where she contributed to breakthrough projects in neural architecture search and large language models. With a PhD in Computer Science from MIT and over 15 years of experience in machine learning research, she has published more than 50 papers in top-tier conferences. Dr. Okafor is passionate about democratizing AI education and making complex concepts accessible to aspiring data scientists. Her teaching approach combines rigorous theoretical foundations with hands-on industry applications.",
      quote: "The future belongs to those who can teach machines to learn, but the present belongs to those who never stop learning themselves."
    }
  },
  {
    id: 2,
    title: "Machine Learning Mastery",
    description: "Master supervised and unsupervised learning algorithms.",
    image: "/assets/course_images/machine_learning.png",
    details: "Learn to build predictive models, understand data preprocessing, and deploy ML models. Covers regression, classification, clustering, and more.",
    duration: "10 Weeks",
    level: "Intermediate to Advanced",
    category: "Data",
    price: 149,
    instructor: {
      name: "Prof. James Chen",
      bio: "Professor James Chen brings 20 years of academic and industry experience in machine learning and statistical modeling. After earning his doctorate from Stanford University, he spent a decade at Microsoft Research before transitioning to academia. Prof. Chen has worked on recommendation systems serving millions of users and has been instrumental in developing ML frameworks used by Fortune 500 companies. His research focuses on scalable machine learning algorithms and he's known for his ability to explain complex mathematical concepts with clarity and real-world examples.",
      quote: "Machine learning is not about replacing human intelligence; it's about augmenting it to solve problems we never thought possible."
    }
  },
  {
    id: 3,
    title: "Data Science with Python",
    description: "Analyze and visualize data to make data-driven decisions.",
    image: "/assets/course_images/python_data_science.png",
    details: "Comprehensive course on pandas, numpy, matplotlib, and seaborn. real-world projects on data cleaning and visualization.",
    duration: "8 Weeks",
    level: "Intermediate",
    category: "Data",
    price: 129,
    instructor: {
      name: "Sarah Martinez",
      bio: "Sarah Martinez is a data science consultant and educator who has helped over 50 companies transform their raw data into actionable insights. With a background in statistics and a Master's degree from UC Berkeley, she specializes in data storytelling and visualization best practices. Sarah spent five years as a senior data analyst at Netflix, where she worked on personalization algorithms and A/B testing frameworks. She's passionate about teaching Python for data analysis and believes that anyone can learn to code with the right guidance and real-world practice.",
      quote: "Data is the new oil, but insight is the new currency. Learn to refine one into the other."
    }
  },
  {
    id: 4,
    title: "Cloud Computing Architecture",
    description: "Design and manage scalable cloud infrastructure.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    details: "Focuses on AWS and Azure services. identifying the right architecture for your applications and managing cloud resources efficiently.",
    duration: "10 Weeks",
    level: "Advanced",
    category: "Software",
    price: 179,
    instructor: {
      name: "Marcus Thompson",
      bio: "Marcus Thompson is an AWS Certified Solutions Architect and Azure Expert with over 12 years of experience designing enterprise-scale cloud infrastructures. He led the cloud migration for three Fortune 100 companies, managing transitions that saved millions in operational costs while improving system reliability. Marcus holds multiple cloud certifications and regularly speaks at international tech conferences about cloud-native architectures and DevOps practices. His teaching style emphasizes practical, cost-effective solutions and real-world architectural patterns that students can immediately apply in their careers.",
      quote: "The cloud isn't just about technology—it's about enabling businesses to move faster, scale smarter, and innovate without limits."
    }
  },
  {
    id: 5,
    title: "Cybersecurity & Ethical Hacking",
    description: "Learn to defend systems against modern cyber threats.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    details: "Ethical hacking methodologies, penetration testing, and network security. Hands-on labs with Kali Linux.",
    duration: "14 Weeks",
    level: "Advanced",
    category: "Software",
    price: 189,
    instructor: {
      name: "Elena Volkov",
      bio: "Elena Volkov is a certified ethical hacker (CEH) and cybersecurity consultant with a remarkable track record of protecting critical infrastructure for government agencies and financial institutions. With 18 years in the field, she's conducted hundreds of penetration tests and security audits, uncovering vulnerabilities before malicious actors could exploit them. Elena previously served as the Chief Security Officer for a major fintech company and now dedicates her time to training the next generation of cybersecurity professionals. Her courses are known for their hands-on, real-world scenarios that prepare students for actual security challenges.",
      quote: "In cybersecurity, you're only as strong as your weakest link. My job is to help you eliminate those weak links before someone else finds them."
    }
  },
  {
    id: 6,
    title: "Blockchain Development",
    description: "Build decentralized applications and smart contracts.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop",
    details: "Understand blockchain fundamentals, Ethereum, Solidity, and Web3.js. Create your own DApps.",
    duration: "8 Weeks",
    level: "Intermediate",
    category: "Software",
    price: 159,
    instructor: {
      name: "Kofi Mensah",
      bio: "Kofi Mensah is a blockchain architect and early cryptocurrency adopter who has been building decentralized applications since 2015. He co-founded two successful blockchain startups and has developed smart contracts that manage over $100 million in digital assets. Kofi holds a degree in Computer Engineering and has contributed to several open-source blockchain protocols. His expertise spans Ethereum, Solidity, DeFi protocols, and NFT marketplaces. Known for his ability to demystify complex blockchain concepts, Kofi is passionate about Web3 education and believes that decentralized technology will reshape the future of the internet.",
      quote: "Blockchain is more than technology—it's more than a financial revolution—it's a movement toward transparency, trust, and giving power back to individuals."
    }
  },
  {
    id: 7,
    title: "DevOps Engineering",
    description: "Bridge the gap between development and operations.",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=800&auto=format&fit=crop",
    details: "Learn CI/CD pipelines, Docker, Kubernetes, Jenkins, and infrastructure as code with Terraform.",
    duration: "12 Weeks",
    level: "Advanced",
    category: "Software",
    price: 169,
    instructor: {
      name: "Priya Sharma",
      bio: "Priya Sharma is a DevOps evangelist and Site Reliability Engineer with extensive experience building robust CI/CD pipelines for high-traffic platforms. She spent seven years at Amazon Web Services, where she helped enterprise clients adopt containerization and microservices architectures. Priya is a Kubernetes Certified Administrator and Docker Captain who has automated deployment processes for companies processing billions of transactions daily. Her teaching philosophy centers on practical automation, monitoring best practices, and fostering a culture of collaboration between development and operations teams. She's authored several technical blogs on DevOps that have reached millions of readers.",
      quote: "DevOps isn't just about tools and automation—it's about creating a culture where failure is a learning opportunity and continuous improvement is the norm."
    }
  },
  {
    id: 8,
    title: "Full Stack Web Development",
    description: "Become a master of both frontend and backend technologies.",
    image: "/assets/course_images/full_stack_web_dev.png",
    details: "MERN stack mastery (MongoDB, Express, React, Node.js). Build complete web applications from scratch.",
    duration: "16 Weeks",
    level: "Intermediate",
    category: "Web",
    price: 139,
    instructor: {
      name: "Alex Rodriguez",
      bio: "Alex Rodriguez is a full-stack engineer and technical lead who has built production applications used by millions of users worldwide. After graduating from a coding bootcamp himself, Alex worked his way up from junior developer to technical architect at a leading social media company. He's passionate about making web development accessible and has mentored over 200 developers transitioning into tech careers. Alex specializes in the MERN stack and modern JavaScript frameworks, with deep expertise in building scalable RESTful APIs, implementing authentication systems, and creating responsive user interfaces. His course projects are based on real applications he's built in the industry.",
      quote: "The best way to learn web development is to build, break, debug, and build again. Every error message is a lesson waiting to be learned."
    }
  },
  {
    id: 9,
    title: "Big Data Engineering",
    description: "Handle massive datasets with Hadoop and Spark.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
    details: "Learn to process and analyze large data sets using Apache Hadoop, Spark, and Kafka.",
    duration: "14 Weeks",
    level: "Advanced",
    category: "Data",
    price: 179,
    instructor: {
      name: "Dr. Rajesh Kumar",
      bio: "Dr. Rajesh Kumar is a big data architect and Apache Spark committer with over 16 years of experience processing petabyte-scale datasets. He earned his PhD in Distributed Systems from Carnegie Mellon University and has since architected data platforms for companies like Uber and LinkedIn. Dr. Kumar specializes in real-time data processing, distributed computing, and building data lakes that power business intelligence for global enterprises. He's published research on optimizing Spark performance and has given keynote presentations at major data engineering conferences. His teaching approach bridges theoretical foundations with pragmatic, production-ready solutions.",
      quote: "Big data is not about having more data—it's about asking better questions and building systems that can answer them at scale."
    }
  },
  {
    id: 10,
    title: "IoT Solutions Architecture",
    description: "Connect the physical world to the digital with IoT.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    details: "Design and implement IoT solutions. Work with sensors, microcontrollers, and cloud IoT platforms.",
    duration: "10 Weeks",
    level: "Advanced",
    category: "Software",
    price: 159,
    instructor: {
      name: "Dr. Yuki Tanaka",
      bio: "Dr. Yuki Tanaka is an IoT solutions architect and embedded systems expert who has designed smart city infrastructures and industrial automation systems deployed across three continents. With a doctorate in Electrical Engineering from Tokyo Institute of Technology, she combines hardware expertise with cloud architecture knowledge. Dr. Tanaka has worked with Arduino, Raspberry Pi, ESP32, and commercial IoT platforms like AWS IoT and Azure IoT Hub. She's helped manufacturing companies achieve Industry 4.0 transformation and built sensor networks monitoring environmental data for smart agriculture. Her courses blend electronics fundamentals with modern cloud-connected IoT ecosystems.",
      quote: "The Internet of Things is about making the invisible visible, giving voice to the silent, and creating intelligence where none existed before."
    }
  },
  {
    id: 11,
    title: "Augmented Reality (AR) Development",
    description: "Create immersive AR experiences for mobile and web.",
    image: "/assets/course_images/ar_development_v2.jpg",
    details: "Learn Unity 3D and ARCore/ARKit to build augmented reality applications.",
    duration: "10 Weeks",
    level: "Intermediate",
    category: "Design",
    price: 149,
    instructor: {
      name: "Isabella Costa",
      bio: "Isabella Costa is an AR/VR developer and Unity certified expert who has created immersive experiences for major brands including Nike, IKEA, and BMW. With a background in game design and computer graphics, she has spent the last eight years pushing the boundaries of augmented reality on mobile platforms. Isabella has developed AR try-on applications, interactive marketing campaigns, and educational AR experiences used in museums worldwide. She's proficient in Unity 3D, ARCore, ARKit, and WebXR technologies. Her teaching style emphasizes creative problem-solving and user experience design principles specific to spatial computing.",
      quote: "Augmented reality isn't about escaping the world—it's about enriching it with layers of possibility and wonder."
    }
  },
  {
    id: 12,
    title: "Quantum Computing Basics",
    description: "Step into the future of computing power.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    details: "Introduction to quantum mechanics principles for computing, qubits, and quantum algorithms.",
    duration: "8 Weeks",
    level: "Beginner to Intermediate",
    category: "Software",
    price: 249,
    instructor: {
      name: "Dr. Samuel Osei",
      bio: "Dr. Samuel Osei is a quantum computing researcher and educator who makes the complex world of quantum mechanics accessible to computer scientists. After completing his PhD in Quantum Information Science at Oxford University, he joined IBM's quantum computing division, where he contributed to the development of Qiskit, IBM's open-source quantum computing framework. Dr. Osei has published extensively on quantum algorithms and error correction, and he's passionate about preparing the next generation of developers for the quantum revolution. His teaching approach requires no advanced physics background, focusing instead on computational thinking and practical quantum programming skills.",
      quote: "Quantum computing may seem like magic, but it's really just nature's way of computing—and we're finally learning to speak its language."
    }
  }
];
