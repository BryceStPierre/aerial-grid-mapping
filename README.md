# Aerial Grid Mapping

A side project that leverages Google Maps APIs and geometry to allow for grid mapping over top of satellite images.

I created on an earlier version of this web app back in late 2016, including the method for generating the grid.

## Next Steps

* Adding a fourth step with the selected grid portion enlarged and centered.
* Transforming the static map image to fit the enlarged grid selection.
* Adding ability to plot objects onto the enlarged grid selection. 

## Getting Started

1. Create an API key on the Google Cloud Platform.
2. Enable the Maps JavaScript API, the Maps Static API, and the Places API.
3. Clone the repo and open the project.
4. Run `npm install` to install dependencies.
5. Run `cp .env.example .env` and add your Google Maps Platform API key.

### Development

Run `npm run dev` to run the project using webpack-dev-server.

### Build

Run `npm run build` to compile and generate static files in `./dist`.

## Demo

[Try it out.](https://aerial-grid-mapping.netlify.app/)