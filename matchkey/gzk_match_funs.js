/**
 * Created by Administrator on 2018/6/6.
 */

var jsonMatch = {};

function doMatchProc(strMatchSource) {
    doShowDebugLog("doMatchProc", strMatchSource);

    jsonMatch.matchPhone = doMatchPhone(strMatchSource);
    doShowDebugLog("matchPhone", jsonMatch.matchPhone);

    var arrayMatchAreaLine = doMatchAreaLine(strMatchSource+"\n\n");
    doShowDebugLog("arrayMatchAreaLine", arrayMatchAreaLine);

    if (arrayMatchAreaLine!=null){
        jsonMatch.matchAreaLine = [];
        for (var intMatchAreaLineIndex=0; intMatchAreaLineIndex<arrayMatchAreaLine.length; intMatchAreaLineIndex++){
            var jsonItemInfo = {};

            jsonItemInfo.strLineSource = arrayMatchAreaLine[intMatchAreaLineIndex].replace(/\s+/g,"");

            var strLineSourceTrim = jsonItemInfo.strLineSource.replace(/,/g,"").replace(/，/g,"");
            var arrayMatchAreaFromTo = doMatchAreaGroup(strLineSourceTrim);

            jsonItemInfo.areaInfo = {};
            jsonItemInfo.areaInfo.arrayAreaGroup = arrayMatchAreaFromTo;
            jsonItemInfo.areaInfo.areaFrom={};
            jsonItemInfo.areaInfo.areaTo={};
            if(arrayMatchAreaFromTo.length>=2){
                jsonItemInfo.areaInfo.areaFrom.areaSource=arrayMatchAreaFromTo[0];
                jsonItemInfo.areaInfo.areaTo.areaSource=arrayMatchAreaFromTo[arrayMatchAreaFromTo.length-1];
            }

            var arrayMatchGoodsName = doMatchGoodsName(strLineSourceTrim);
            jsonItemInfo.arrayGoodsName = arrayMatchGoodsName;

            var arrayMatchGoodsWeight = doMatchGoodsWeight(strLineSourceTrim);
            jsonItemInfo.arrayGoodsWeight = arrayMatchGoodsWeight;

            var arrayMatchCarLength = doMatchCarLength(strLineSourceTrim);
            jsonItemInfo.arrayCarLength = arrayMatchCarLength;

            var arrayMatchTypeLength = doMatchCarType(strLineSourceTrim);
            jsonItemInfo.arrayCarType = arrayMatchTypeLength;

            var arrayMatchInfoRemark = doMatchInfoRemark(strLineSourceTrim);
            jsonItemInfo.arrayInfoRemark = arrayMatchInfoRemark;

            jsonMatch.matchAreaLine.push(jsonItemInfo);
        }

    }

    jsonMatch.matchLessInfo = doReplaceMatchInfo(strMatchSource, arrayMatchAreaLine);

    doShowDebugLog("jsonMatch",doJsonToStrFormat(jsonMatch));
    //$("#textMatch").val(doJsonToStrFormat(jsonMatch));
    $("#textMatch").val(doMatchResultFormat());
}

function doMatchResultFormat() {
    var strReturn = "";
    for (var intTempIndex=0; intTempIndex<jsonMatch.matchAreaLine.length; intTempIndex++){
        var infoTemp = jsonMatch.matchAreaLine[intTempIndex];

        //strReturn += infoTemp.strLineSource;
        //strReturn += ("\r\n");

        strReturn += (infoTemp.areaInfo.areaFrom.areaSource);
        strReturn += (" -> ");
        strReturn += (infoTemp.areaInfo.areaTo.areaSource);
        //strReturn += ("\r\n");

        var strGoodsInfo = "";
        if (infoTemp.arrayGoodsName.length>0){
            strGoodsInfo += infoTemp.arrayGoodsName;
        }
        if (infoTemp.arrayGoodsWeight.length>0){
            strGoodsInfo += infoTemp.arrayGoodsWeight;
        }
        if (strGoodsInfo!=""){
            //strReturn += (strGoodsInfo+"\r\n");
            strReturn += ("; "+strGoodsInfo);
        }

        var strCarInfo = "";
        if (infoTemp.arrayCarLength.length>0){
            strCarInfo += infoTemp.arrayCarLength[infoTemp.arrayCarLength.length-1];
        }
        if (infoTemp.arrayCarType.length>0){
            strCarInfo += infoTemp.arrayCarType[infoTemp.arrayCarType.length-1];
        }
        if (strCarInfo!=""){
            //strReturn += ("需"+strCarInfo+"\r\n");
            strReturn += ("; 需"+strCarInfo);
        }

        if (infoTemp.arrayInfoRemark.length>0){
            strReturn += ("; "+infoTemp.arrayInfoRemark);
        }

        strReturn += ("\r\n\r\n");

    }
    strReturn += ("电话："+jsonMatch.matchPhone);
    strReturn += ("\r\n");
    strReturn += ("其他："+jsonMatch.matchLessInfo);
    strReturn += ("\r\n");

    return strReturn;
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

function doMatchGoodsWeight(strWithSource) {
    var exp = new
        RegExp(json_FMMatchKey.goodsWeight.strExp, "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}

function doMatchCarLength(strWithSource) {
    var exp = new
        RegExp(json_FMMatchKey.carLength.strExp, "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}

function doMatchCarType(strWithSource) {
    var exp = new
        RegExp(json_FMMatchKey.carType.strExp, "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}

function doMatchInfoRemark(strWithSource) {
    var exp = new
        RegExp(json_FMMatchKey.remark.strExp, "gim");
    var arrayMatch = strWithSource.match(exp);
    return (arrayMatch==null?[]:arrayMatch);
}

function doReplaceMatchInfo(strWithSource, arrayMatchInfo) {
    if (arrayMatchInfo!=null){
        for (var intTempIndex=0; intTempIndex<arrayMatchInfo.length; intTempIndex++){
            strWithSource = strWithSource.replace(arrayMatchInfo[intTempIndex],"");
        }
        return strWithSource.replace(/\n{1}/ig,"");
    }else{
        return "";
    }

}