/**
 * Created by esri on 2016/9/26.
 * 程序主入口
 */
define([
    'app/UIManager'
], function (UIManager) {
   return {
       initApp: function () {
           var uiManager=new UIManager();
           uiManager.init();
       }
   };

});