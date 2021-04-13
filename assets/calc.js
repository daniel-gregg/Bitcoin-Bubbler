
function valChangeCalc(array){
    var valChange = array[array.length-1] - array[0]
    return valChange
}

function valChangePercent(array){
    var percentChange = (array[array.length-1] - array[0])
    percentChange = percentChange/array[0]
    return percentChange
}