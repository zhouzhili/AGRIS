/**
 * Created by zzl on 2016/8/1.
 */
//控制错误信息的提示
define([
    'dojo/dom',
    'dojo/domReady!'
], function (dom) {
    var errorUl=dom.byId('errorList');
    return{
        showError: function (errorMsg) {
            var li="<li>"+errorMsg+"</li>";
            errorUl.innerHTML=li;
            //3秒后清除错误信息
            setTimeout(function () {
                errorUl.innerHTML="";
            },3000);
        }
    }
});