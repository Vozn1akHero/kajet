export const InputIncorrectness = (status) => {
    if(status) return { border: '1px solid green'};
    return { border: '1px solid red'};
};
