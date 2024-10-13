import { InitServer } from "./app";


async function init() {
    const app = await InitServer();
    app.listen(8000, () => {
        console.log('Server is running on port 8000');
    });
}

init();