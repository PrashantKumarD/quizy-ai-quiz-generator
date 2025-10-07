export function extractJsonFromText(text){
    if(!text || typeof text !== "string") throw new Error("Invalid input: text must be a non-empty string");
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if(first !== -1 && last !== -1 && last > first){
        return text.slice(first,last+1);
    }
    return text;
}