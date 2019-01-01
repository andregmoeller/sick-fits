# sick-fits

This is a repository I created to accompany my viewing of [Advanced React & GraphQL](https://github.com/wesbos/Advanced-React).

## Environment Variables

Please go to the directory `backend` and rename the the file `variables.env.sample` to `variables.env`, open the file in an editor and enter the respective information. You will need to change the values for

* PRISMA_ENDPOINT
* PRISMA_SECRET
* STRIPE_SECRET

## External services

### Prisma

The backend of this application uses [Prisma](https://github.com/prisma/prisma) as its data layer as well as the [Prisma Cloud](https://www.prisma.io/). Please go to the directory `backend` and run:

```bash
npm i -g prisma
```

This will install the Prisma CLI tool. Then you can run `npm run deploy` to deploy the data model to the Prisma Cloud. Please configure your 

### Cloudinary

The frontend of this application uses [Cloudinary](https://cloudinary.com/) for uploading and resizing images. After you have signed up to Cloudinary as well as created an 'Upload Preset' called 'sickfits', please change the Cloudinary-URI in the method `uploadFile` of the component `CreateItem`.

## Starting the project on your local computer

### Backend

Please go to the directory `backend` and run `npm run dev` to start the project. Then open [http://localhost:4444](http://localhost:4444) in your browser to interact with backend using the [GraphQL Playground](https://github.com/prisma/graphql-playground).

### Frontend

Please go to the directory `frontend` and run `npm run dev` to start the project. Open [http://localhost:7777](http://localhost:7777) to view it in the browser.

## Visual Studio Code Extensions

[Visual Studio Code](https://code.visualstudio.com/) is my current editor. Here is a list of a couple of extensions I use:

* [Reactjs code snippets](https://github.com/xabikos/vscode-react)
* [vscode-styled-components](https://github.com/styled-components/vscode-styled-components)
* [GraphQL for VSCode](https://github.com/kumarharsh/graphql-for-vscode)
