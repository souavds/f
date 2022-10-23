# To-do App

Live: https://todo.f.avds.dev/

## Observations

For state-management I'd used [react-query](https://tanstack.com/query/v4) for better perfomance and to sync with server (server state). React query provides the ability to have the state always updated when changes on the server happens, so by doing that I don't need complex stores of state on the client.

## How to run in development mode

### Clone repository

```
git clone https://github.com/souavds/f.git && cd f/todo
```

### Install dependencies

```
pnpm install
```

### Run the project

```
pnpm start
```

## How to test the application

```
pnpm test
```

## How to build the application for production

```
pnpm build
```
