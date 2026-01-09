const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Project Data source of truth
const projects = [
    {
        "id": 1,
        "title": "E-Commerce Platform",
        "description": "A full-featured shopping platform built with Next.js, Stripe, and PostgreSQL. Features real-time inventory and secure checkout.",
        "tags": [
            "Next.js",
            "TypeScript",
            "Stripe",
            "Prisma"
        ],
        "image": "/images/ecommerce.jpg",
        "githubUrl": "https://github.com",
        "liveUrl": "https://example.com"
    },
    {
        "id": 2,
        "title": "Task Management App",
        "description": "Collaborative task manager with real-time updates using Socket.io. Includes team workspaces and kanban boards.",
        "tags": [
            "React",
            "Node.js",
            "Socket.io",
            "MongoDB"
        ],
        "image": "/images/task.jpg",
        "githubUrl": "https://github.com",
        "liveUrl": "https://example.com"
    },
    {
        "id": 3,
        "title": "Vietnamese Text-to-Image Generation System with SDXL-Turbo & Custom LoRA",
        "description": "Designed and deployed a real-time text-to-image generation system optimized for Vietnamese prompts, achieving high-quality, culturally accurate outputs in under 10s seconds per 768×768 image.",
        "tags": [
            "Python",
            "Pytorch",
            "Colab",
            "LoRA",
            "SDXL-turbo",
            "Gradio",
            "Diffusers"
        ],
        "image": "/images/texttoimage.jpg",
        "githubUrl": "https://github.com/tri01012002/sdxl-turbo-tringuyen",
        "liveUrl": "https://example.com"
    },
    {
        "id": 4,
        "title": "Development of a Network Malware Detection System Using ML/DL on MPSoCs Technology",
        "description": "Developed a real-time network malware and cyber attack detection system by integrating Convolutional Neural Network (CNN) and Random Forest (RF) algorithms. The system was deployed on a Xilinx Zynq UltraScale+ MPSoC FPGA board (ZCU102 evaluation kit) to achieve higher processing speed, lower power consumption, and better resource efficiency compared to traditional GPU-based implementations.",
        "tags": [
            "Python",
            "CNN",
            "Random Forest",
            "verilog",
            "wireshark",
            "PCAP file",
            "Xilinx Zynq UltraScale",
            "MPSoC FPGA board"
        ],
        "image": "/images/malware.jpg",
        "githubUrl": "https://github.com",
        "liveUrl": "https://example.com"
    },
    {
        "id": 5,
        "title": "Streamlit App - Object Detection",
        "description": "This application uses the YOLOv8 model to detect objects in uploaded videos or images. The project leverages Docker to package and deploy the Flask application with the YOLO model. You can upload a video or image and get object detection results.",
        "tags": [
            "Python",
            "React",
            "FastAPI",
            "Yolov8",
            "Node.js",
            "numpy",
            "OpenCV",
            "Docker",
            "Flask"
        ],
        "image": "/images/streamlit.jpg",
        "githubUrl": "https://github.com/tri01012002/eatlab",
        "liveUrl": "https://example.com"
    }
];

// Routes
app.get('/', (req, res) => {
    res.send('Portfolio Backend API is running');
});

// Messages storage (in-memory)
const messages = [];

app.get('/api/projects', (req, res) => {
    res.json(projects);
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = {
        id: messages.length + 1,
        name,
        email,
        message,
        date: new Date().toISOString()
    };

    messages.push(newMessage);
    console.log('New Message received:', newMessage);

    res.status(201).json({ success: true, message: 'Message sent successfully' });
});

app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
