const channel = new MessageChannel();
const tasks = new Map();
channel.port1.onmessage = (event) => {
    const handle = event.data;
    const fn = tasks.get(handle);
    if (fn != null) {
        try {
            fn();
        }
        finally {
            tasks.delete(handle);
        }
    }
};
let counter = 1;
export function defer() {
    return new Promise((resolve) => {
        const handle = counter++;
        tasks.set(handle, resolve);
        channel.port2.postMessage(handle);
    });
}
//# sourceMappingURL=defer.js.map