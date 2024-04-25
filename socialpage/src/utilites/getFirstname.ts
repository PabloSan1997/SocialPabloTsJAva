

export function getFirstname(name:string):string{
    const arr = name.split('');
    if(arr.length<=5) return arr.join('');
    return arr.splice(0,4).join('');
}