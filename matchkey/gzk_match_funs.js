/**
 * Created by Administrator on 2018/6/6.
 */

var jsonMatch = {};

function doMatchProc(strMatchSource) {
    doShowDebugLog("doMatchProc", strMatchSource);

    jsonMatch.matchPhone = doMatchPhone(strMatchSource);
    doShowDebugLog("matchPhone", jsonMatch.matchPhone);

    var arrayMatchAreaLine = doMatchAreaLine(strMatchSource+"\n");
    doShowDebugLog("arrayMatchAreaLine", arrayMatchAreaLine);

    if (arrayMatchAreaLine!=null){
        jsonMatch.matchAreaLine = [];
        for (var intMatchAreaLineIndex=0; intMatchAreaLineIndex<arrayMatchAreaLine.length; intMatchAreaLineIndex++){
            var jsonItemInfo = {};

            jsonItemInfo.strLineSource = arrayMatchAreaLine[intMatchAreaLineIndex].replace(/\s+/g,"");

            var strLineSourceTrim = jsonItemInfo.strLineSource.replace(/,/g,"").replace(/，/g,"");
            var arrayMatchAreaFromTo = doMatchAreaGroup(strLineSourceTrim);
            jsonItemInfo.arrayAreaGroup = arrayMatchAreaFromTo;
            if(arrayMatchAreaFromTo.length>=2){
                jsonItemInfo.areaFrom=arrayMatchAreaFromTo[0];
                jsonItemInfo.areaTo=arrayMatchAreaFromTo[arrayMatchAreaFromTo.length-1];
            }

            var arrayMatchGoodsName = doMatchGoodsName(strLineSourceTrim);
            jsonItemInfo.arrayGoodsName = arrayMatchGoodsName;

            var arrayMatchCarLength = doMatchCarLength(strLineSourceTrim);
            jsonItemInfo.arrayCarLength = arrayMatchCarLength;

            jsonMatch.matchAreaLine.push(jsonItemInfo);
        }

    }

    doShowDebugLog("jsonMatch",doJsonToStrFormat(jsonMatch));
}



function doMatchPhone(strWithSource) {
    var exp = new
        RegExp(json_FMMatchKey.phone.strExp, "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}

function doMatchAreaLine(strWithSource) {
    var exp = new
        RegExp("(" + json_FMMatchKey.area.strExp + ").*(" + json_FMMatchKey.area.strExp + ")(.*)(\n)", "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}

function doMatchAreaGroup(strWithSource) {
    var exp = new
        RegExp("((" + json_FMMatchKey.area.strExp + ")(" + json_FMMatchKey.area.strExp + "))|(" + json_FMMatchKey.area.strExp + ")", "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}

function doMatchGoodsName(strWithSource) {
    var exp = new
        RegExp(json_FMMatchKey.goodsName.strExp, "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}

function doMatchCarLength(strWithSource) {
    var exp = new
        RegExp(json_FMMatchKey.carLength.strExp, "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}