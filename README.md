## Requirements

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Running The Project

Install all dependencies:

```bash
yarn install
```

Then, run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the site.

## Building The Project

To build the project, run:

```bash
yarn build
```

This will create a `build` directory with the compiled project.

## Running The Project In Production

To run the project in production, run:

```bash
yarn start
```

This will start the project in production mode.

View the site at [http://localhost:3000](http://localhost:3000).

## Development Notes

This project uses [Next.js](https://nextjs.org/) and [TypeScript](https://www.typescriptlang.org/). It also uses [Tailwind CSS](https://tailwindcss.com/) for styling.

The project is structured as follows:

- `app/`: Contains the main application code.
  - `components/`: Contains Project Components.
    - `forms/`: Contains form components.
    - `global/`: Contains global components.
      - `Header.tsx`: The header component.
      - `Footer.tsx`: The footer component.
    - `ui/`: Contains UI components.
  - `page.tsx`: The main page component.
  - `layout.tsx`: The layout component.
  - `contact/`: Contains the contact page components.
    - `page.tsx`: The contact page component.
  - `about/`: Contains the about page components.
    - `page.tsx`: The about page component.
  - `leaderboard/`: Contains the leaderboard page components.
    - `page.tsx`: The leaderboard page component.
  - `bukc/`: Contains the bukc page components.
    - `page.tsx`: The bukc page component.
  - `socials/`: Contains the socials page components.
    - `page.tsx`: The socials page component.
  - `global.scss`: Global SCSS styles.
  - `favicon.ico`: The favicon.
- `public/`: Contains public assets.
  - `TeamSurreyKarting/` : Contains the logo(s) for the project.
  - `BUKC/` : Contains the BUKC logos.
  - `StudentUnion/` : Contains the Student Union logos.
  - `TeamSurrey/` : Contains the Team Surrey logos.
  - `UniOfSurrey/` : Contains the University of Surrey logos.
  - `images/` : Contains the images from BUKC races and social events.
    - `BUKC/` : Contains the images from BUKC races.
    - `Socials/` : Contains the images of social events.

The project uses [ESLint](https://eslint.org/).

### Colour Palette

- `#123047` - Nile Blue
- `#FCC133` - Lightning Gold

Each colour has a pallet variation of `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900` and `950`.
The details can be found in the tailwind.config.js file.

### ERD



### Features

- [x] Responsive design
- [x] Home Page
- [x] About Page
- [x] Contact Page
- [x] Leaderboard Page

More features to be added as needed.