/**
 * Created by zzl on 2016/7/29.
 */
define([
    'dojo/query',
    'dojo/domReady!'
], function (query) {
    return{
        init: function () {
            //查询列表展开和折叠
            query('#searchDataHead').on('click', function () {
                query('#searchDataBody').toggleClass('panelHide');
            });
        }
    }
});