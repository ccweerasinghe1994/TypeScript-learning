var userInput;
var userName;
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, code: code };
}
generateError('Error', 500);
