/**
 * Created by Administrator on 2018/6/6.
 */


function doMatchProc(strMatchSource) {
    doShowDebugLog("doMatchProc", strMatchSource);

    var arrayMatchPhone = doMatchPhone(strMatchSource);
    doShowDebugLog("arrayMatchPhone", arrayMatchPhone);

    var arrayMatchAreaLine = doMatchAreaLine(strMatchSource+"\n");
    doShowDebugLog("arrayMatchAreaLine", arrayMatchAreaLine);
}



function doMatchPhone(strWithSource) {
    var exp = new
        RegExp(json_FMMatchKey.phone.strExp, "gim");
    var arrayMatch = strWithSource.match(exp);
    return arrayMatch;
}


function doMatchAreaLine(strWithSource) {
    var exp = new
        RegExp("(" + json_FMMatchKey.area.strExp + ").*(" + json_FMMatchKey.area.strExp + ")(.*)(\n)", "gim");
    var arrayMatch = strWithSource.match(exp);
    return arrayMatch;
}