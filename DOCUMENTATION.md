# CS5008 Learning Space: Documentation

## 🌿 Project Vision
The **CS5008 Learning Space** is an interactive, aesthetic, and educational web application designed to help students master the complexities of Computer Systems. It moves away from the traditional "dark/matrix" developer aesthetic, instead opting for a "Boho-Chic/Instagram-inspired" vibe that uses warmth, soft textures, and artistic metaphors to reduce the cognitive anxiety associated with low-level programming.

## 🏗️ Architecture
- **Framework**: React 19 (via ESM imports).
- **Styling**: Tailwind CSS with custom fonts (Fraunces for serifs, JetBrains Mono for code).
- **Icons**: Lucide React.
- **AI Integration**: Gemini 3 Pro via `@google/genai` (Lumi Assistant).
- **Routing**: React Router (HashRouter for compatibility).

## 🧩 Key Components
### 1. The Memory Garden (`MemoryVisualizer.tsx`)
A 3-column interactive workbench that synchronizes:
- **C Source**: The high-level intent.
- **RAM Segments**: A granular view of memory addresses and values.
- **Logical Flow**: A visual diagram illustrating pointers and dereferencing.

### 2. Control Flow Lab (`AssemblyLab.tsx`)
A real-time hardware simulator that:
- Executes a subset of x86-64 assembly instructions.
- Simulates loop logic (CMP, JNE) across multiple iterations.
- Dynamically updates hardware registers (RAX, RCX) to show how data accumulates at the hardware level.

### 3. Lumi Assistant (`Assistant.tsx`)
A persistent AI guide using the Gemini API, specialized in explaining systems concepts through artisanal metaphors (weaving, crafting, textiles).

---

## 🚀 Master Reproduction Prompt
*Use this prompt to recreate the entire application from scratch in a single go:*

> "Act as a world-class senior frontend engineer and UI/UX designer. Create a comprehensive, Instagram-inspired (Boho-chic) React learning platform for a Computer Systems course (CS5008). 
> 
> **Design Language:**
> - Palette: Warm linen (#faf7f2), soft chocolate brown (#43302b), and earthy accents (Orange-700, Green-700).
> - Typography: 'Fraunces' for headings, 'Inter' for UI, and 'JetBrains Mono' for code.
> - Feeling: Calm, artistic, organized, and approachable. Use rounded corners (3rem+), subtle grain overlays, and glassmorphism.
>
> **Core Features:**
> 1. **Interactive Memory Garden:** A 3-column workbench showing C Source, RAM Segments (Table), and Logical Flow (Diagram). Pointers must be interactive—changing an address in the table should update the arrow and target in the diagram.
> 2. **Assembly Control Flow Lab:** A step-by-step simulator for an x86-64 loop (summing 1 to 5). It must have a functional execution engine that updates RAX and RCX registers in real-time, correctly handling 'jne' jumps.
> 3. **CPU Architecture Visualizer:** Include a 64-bit register map (rax/eax/ax/al) and a status-flag lab for an ALU (Zero, Sign, Overflow flags).
> 4. **Compiler Workshop:** Visualize the Shunting Yard algorithm (Infix to Postfix) and a Stack Machine evaluator.
> 5. **Lumi AI Assistant:** A floating chat interface using the Gemini API (@google/genai). Lumi should be an encouraging guide who uses 'weaving' and 'crafting' metaphors.
>
> **Technical Requirements:**
> - Use React with ESM imports.
> - Styling via Tailwind CSS.
> - Use Lucide-React for all icons.
> - Ensure high-quality UX with transitions, tooltips, and responsive layouts."
