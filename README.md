# banana-budget

A tool used to calculate "Bob's Banana Budget".

### [Live Demo Here](https://banana-budget-fr.herokuapp.com/)

## Installation

**1.** Clone or Download the repository
```
git clone https://github.com/frendon001/banana-budget.git
```

**2.** Install server libraries in root directory:
```
npm install
```
**2.** Install client libraries in client directory:
```
cd client
yarn install
```

**2.** Run application locally (Server and UI):
```
npm run dev
```

## Loaded Application

![](images/bananaBudget.jpg)

## Technologies Used

### Front-End
- React
- Formik
- Axios
- Semantic UI

### Back End
- Node
- Express
- Mocha
- Chai


## Testing
To run API Tests, close any running processes and then run the following command:

```
npm test
```

## Troubleshooting

If validation script fails `npm run validate`.
- Try running the formatting script to automatically fix formatting issues: `npm run format`

If there are issues with VSCode not respecting the tsconfig.json
- Try overriding the default version of Typescript in VSCode by adding the following setting.json configuration on your workspace
- This will allow VSCode to use the Typescript version specified on the project's package.json instead of the default VSCode version

``` JSON
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```


# Authors
- Fausto Rendon (https://github.com/frendon001)

