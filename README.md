# 🏀 EzySubs Project

![GitHub repo size](https://img.shields.io/github/repo-size/dimashiii/EzySubs-Curtin-ConsultancyProject)
![GitHub contributors](https://img.shields.io/github/contributors/dimashiii/EzySubs-Curtin-ConsultancyProject)
![GitHub last commit](https://img.shields.io/github/last-commit/dimashiii/EzySubs-Curtin-ConsultancyProject)
![GitHub issues](https://img.shields.io/github/issues/dimashiii/EzySubs-Curtin-ConsultancyProject)

A **React.js** (Will upgrade to PWA/React Native in the future) based basketball substitution and game management system.  
This guide will help you **set up the project locally** and follow the **team’s Git workflow**.

---

## 📦 1. Install & Run Locally

### **Required Tools**
- **[Git](https://git-scm.com/downloads)**
- **[Node.js LTS (v18.x recommended)](https://nodejs.org/en/download)**
  > **Why Node 18?**  
  > We recommend Node **18.x** because it’s the LTS (Long-Term Support) version used when this project was built.  
  > Newer versions (like Node 20) *might* work, but could cause dependency or build issues.

---

### **Clone & Install**
```bash
# 1️⃣ Clone the repository
git clone https://github.com/dimashiii/EzySubs-Curtin-ConsultancyProject.git

# 2️⃣ Navigate into the project folder
cd EzySubs-Curtin-ConsultancyProject

# 3️⃣ Switch to the develop branch (team development happens here)
git checkout develop

# 4️⃣ Install dependencies
npm install

# 5️⃣ Start the app
npm start
```

The app will start on **[http://localhost:3000](http://localhost:3000)** in your default browser.

---

## 👩‍💻 2. Team Workflow

### **Branches**
- **`main`** → Production-ready code *(only Project Manager & Main Developer merge here)*
- **`develop`** → Shared development branch for integrating all features
- **feature-yourname-task** → Each developer works in their own branch

---

### **Branch Naming**
```
feature-yourname-task
```
Examples:
```
feature-yang-login-page
feature-reswanul-drag-drop-update

```
---

### **Daily Workflow**
1. **Update `develop` before starting work**:
```bash
git checkout develop
git pull
```
2. **Create your branch**:
```bash
git checkout -b feature-yourname-task
```
3. **Make changes → Commit**:
```bash
git add .
git commit -m "Short description of changes"
```
4. **Push branch**:
```bash
git push -u origin feature-yourname-task
```
5. **Open a Pull Request** into `develop`.

---

## 📝 6. Development Notes
- Do **not** push directly to `main` branch
- Keep your branch updated with `develop` to avoid conflicts.
- Commit messages should be **short but clear**
- Test your changes before creating a Pull Request
- - Run `npm install` after pulling if there are dependency updates

---

**Happy Coding! 🏀**
