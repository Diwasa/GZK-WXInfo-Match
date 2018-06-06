/**
 * Created by Administrator on 2018/6/6.
 */
function doShowDebugLog(strTitle, strInfo) {
    console.log(strTitle + "===" + strInfo);
}

function doJsonToStrFormat(jsonValue){
    return JSON.stringify(jsonValue, null, "\t");
}