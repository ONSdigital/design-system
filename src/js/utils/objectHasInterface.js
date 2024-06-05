export function objHasInterface(obj, interfaceObj) {
    let isIt = true;

    for (let i in interfaceObj) {
        !obj[i] && (isIt = false);
    }

    return isIt;
}
