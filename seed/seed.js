import dotenv from "dotenv";
import connectDB from "../config/db.js";

import User from "../models/User.js";
import Blog from "../models/Blog.js";

dotenv.config();

const seedDatabase = async () => {
    try {
        await connectDB();

        // Remove existing data
        await User.deleteMany({});
        await Blog.deleteMany({});

        console.log("Old data removed");

        // Create users
        const users = await User.insertMany([
            {
                name: "Shiv Kumar",
                username: "shiv",
                email: "shiv@example.com",
                bio: "Cybersecurity enthusiast and developer.",
                profileImage: "https://i.pravatar.cc/150?img=1"
            },
            {
                name: "Rahul Sharma",
                username: "rahul",
                email: "rahul@example.com",
                bio: "Java and backend developer.",
                profileImage: "https://i.pravatar.cc/150?img=2"
            },
            {
                name: "Aarav Singh",
                username: "aarav",
                email: "aarav@example.com",
                bio: "Cloud and DevOps learner.",
                profileImage: "https://i.pravatar.cc/150?img=3"
            },
            {
                name: "Priya Thapa",
                username: "priya",
                email: "priya@example.com",
                bio: "Frontend developer and technology writer.",
                profileImage: "https://i.pravatar.cc/150?img=4"
            },
            {
                name: "Anish Gurung",
                username: "anish",
                email: "anish@example.com",
                bio: "Software engineer interested in distributed systems.",
                profileImage: "https://i.pravatar.cc/150?img=5"
            }
        ]);

        console.log(`${users.length} users inserted`);

        // Create blogs
        const blogs = [];

        const blogData = [
            {
                user: users[0],
                posts: [
                    ["Getting Started with AWS", "AWS provides many cloud services for building and deploying modern applications."],
                    ["Introduction to Docker", "Docker makes it easier to package applications and their dependencies into containers."],
                    ["Learning Kubernetes", "Kubernetes helps manage containerized applications across multiple machines."],
                    ["Understanding AWS Lambda", "AWS Lambda allows developers to run code without managing servers."],
                    ["MongoDB Basics", "MongoDB is a document-oriented NoSQL database that stores data as documents."]
                ]
            },
            {
                user: users[1],
                posts: [
                    ["Introduction to Java", "Java is a popular programming language used for backend and enterprise applications."],
                    ["Spring Boot Basics", "Spring Boot simplifies the development of Java backend applications."],
                    ["Building REST APIs", "REST APIs allow applications to communicate using HTTP."],
                    ["Understanding Microservices", "Microservices divide an application into smaller independent services."],
                    ["Git for Developers", "Git helps developers manage source code and collaborate with teams."]
                ]
            },
            {
                user: users[2],
                posts: [
                    ["What is DevOps?", "DevOps combines development and operations practices to improve software delivery."],
                    ["AWS EC2 Explained", "EC2 provides virtual servers that can run applications in the AWS cloud."],
                    ["AWS IAM Basics", "IAM controls authentication and authorization for AWS resources."],
                    ["Introduction to CI/CD", "CI/CD automates application building, testing and deployment."],
                    ["Kubernetes Services", "Kubernetes Services provide network access to applications running inside a cluster."]
                ]
            },
            {
                user: users[3],
                posts: [
                    ["Introduction to HTML", "HTML provides the structure of webpages."],
                    ["Learning CSS", "CSS controls the visual appearance and layout of webpages."],
                    ["JavaScript Fundamentals", "JavaScript adds dynamic behavior and interactivity to webpages."],
                    ["Responsive Web Design", "Responsive design allows websites to work across different screen sizes."],
                    ["Introduction to EJS", "EJS allows developers to generate dynamic HTML using JavaScript."]
                ]
            },
            {
                user: users[4],
                posts: [
                    ["Understanding Node.js", "Node.js allows JavaScript to run outside the browser."],
                    ["Express.js Basics", "Express is a lightweight framework for building Node.js web applications."],
                    ["MongoDB and Node.js", "Node.js applications can use MongoDB through libraries such as Mongoose."],
                    ["Designing Web Applications", "Good application architecture separates routes, models, controllers and views."],
                    ["Building Scalable Systems", "Scalable systems are designed to handle increasing traffic and workload."]
                ]
            }
        ];

        for (const userData of blogData) {
            for (const [title, content] of userData.posts) {
                blogs.push({
                    title,
                    content,
                    author: userData.user._id
                });
            }
        }

        await Blog.insertMany(blogs);

        console.log(`${blogs.length} blogs inserted`);

        console.log("Database seeding completed successfully");

        process.exit(0);

    } catch (error) {

        console.error("Seeding failed:", error);

        process.exit(1);
    }
};

seedDatabase();