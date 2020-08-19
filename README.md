# FrameDiff - Web

For the backend part see [FrameDiff - API](https://github.com/andrejcremoznik/framediff-api).

**Description**

This is a demo React app that's slightly usable if you'd like to compare the size of some objects side-by-side or stacked by entering their physical dimensions.

Basically, I'm looking for a new phone and I want something smaller than what I have and this allows me to visuallize the difference in size.

![Screenshot](https://cremoznik.si/files/framediff.png)

## How to use

1. Clone the repo
2. Install dependencies `npm install`
2. Run `npm start` which will open the app in browser at http://localhost:3000/
3. If you didn't start the API, it will take a few seconds for backend calls to timeout after which you an use the app just fine.

Then add some objects in the Objects manager, go back to Compare and use the input field to find and add them to comparison.

### Saving global objects to backend

You need to have the backend running.

**Passphrase:** in the development environment, the passphrase to save global objects is `passphrase`. In a production environment this will be read from the `FRAMEDIFF_SECRETS` environment variable.

## Showcase

**Code structure**

```
./src/
 - /app        Contains state context, API library/models, Storage models
 - /assets     Images and stuff that's imported in JS files
 - /components The smallest building blocks (React components) like buttons...
 - /etc        Tiny functions / helpers that don't belong elsewhere
 - /features   The smallest single responsibility components (e.g. a complete form)
 - /pages      Root components for specific routes
 - /styles     CSS *
```

**About CSS**

Keeping CSS out of components and structuring it in a more traditional way makes it much easier to extend, maintain and refactor. If you bundle it with JS you get some immediate benefits like automatic scoping, but in return you lose the entire cascade. If you know how CSS works and are able to use the cascade to your advantage, loading CSS into JS only leads to PITA down the road.

**Using Context and ImmerJS for global state**

* `app/context.js` contains the global state and reducer function.
* `App.js` showcases how to bootstrap the app with Immer and provide it the global context.
* `features/objects/*.js` showcases how to `useContext` to read the global state and dispatch state changes.

**FeathersJS client library**

[FeathersJS](https://feathersjs.com/) is really cool. They provide a client library that allows you to consume the API the same you'd do it on the backend. It also transparently handles REST and real-time communication via sockets.

`/app/feathers.js` imports the feathers client, configures it and exports API services (endpoints) to consume in the app.
