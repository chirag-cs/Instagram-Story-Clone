# Instagram Stories Clone

An Instagram-style story viewer built using **React.js** and **TypeScript**, featuring smooth animations, auto-advancing stories, manual navigation, and Cypress tests for end-to-end functionality.

## 🚀 Live Demo
**[View the deployed app here]((https://chirag-insta-story.netlify.app/))**

---
## 📜 Features
- **Horizontally scrollable stories** fetched from an external file.
- **Auto-advancing every 5 seconds** with a loading indicator.
- **Manual navigation** by tapping left/right on the story.
- **Smooth transitions** for a seamless user experience.
- **Cypress tests** to ensure all core functionalities work correctly.
- **Optimized for mobile** (but developed on desktop first).

---
## 🛠️ Setup & Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/chirag-cs/Instagram-Story-Clone.git
cd Instagram-Story-Clone
```

### **2️⃣ Install Dependencies**
```sh
pnpm install
```

### **3️⃣ Start the Development Server**
```sh
pnpm run dev
```
- The app runs locally at **http://localhost:5173/**

### **4️⃣ Run Cypress Tests**
Ensure the app is running locally, then execute:
```sh
pnpm run test:e2e
```

---
## 📐 Design Choices & Optimizations

### **Performance & Scalability Considerations**
1. **Optimized Rendering:**
   - Stories load dynamically using `useEffect`.
   - Avoids unnecessary re-renders with `useRef` and `useCallback`.

2. **Efficient Story Navigation:**
   - Uses `setTimeout` to handle auto-advancing without redundant updates.
   - Click-based navigation is optimized for mobile touch interactions.

3. **Minimal External Dependencies:**
   - Built with native React and TypeScript without heavy external libraries.
   - Cypress used only for testing, ensuring no impact on bundle size.

4. **Mobile-First UI:**
   - Designed to work seamlessly on mobile devices.
   - Uses CSS for smooth animations and user-friendly interactions.

---
## 📂 Project Structure
```
📦 instagram-stories-clone
├── 📁 public/         # Static assets (images, icons)
├── 📁 src/            # Source code
│   ├── 📁 components/ # React components
│   ├── 📁 assets/     # Image assets
│   ├── App.tsx       # Main app component
│   ├── main.tsx      # Entry point
├── 📁 cypress/       # End-to-end tests
├── .gitignore        # Ignore unnecessary files in Git
├── package.json      # Project dependencies
├── README.md         # Project documentation
└── vite.config.ts    # Vite configuration
```

---
## 📝 Contribution
Feel free to fork this repository and submit pull requests for improvements!

---
## 🔥 Author
Developed by **Chirag** with **React, TypeScript, and Cypress** 🚀

