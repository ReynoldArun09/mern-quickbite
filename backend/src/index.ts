import app from "./app";

(async () => {
  app.listen(3000, () => {
    console.log(`Server is up and running`);
  });
})();
