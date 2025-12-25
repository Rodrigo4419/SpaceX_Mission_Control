## Tech Stack

I chose to develop the **SpaceX Mission Control Web App**, and for this project I decided to use the following technology stack:

- [Next.js](https://nextjs.org) – Frontend framework.
- [Recharts](https://recharts.github.io/) – Used for building and managing dashboard charts.
- [React Select](https://react-select.com/home) – Styling and behavior library for select components.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for styling.

For a small application like this, I would normally choose **Vite + React**, resulting in a **Client-Side Rendering (CSR)** solution. I always try to avoid overengineering and aim for the simplest and most performant approach possible. In general, my goal is to keep projects easy to understand, easy to download and set up locally, and straightforward to deploy.

I decided to use **Recharts** because it is lightweight, easy to set up, and highly customizable, especially when compared to heavier alternatives such as **MUI X Charts**.

**React Select** is used exclusively for managing `<select>` elements. Customizing native select components often requires implementing a button and a popover to simulate dropdown behavior. Due to time constraints, I opted for React Select as a practical solution, avoiding the need to introduce a full UI library such as **Ant Design** or **Material UI**.

Regarding **Tailwind CSS**, I would not normally choose it for a project of this size, as it can be overkill for a small application. However, its usage was a requirement that needed to be fulfilled for this project.

## Architecture

For the proyect i decide to use the next folder structure:

```bash
src/
├── app/                # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Welcome page
│   ├── not-found.tsx   # 404 page
│   └── dashboard/
│       ├── history/    # History subpage
│       ├── layout.tsx  # Dashboard layout
|       ├── loading.tsx # Loading dashboard page
│       └── page.tsx
├── components/         # UI components
│   ├── charts/         # Reusable Chart components 
|   ├── layout/         # Components asociated with layout (sidebars, headers) components 
|   ├── svg/            # Customizable reusable svg icons
│   └── ui/             # Small reusable UI components
├── lib/                # API and data fetching logic
|    ├── spacex/           
|    └── other/
├── types/              # TypeScript types and interfaces
└── utils/             # Helper functions
```

For this project, I decided to implement a simple welcome page. This page serves as the home page of the application, while the main functionality lives under the **dashboard** route, which has its own layout and loading screens.

In the **components** section, I created four folders, organizing components based on their use cases. In larger projects, the number of components can grow significantly, and structuring them according to factors such as scale, functionality, and reusability becomes essential. This approach helps keep components easy to locate, maintain, and extend over time.

The **lib** folder is dedicated to API data fetching. Inside this folder, I defined two subfolders. Although only one is currently used, this structure allows the application to scale. In larger projects, API logic is often segmented based on the services being consumed or the functionality of the REST endpoints.

For example, in a hospital management platform, you might have separate endpoints for patient data, users, and payments. In that case, the API logic could be organized into folders such as `patients`, `users`, and `payments`, improving clarity and maintainability.

The **types** and **utils** folders are straightforward and therefore do not require additional explanation.

For this project, I did not find it necessary to introduce a state management library such as Zustand, Redux, or React Context. This decision was mainly driven by the limited scope of the application: it consists of only two pages, with minimal interaction between them.
Because of this, managing API data at the page level felt like the most appropriate and straightforward approach. Additionally, the amount of data fetched by the application is relatively small, so there is no real benefit in storing or sharing this data through a global state manager.

## AI Usage

I mainly use AI for three reasons:

1. To quickly recall things I do not use very often, such as how to perform an HTTP request using a library I do not regularly work with (for example, using `fetch` together with TanStack).
2. To locate specific functions or configurations that are not easy to find in library documentation, such as changing the slider border color in Material UI.
3. To improve my code. Sometimes I feel that a piece of code can be refactored to be cleaner and simpler. In some cases I do this myself, but when time is limited, I rely on AI for suggestions.

For this project in particular, I mainly used AI to help with **Tailwind CSS classes**. I had never used Tailwind before, primarily because I do not like mixing styling logic directly within React component files. Additionally, Tailwind can lead to components having very long `className` strings, which can make component files harder to read and maintain.
At the beginning, I did not know how to style anything using Tailwind, so I combined reading the official documentation with AI assistance to understand how to implement things such as animations, hover states, and responsive design. As I became more comfortable with the basics, my reliance on AI gradually decreased.
I did not use AI for the visual design of the application. I prefer taking inspiration from existing, real-world applications rather than generating designs with AI, which in my opinion often results in awkward or impractical layouts.

## Design

The application consists of two main sections: a **home dashboard** and a **history** section.

The dashboard presents a concise overview of key metrics, while the history section provides an easy way to explore detailed data related to SpaceX missions and launches. While reviewing the SpaceX API documentation, I discovered that launchpad and rocket data could be accessed alongside launch information. Based on this, I decided to incorporate this additional data to enrich the overall experience and provide more context for each mission.

When designing the dashboard, I always keep two main principles in mind. At the top, I typically place a set of small cards displaying key information such as metrics, counts, or high-level summaries. Below that, I usually include one or two charts that visualize the most important aspects of the data being managed. This structure helps users quickly understand the state of the system at a glance, which is why I followed the same approach for this project.

The **history** section consists of a table with its corresponding filters and a modal view. The modal is designed to display all the available data for each launch. To achieve this, I separated the launch, rocket, and launchpad information into individual tabs.

This approach allows for better use of screen space while reducing cognitive load by presenting information in a structured and digestible way. It also becomes especially important for responsive design, where screen real estate is limited and content organization plays a key role in usability.

## Challenges & Trade-offs

The main challenges I encountered while building the application were related to design decisions and limitations of the SpaceX API. Many launches contain incomplete or missing data, such as mission details, launch images, and external links (webcast, articles, etc.). Because of this, I had to be especially thoughtful with the UI design and implement multiple validation checks to properly handle cases where certain fields are unavailable for a given launch.
Additionally, the API does not provide launch data beyond 2022, which means the application can only display information from the last three years.

Another challenge was working with **Tailwind CSS**. Since I was not familiar with the class naming conventions, the initial development process was slower compared to other aspects of the project, such as design, configuration, and deployment.

With more time available, I would refactor some components and styles to improve code cleanliness and maintainability. I would also introduce theming support to enhance customization and overall user experience and I will add more animations to the UI.





