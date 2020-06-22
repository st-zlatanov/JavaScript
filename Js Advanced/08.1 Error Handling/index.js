function solve(obj){
    const validMethods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const uriRegex = /^([A-Za-z0-9.]+)$/gm;
    const validVersions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0' ];
    const messageRegex = /^([^<>\&\\'"]+)$/gm;

    let validMethod = obj.method && validMethods.includes(obj.method); 
    let validUri = obj.uri && (obj.uri.match(uriRegex) || '*');
    let validVersion = obj.version && validVersions.includes(obj.version);
    let validMessage = obj.message && obj.message.match(messageRegex);
    if(!validMethod){
       throw new Error("Invalid request header: Invalid Method");
    }
    if(!validUri){
        throw new Error("Invalid request header: Invalid Uri");
    }
    if(!validVersion){
        throw new Error("Invalid request header: Invalid Version");
    }
    if(!validMessage){
        throw new Error("Invalid request header: Invalid Message");
    }
}