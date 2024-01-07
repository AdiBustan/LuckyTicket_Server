import initApp from "./app";

initApp().then((app) => {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log('example app listening at http://localhost:' + port);
    });
});