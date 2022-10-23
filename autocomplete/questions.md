# Questions

### **1. What is the difference between Component and PureComponent? give an example where it might break my app.**

They are both very similar, both are used to define components with a slightly difference. `PureComponent` internally implements `shouldComponentUpdate` lifecycle, when it detects changes on `state` or `props` a shallow comparison will be performed deciding whether the component should re-render or not. And, `Component` does not implement `shouldComponentUpdate` automatically.

A problem we might have using `PureComponent` would be by mutating `states` or/and `props` instead of generating a new reference to the value. Since `PureComponent` does a shallow comparison the content will never be detected.

### **2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?**

`Context + shouldComponentUpdate (SCU)` is risky to use because `SCU` controls if a component and its tree should re-render or not and if the component does not update, the tree of this component will not receive any `context` update propagation until the component decides to re-render. The component and its tree will work with mismatched values.

### **3. Describe 3 ways to pass information from a component to its PARENT.**

#### 1. Callback function

A parent component can pass a `function` to its child and the child can execute this function passing arguments to it.

#### 2. Context API

React provides a feature called `Context` so we can add components inside the `Context.Provider` tree and these components can access any data that is held by the `Context`.

#### 3. Global State Management Libraries

In the React ecosystem, there are several libraries that helps state management on an application. These libraries held `stores` of data that any component of an application could access.

### **4. Give 2 ways to prevent components from re-rendering.**

The use of Memoization prevents components from re-rendering due to the cache of returns and results when inputs are the same. This technique can be used with hooks such as `useMemo` and `useCallback`, and also with HOCs `React.memo(Component)`.

### **5. What is a fragment and why do we need it? Give an example where it might break my app.**

A `React.Fragment` is used to encapsulate various components in a single tree avoiding the creation of an unnecessary `HTML` tag.

```tsx
export function Row() {
  return (
    <div className="row">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </React.Fragment>
  )
}

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Row />
      <OtherComponent />
    </div>
  )
}
```

If a developer changes the parent `div` from the `Row` component for a `React.Fragment` the whole layout of `App` would break not following design specifications.

### **6. Give 3 examples of the HOC pattern.**

```tsx
function withStyles(Component) {
  return props => {
    const style = {
      padding: '0.2rem',
      margin: '1rem',
      ...props.style
    }

    return <Component style={style} {...props} />
  }
}

const Button = () = <button style={{ color: 'red' }}>Submit</button>
export default withStyles(Button)
```

```tsx
function withLoading(Component) {
  return function (props) {
    if (props.isLoading) {
      return <Loader/>;
    }
    return <Component {...props} />;
  };
}

const HomePage = () = <HomePage isLoading={true} />
export default withLoading(HomePage)
```

```tsx
function withAuth(Component) {
  return function (props) {
    if (props.isAuthenticated) {
      return <Component {...props} />;
    }
    return <LoginPage />;
  };
}

const DashboardPage = () = <DashboardPage isAuthenticated={false} />
export default withAuth(DashboardPage)
```

### **7. What's the difference in handling exceptions in promises, callbacks and async...await.**

#### 1. Promises

Handles exceptions by using `.catch()` method

#### 2. Callbacks

Handles exceptions by having a `function` that will be executed if something goes wrong

```tsx
doSomething(arg, function (err) {
  if (err) console.error(err)
})
```

#### 3. Async-await

Handles exceptions by using a `try catch` statement

### **8. How many arguments does setState take and why is it async.**

It's possible to pass two arguments for `setState`:

1. The first argument is an `updater function` or just the `state`
2. The second argument is optional it is the `callback function`

```tsx
this.setState({ isLoading: false }, () => console.log('Fully loaded.')
```

`setState` being async allow us to have multiple calls to setState in a single scope and do not trigger unnecessary re-renders in the whole component tree.

### **9. List the steps needed to migrate a Class to Function Component.**

1. Remove the `class` structure and replace it with a `function` component
2. Remove the `class` constructor and refactor all the `this.setState` for `useState` hook preserving its shape
3. Remove all references to `this`
4. Refactor `class` methods for simple `functions`
5. Re-write the component lifecycle such as `shouldComponentUpdate`, `componentDidMount` etc to use `useEffect` hook
6. Migrate the `render` function for a simple `return`

### **10. List a few ways styles can be used with components.**

There are a few ways to style components on the React ecosystem:

#### 1. Inline CSS

Writing CSS to the DOM element itself, such as:

```tsx
<button style={{ borderRadius: '10px' }} type="submit">
  Submit
</button>
```

#### 2. CSS File

Having a separated file containing the CSS:

```css
/* button.css */
.button {
  border-radius: 10px;
}
```

```tsx
// button.tsx
import './button.css'

...
return (
  <button className="button" type="submit">Submit</button>
)
...
```

#### 3. CSS-in-JS

This approach is very common in React codebases, developers normally use third-party libraries such as [styled-components](https://styled-components.com/) or [emotion](https://emotion.sh/docs/introduction)

```tsx
import styled from 'styled-components'

const Button = styled.button`
  border-radius: 10px;
`

...
return (
  <Button type="submit">Submit</Button>
)
...
```

#### 4. Other ways

There are other ways to style such as: `CSS Module` or using css preprocessor such as `Sass`, `LESS`, `Stylus`.

### **11. How to render an HTML string coming from the server.**

It's possible to render HTML string using `dangerouslySetInnerHTML`.
