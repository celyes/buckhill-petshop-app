# Petshop App

This app is a task provided by Buckhill company. 


### Running the project

To run the project, simply execute the following commands:
```shell
npm install  # only the first time 
npm run dev
```

This will spawn up a local development server on the port 5173 (http://localhost:5173)

> [!NOTE]
> While this app may seem incomplete, it is expected in the confluence page to not code every route, page and component.

### Folder structure:
We'll focus on the `src` folder since it's the one containing the source code.

| folder / file name | type   | purpose                                                                                                                |
|--------------------|--------|------------------------------------------------------------------------------------------------------------------------|
| assets             | folder | Contains static assets like CSS files                                                                                  |
| components         | folder | Contains all the components needed in the app that are not standalone pages                                            |
| router             | folder | Contains routing files                                                                                                 |
| services           | folder | Contains some code extracted into services instead of directly writing them in the Vue components                      |
| stores             | folder | Contains Pinia state management stores                                                                                 |
| utils              | folder | Contains different utility files                                                                                       |
| views              | folder | Contains the application views. Each component represents a web page that has a route (path) and a name                |
|App.vue| file   | The main component. This is where routing and navigation is embedded                                                   |
|environment.ts| file   | This file contains all the environment variables necessary for the app to run correctly.                               |
|main.ts| file   | The main entrypoint of the app. This is where Vue is initiated. This is also where Vue plugins are used and configured |
