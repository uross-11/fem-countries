# REST Countries API with color theme switcher

This landing page has been made as a challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca).

![](./preview.jpg)

## What I've learned

* [react-router](https://reactrouter.com/)
* [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
* [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)

### react-router

```html
<Router>
  <Navbar />
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/:id' component={SingleCountry} />
    <Route path='*' component={ErrorPage} />
  </Switch>
</Router>
```

### useContext

```js
const AppContext = React.createContext();

const AppProvider = ({ children }) => {

                ...

  return <AppContext.Provider value={{
    ...state,
    loading,
    countries,
    setSearchTerm,
    setMode,
    setRegion,
    codes,
  }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}
```

### useReducer

```js
const reducer = (state, action) => {
  if (action.type === 'SET_MODE') {
    return {
      darkMode: !state.darkMode,
    }
  }
}
```